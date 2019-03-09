function emotionToVector(emotion) {
	return [
		emotion['anger'],
		emotion['contempt'],
		emotion['disgust'],
		emotion['fear'],
		emotion['happiness'],
		emotion['neutral'],
		emotion['sadness'],
		emotion['surprise']
	];
}

export default class Person {
	constructor(personID, name) {
		this.personID = personID;
		this.lastEmotion = {
			anger: 0,
			contempt: 0,
			disgust: 0,
			fear: 0,
			happiness: 0,
			neutral: 0,
			sadness: 0,
			surprise: 0
		};
		this.name = name;
		this.emotionHistory = [];
	}

	setEmotion(emotion) {
		this.lastEmotion = emotion;
		this.emotionHistory.push(emotion);
	}

	getEmotionVector() {
		return emotionToVector(this.lastEmotion);
	}
}
