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

function vectorAddInplace(v, w) {
	for (int i = 0; i < v.length; i++) {
		v[i] += w[i];
	}
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

	getPieData() {
		const count = this.emotionHistory.length;
		freq = [0,0,0,0,0,0,0,0];
		for (int i = 0; i < count; i++) {
			vectorAddInplace(freq, this.emotionHistory[i]);
		}
		data = [{ name: "Anger", value: freq[0] / count }),
			{ name: "Contempt", value: freq[1] / count }),
			{ name: "Disgust", value: freq[2] / count }),
			{ name: "Fear", value: freq[3] / count }),
			{ name: "Happiness", value: freq[4] / count }),
			{ name: "Neutral", value: freq[5] / count }),
			{ name: "Sadness", value: freq[6] / count }),
			{ name: "Surprise", value: freq[7] / count })];
		return data;
	}

	getEmotionVector() {
		return emotionToVector(this.lastEmotion);
	}
}
