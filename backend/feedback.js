import Person from './person';
import * as thresholds from './thresholds';
const fetch = require('node-fetch');
const server = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/';

var people = {};

function emotion_to_vector(emotion) {
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

/*
function rename_person(faceID, newName) {
	people[faceID].name = newName;
}

function force_feedback() {
	feedback = [];
	for (const [id, person] of Object.entries(people)) {
		feedback.push(get_feedback(person, person.lastEmotion));
	}
	return feedback.join('\n');
}
*/

function norm(vector) {
	var tot = 0;
	for (var i = 0; i < 8; i++) {
		tot += vector[i] * vector[i];
	}
	return Math.sqrt(tot);
}

function vectors_unequal(v1, v2) {
	for (var i = 0; i < 8; i++) {
		if (v1[i] !== v2[i]) {
			return true;
		}
	}
	return false;
}

function get_feedback(person, emotion) {
	var emoVec = emotion_to_vector(emotion);
	var oldEmo = person.get_emotion_vector();
	var delta = [];
	for (var i = 0; i < 8; i++) {
		delta.push(emoVec[i] - oldEmo[i]);
	}
	if (norm(delta) < thresholds.get_emotion_change_threshold()) {
		return undefined;
	}
	var inc = 0;
	var dec = 0;
	var incEmo = '';
	var decEmo = '';
	if (vectors_unequal(delta, emoVec)) {
		var index = 0;
		for (var emo in emotion) {
			if (
				delta[index] > inc &&
				delta[index] > thresholds.get_delta_threshold()
			) {
				inc = delta[index];
				incEmo = emo;
			}
			if (
				delta[index] < dec &&
				delta[index] < -thresholds.get_delta_threshold()
			) {
				dec = delta[index];
				decEmo = emo;
			}
			index++;
		}
	}
	if (inc > 0) {
		inc = `Greatest increase: ${incEmo}.`;
	} else {
		inc = '';
	}
	if (dec < 0) {
		dec = `Greatest decrease: ${decEmo}.`;
	} else {
		dec = '';
	}
	let topEmotions = get_top_emotions(emotion);
	if (topEmotions.length === 0) {
		return 'No emotions detected';
	}
	let primary = topEmotions[topEmotions.length - 1];
	// Update last emotion
	person.lastEmotion = emotion;
	// Preliminary textual feedback
	return `${person.name} is ${primary[1]} percent ${primary[0]}. ${inc} ${dec}`;
}

export function load_new_emotion(face, imageData) {
	console.log('Face1', face);
	face = face[0];
	let identified = undefined;
	try {
		identified = fetch(server + 'face/v1.0/identify', {
			method: 'POST',
			body: {
				personGroupId: 'conversationpartners',
				faceIds: [face['faceId']],
				maxNumOfCandidatesReturned: 1,
				confidenceThreshold: 0.5
			}
		}).then(res => {
			return res.json();
		});
	} catch (e) {
		return 'An error occured';
	}
	var personName = 'Unnamed person';
	if (
		!identified ||
		!identified['candidates'] ||
		identified['candidates'].length === 0
	) {
		const rect = face.faceRectangle;
		if (!rect) return 'Rect not found';
		const facerect = [rect.left, rect.top, rect.width, rect.height].join(',');
		const person_id = fetch(
			server + 'face/v1.0/persongroups/conversationpartners/persons',
			{
				method: 'POST',
				body: {
					name: personName,
					userData: ''
				}
			}
		).then(res => {
			return res.json()['personId'];
		});
		fetch(
			server +
				'face/v1.0/persongroups/conversationpartners/persons/' +
				person_id +
				'/persistedfaces',
			{
				method: 'POST',
				body: { url: imageData },
				params: 'targetFace=' + facerect /* not sure about this either */
			}
		);
		fetch(server + 'face/v1.0/persongroups/conversationpartners/train', {
			method: 'POST'
		});
		face['faceId'] = person_id;
	} else {
		face['faceId'] = identified['candidates'][0]['personId'];
		personName = fetch(
			server +
				'face/v1.0/persongroups/conversationpartners/persons/' +
				face['faceId'],
			{ method: 'GET' }
		).then(res => {
			return res.json()['name'];
		});
	}
	if (!(face['faceId'] in people)) {
		people[face['faceId']] = new Person(face['faceId'], personName);
	}
	console.log('Face2', face.faceAttributes);
	return get_feedback(people[face.faceId], face.faceAttributes.emotion);
}

function get_top_emotions(emotion) {
	let emotions = [];
	for (const [emo, value] of Object.entries(emotion)) {
		if (value > thresholds.get_emotion_threshold()) {
			emotions.push([emo, value]);
		}
	}
	emotions.sort(function cmp(a, b) {
		return a[1] - b[1];
	});
	return emotions;
}
