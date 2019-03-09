import numpy as np

class Person:
	def __init__(self, azureFaceID, name=None):
		self.faceID = azureFaceID
		self.lastEmotion = {"anger":0, "contempt":0, "disgust":0, "fear":0, "happiness":0, "neutral":0, "sadness":0, "surprise":0}
		if name is None:
			self.name = "Person {}".format(self.faceID[-4:])
		else:
			self.name = name

	def get_emotion_vector(self):
		return [value for _, value in self.lastEmotion.items()]
