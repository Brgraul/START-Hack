from feedback import FeedbackModule

def test():
	facedata = {
	"faceId": "dca95f9c-a65a-4ee5-a4c6-97d465edd58a",
	"faceRectangle": {
	"top": 166,
	"left": 128,
	"width": 218,
	"height": 218
	},
	"faceAttributes": {
	"hair": {
	"bald": 0.07,
	"invisible": False,
	"hairColor": [
	{
	"color": "blond",
	"confidence": 1.0
	},
	{
	"color": "red",
	"confidence": 0.91
	},
	{
	"color": "brown",
	"confidence": 0.69
	},
	{
	"color": "other",
	"confidence": 0.31
	},
	{
	"color": "gray",
	"confidence": 0.04
	},
	{
	"color": "black",
	"confidence": 0.01
	}
	]
	},
	"smile": 0.003,
	"headPose": {
	"pitch": 0.0,
	"roll": 9.1,
	"yaw": 12.7
	},
	"gender": "female",
	"age": 19.0,
	"facialHair": {
	"moustache": 0.0,
	"beard": 0.0,
	"sideburns": 0.0
	},
	"glasses": "NoGlasses",
	"makeup": {
	"eyeMakeup": True,
	"lipMakeup": True
	},
	"emotion": {
	"anger": 0.0,
	"contempt": 0.0,
	"disgust": 0.0,
	"fear": 0.0,
	"happiness": 0.003,
	"neutral": 0.996,
	"sadness": 0.0,
	"surprise": 0.001
	},
	"occlusion": {
	"foreheadOccluded": False,
	"eyeOccluded": False,
	"mouthOccluded": False
	},
	"accessories": [],
	"blur": {
	"blurLevel": "high",
	"value": 0.9
	},
	"exposure": {
	"exposureLevel": "goodExposure",
	"value": 0.64
	},
	"noise": {
	"noiseLevel": "low",
	"value": 0.0
	}
	},
	"faceLandmarks": {
	"pupilLeft": {
	"x": 197.8,
	"y": 212.6
	},
	"pupilRight": {
	"x": 288.7,
	"y": 232.5
	},
	"noseTip": {
	"x": 245.6,
	"y": 278.8
	},
	"mouthLeft": {
	"x": 193.4,
	"y": 324.9
	},
	"mouthRight": {
	"x": 256.7,
	"y": 340.5
	},
	"eyebrowLeftOuter": {
	"x": 170.0,
	"y": 179.1
	},
	"eyebrowLeftInner": {
	"x": 231.6,
	"y": 189.2
	},
	"eyeLeftOuter": {
	"x": 182.8,
	"y": 210.0
	},
	"eyeLeftTop": {
	"x": 198.7,
	"y": 206.5
	},
	"eyeLeftBottom": {
	"x": 196.8,
	"y": 217.0
	},
	"eyeLeftInner": {
	"x": 211.9,
	"y": 215.9
	},
	"eyebrowRightInner": {
	"x": 275.2,
	"y": 199.0
	},
	"eyebrowRightOuter": {
	"x": 325.2,
	"y": 208.1
	},
	"eyeRightInner": {
	"x": 276.3,
	"y": 229.6
	},
	"eyeRightTop": {
	"x": 292.8,
	"y": 226.2
	},
	"eyeRightBottom": {
	"x": 291.3,
	"y": 237.1
	},
	"eyeRightOuter": {
	"x": 306.0,
	"y": 234.9
	},
	"noseRootLeft": {
	"x": 232.5,
	"y": 220.3
	},
	"noseRootRight": {
	"x": 260.9,
	"y": 227.0
	},
	"noseLeftAlarTop": {
	"x": 220.9,
	"y": 256.0
	},
	"noseRightAlarTop": {
	"x": 265.2,
	"y": 263.3
	},
	"noseLeftAlarOutTip": {
	"x": 205.8,
	"y": 272.6
	},
	"noseRightAlarOutTip": {
	"x": 270.9,
	"y": 286.1
	},
	"upperLipTop": {
	"x": 236.2,
	"y": 316.8
	},
	"upperLipBottom": {
	"x": 233.8,
	"y": 331.6
	},
	"underLipTop": {
	"x": 232.3,
	"y": 332.3
	},
	"underLipBottom": {
	"x": 230.5,
	"y": 348.5
	}
	}
	}
	print(FeedbackModule.load_new_emotion(facedata))

test()
