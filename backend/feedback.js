people = {};

function rename_person(faceID, newName) {
	people[faceID].name = newName;
}

function force_feedback() {
	feedback = [];
	for (const [id, person] of Object.entries(people)) {
		feedback.push(get_feedback(person, person.lastEmotion));
	}
	return feedback.join("\n");
}

function norm(vector) {
	var tot = 0;
	for (var i = 0; i < 8; i++) {
		tot += vector[i] * vector[i];
	}
	return Math.sqrt(tot);
}

function vectors_unequal(v1, v2) {
	for (var i = 0; i < 8; i++) {
		if (v1[i] != v2[i]) {
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
	if (norm(delta) < get_emotion_change_threshold()) {
		return undefined;
	}
	var inc = 0;
	var dec = 0;
	var incEmo = "";
	var decEmo = "";
	if (vectors_unequal(delta, emoVec)) {
		var index = 0;
		for (var emo in emotion) {
			if (delta[index] > inc && delta[index] > get_delta_threshold()) {
				inc = delta[index];
				incEmo = emo;
			}
			if (delta[index] < dec && delta[index] < -get_delta_threshold()) {
				dec = delta[index];
				decEmo = emo;
			}
			index++;
		}
	}
	if (inc > 0) {
		inc = "Greatest increase: ${incEmo}.";
	} else {
		inc = "";
	}
	if (dec < 0) {
		dec = "Greatest decrease: ${decEmo}.";
	} else {
		dec = "";
	}
	topEmotions = get_top_emotions(emotion);
	if (topEmotions.length == 0) {
		return "No emotions detected";
	}
	primary = topEmotions[topEmotions.length - 1];
	// Update last emotion
	person.lastEmotion = emotion;
	// Preliminary textual feedback
	return "${person.name} is ${primary[1]} percent ${primary[0]}. ${inc} ${dec}";
}

function load_new_emotion(face) {
	if (!(face["faceId"] in people)) {
		people[face["faceId"]] = new Person(face["faceId"], "Unnamed person");
	}
	return get_feedback(people[face["faceId"]], face["faceAttributes"]["emotion"]);
}

function get_top_emotions(emotion) {
	emotions = [];
	for (const [emo, value] of Object.entries(emotion)) {
		if (value > get_emotion_threshold()) {
			emotions.push([emo, value]);
		}
	}
	emotions.sort(function cmp(a,b) { return a[1] - b[1] });
	return emotions;
}
