import Person from './person';
import * as thresholds from './thresholds';
const fetch = require('node-fetch');
const server = 'https://westeurope.api.cognitive.microsoft.com/';
const subscriptionKey = '94e0060162d84581975ef1011b018af9';

export var people = {};

const positive = [
	-Math.sqrt(0.25),
	0,
	0,
	0,
	Math.sqrt(0.25),
	0,
	-Math.sqrt(0.25),
	Math.sqrt(0.25)
];
const anger = [Math.sqrt(0.5), Math.sqrt(0.5), 0, 0, 0, 0, 0, 0];
const fear = [0, 0, Math.sqrt(0.5), Math.sqrt(0.5), 0, 0, 0, 0];
const sad = [
	Math.sqrt(0.3333),
	Math.sqrt(0.3333),
	0,
	0,
	0,
	0,
	Math.sqrt(0.3333),
	0
];

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

export function renamePerson(personID, newName) {
	people[personID].name = newName;
	fetch(
		server + 'face/v1.0/persongroups/conversationpartners/persons/' + personID,
		{
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key': subscriptionKey
			},
			body: JSON.stringify({
				name: newName,
				userData: ''
			})
		}
	);
}

/*
function forceFeedback() {
	feedback = [];
	for (const [id, person] of Object.entries(people)) {
		feedback.push(getFeedback(person, person.lastEmotion));
	}
	return feedback.join('\n');
}
*/

function dot(v, w) {
	var tot = 0;
	for (let i = 0; i < 8; i++) {
		tot += v[i] * w[i];
	}
	return tot;
}

function norm(vector) {
	var tot = 0;
	for (var i = 0; i < 8; i++) {
		tot += vector[i] * vector[i];
	}
	return Math.sqrt(tot);
}

/*
function vectorsUnequal(v1, v2) {
	for (var i = 0; i < 8; i++) {
		if (v1[i] !== v2[i]) {
			return true;
		}
	}
	return false;
}
*/
function getFeedback(person, emotion) {
	var emoVec = emotionToVector(emotion);
	var oldEmo = person.getEmotionVector();
	var delta = [];
	for (var i = 0; i < 8; i++) {
		delta.push(emoVec[i] - oldEmo[i]);
	}
	// Update last emotion
	person.setEmotion(emotion);
	if (norm(delta) < thresholds.getEmotionChangeThreshold()) {
		return undefined;
	}
	let topEmotions = getTopEmotions(emotion);
	if (topEmotions.length === 0) {
		return 'No emotions detected';
	}
	//let primary = topEmotions[topEmotions.length - 1];
	// Provide feedback based on reaction
	console.log('Dot', dot(emoVec, sad));
	if (dot(emoVec, anger) > 0.2) {
		return `You made ${person.name} angry.`;
	} else if (dot(emoVec, fear) > 0.2) {
		return `You scared ${person.name}!`;
	} else if (dot(emoVec, sad) > 0.2) {
		return `You made ${person.name} sad.`;
	} else if (dot(emoVec, positive) > 0.2) {
		return `Good comeback! You made ${person.name} happy again!`;
	}
	return undefined;
}

export async function loadNewEmotion(face, imageData) {
	console.log('Face1', face);
	let identified = undefined;
	try {
		let identifiedRaw = await fetch(server + 'face/v1.0/identify', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key': subscriptionKey
			},
			body: JSON.stringify({
				personGroupId: 'conversationpartners',
				faceIds: [face['faceId']],
				maxNumOfCandidatesReturned: 1,
				confidenceThreshold: 0.5
			})
		});
		identified = (await identifiedRaw.json())[0];
	} catch (e) {
		console.log('Model not yet trained');
	}
	var personName = 'Unnamed person';
	console.log('Identified', identified);
	if (
		!identified ||
		!identified['candidates'] ||
		identified['candidates'].length === 0
	) {
		console.log('person not identified');
		const rect = face.faceRectangle;
		if (!rect) return 'Rect not found';
		const facerect = [rect.left, rect.top, rect.width, rect.height].join(',');
		let personResult = await fetch(
			server + 'face/v1.0/persongroups/conversationpartners/persons',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Ocp-Apim-Subscription-Key': subscriptionKey
				},
				body: JSON.stringify({
					name: personName,
					userData: ''
				})
			}
		);
		const personID = (await personResult.json())['personId'];
		fetch(
			server +
				'face/v1.0/persongroups/conversationpartners/persons/' +
				personID +
				'/persistedfaces',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Ocp-Apim-Subscription-Key': subscriptionKey
				},
				body: JSON.stringify({ url: imageData }),
				params: 'targetFace=' + facerect
			}
		);
		fetch(server + 'face/v1.0/persongroups/conversationpartners/train', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key': subscriptionKey
			}
		});
		face['personID'] = personID;
	} else {
		console.log('person identified!');
		face['personID'] = identified['candidates'][0]['personId'];
		let result = await fetch(
			server +
				'face/v1.0/persongroups/conversationpartners/persons/' +
				face['personID'],
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Ocp-Apim-Subscription-Key': subscriptionKey
				}
			}
		);
		personName = (await result.json())['name'];
		console.log('name: ', personName);
	}
	if (!(face['personID'] in people)) {
		people[face['personID']] = new Person(face['personID'], personName);
	}
	return {
		interpretation: getFeedback(
			people[face.personID],
			face.faceAttributes.emotion
		),
		personId: face['personID'],
		personName,
		people
	};
}

function getTopEmotions(emotion) {
	let emotions = [];
	for (const [emo, value] of Object.entries(emotion)) {
		if (value > thresholds.getEmotionThreshold()) {
			emotions.push([emo, value]);
		}
	}
	emotions.sort(function cmp(a, b) {
		return a[1] - b[1];
	});
	return emotions;
}
