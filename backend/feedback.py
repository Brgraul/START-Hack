import numpy as np
from person import Person
from backend import Backend

class FeedbackModule:
	people = {}

	@staticmethod
	def rename_person(faceID, newName):
		FeedbackModule.people[faceID].name = newName

	@staticmethod
	def get_people():
		return [(ID, person.name) for ID, person in FeedbackModule.people.items()]

	@staticmethod
	def force_feedback():
		return "\n".join([FeedbackModule.get_feedback(person, person.lastEmotion) for person in FeedbackModule.people.values()])

	@staticmethod
	def get_feedback(person, emotion):
		emoVec = np.array([value for _, value in emotion.items()])
		delta = emoVec - person.get_emotion_vector()
		if np.linalg.norm(delta) < Backend.get_emotion_change_threshold():
			return None
		inc, dec = 0, 0
		incEmo, decEmo = "", ""
		if not (delta == emoVec).all():
			for index, emo in enumerate(emotion):
				if delta[index] > inc and delta[index] > Backend.get_delta_threshold():
					inc = delta[index]
					incEmo = emo
				if delta[index] < dec and delta[index] < -Backend.get_delta_threshold():
					dec = delta[index]
					decEmo = emo
		if inc > 0:
			inc = "Greatest increase: {}.".format(incEmo)
		else:
			inc = ""
		if dec < 0:
			dec = "Greatest decrease: {}.".format(decEmo)
		else:
			dec = ""
		topEmotions = FeedbackModule.get_top_emotions(emotion)
		if len(topEmotions) == 0:
			return "No emotions detected"
		primary = topEmotions[-1]
		# Update last emotion
		person.lastEmotion = emotion
		# Preliminary textual feedback
		return "{} is {} percent {}. {} {}".format(person.name, primary[1] * 100, primary[0], inc, dec)

	@staticmethod
	def load_new_emotion(face):
		if face["faceId"] not in FeedbackModule.people:
			FeedbackModule.people[face["faceId"]] = Person(face["faceId"])
		return FeedbackModule.get_feedback(FeedbackModule.people[face["faceId"]], face["faceAttributes"]["emotion"])

	@staticmethod
	def get_top_emotions(emotion):
		measured = [(emo, value) for emo, value in emotion.items()]
		return sorted(filter(lambda emotion: emotion[1] > Backend.get_emotion_threshold(), measured),
			key=lambda emotion: emotion[1])
