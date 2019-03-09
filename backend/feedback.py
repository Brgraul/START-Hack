import numpy as np
from backend import Backend

class FeedbackModule:
	lastEmotion = np.zeros(8)

	@staticmethod
	def get_feedback(emotion):
		primary = FeedbackModule.get_top_emotions(emotion)[-1]
		# Preliminary textual feedback
		print("Person is {} percent {}".format(primary[1] * 100, primary[0]))
		FeedbackModule.lastEmotion = emotion

	@staticmethod
	def load_new_emotion(face):
		newEmotion = np.array([value for _, value in face["emotion"].items()])
		if np.linalg.norm(newEmotion - FeedbackModule.lastEmotion) > Backend.get_emotion_change_threshold():
			FeedbackModule.get_feedback(face["emotion"])

	@staticmethod
	def get_top_emotions(emotion):
		measured = [(emo, value) for emo, value in emotion.items()]
		return sorted(filter(lambda emotion: emotion[1] > Backend.get_emotion_threshold(), measured),
			key=lambda emotion: emotion[1])
