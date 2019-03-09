function emotion_to_vector(emotion) {
	return [
		emotion["anger"], emotion["contempt"], emotion["disgust"], emotion["fear"],
		emotion["happiness"], emotion["neutral"], emotion["sadness"], emotion["surprise"]
	];
}

class Person {
	constructor(azureFaceID, name) {
		this.faceID = azureFaceID;
		this.lastEmotion = {"anger":0, "contempt":0, "disgust":0, "fear":0, "happiness":0, "neutral":0, "sadness":0, "surprise":0};
		this.name = name;
	}

	get_emotion_vector() {
		return emotion_to_vector(this.lastEmotion);
	}
}
