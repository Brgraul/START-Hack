import numpy as np
from person import Person
from backend import Backend

class FeedbackModule:
	people = {}

	@staticmethod
	def get_feedback(person, emotion):
		primary = FeedbackModule.get_top_emotions(emotion)[-1]
		# Preliminary textual feedback
		return "{} is {} percent {}".format(person.name, primary[1] * 100, primary[0])
		person.lastEmotion = emotion

	@staticmethod
	def load_new_emotion(face):
		if face["faceId"] not in FeedbackModule.people:
			FeedbackModule.people[face["faceId"]] = Person(face["faceId"])
		person = FeedbackModule.people[face["faceId"]]
		newEmotion = np.array([value for _, value in face["faceAttributes"]["emotion"].items()])
		if np.linalg.norm(newEmotion - person.lastEmotion) > Backend.get_emotion_change_threshold():
			return FeedbackModule.get_feedback(person, face["faceAttributes"]["emotion"])
		return None

	@staticmethod
	def get_top_emotions(emotion):
		measured = [(emo, value) for emo, value in emotion.items()]
		return sorted(filter(lambda emotion: emotion[1] > Backend.get_emotion_threshold(), measured),
			key=lambda emotion: emotion[1])
