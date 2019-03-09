import numpy as np

class Person:
	def __init__(self, azureFaceID, name=None):
		self.faceID = azureFaceID
		self.lastEmotion = np.zeros(8)
		if name is None:
			self.name = "Person {}".format(self.faceID[-4:])
		else:
			self.name = name
