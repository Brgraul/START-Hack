from feedback import FeedbackModule

def test():
	facedata = {"emotion": {
			"anger": 0.0,
			"contempt": 0.0,
			"disgust": 0.0,
			"fear": 0.0,
			"happiness": 0.003,
			"neutral": 0.996,
			"sadness": 0.0,
			"surprise": 0.001
			}}
	FeedbackModule.load_new_emotion(facedata)

test()
