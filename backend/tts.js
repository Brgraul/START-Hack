// To install dependencies, run: npm install
const xmlbuilder = require('xmlbuilder');
// request-promise has a dependency on request
const rp = require('request-promise');
const fs = require('fs');
const player = require('node-wav-player');

// Gets an access token.
export function getAccessToken(subscriptionKey) {
	let options = {
		method: 'POST',
		uri: 'https://westeurope.api.cognitive.microsoft.com/sts/v1.0/issueToken',
		headers: {
			'Ocp-Apim-Subscription-Key': subscriptionKey
		}
	};
	return rp(options);
}

// Converts text to speech using the input from readline.
export function textToSpeech(accessToken, text) {
	// Create the SSML request.
	let xml_body = xmlbuilder
		.create('speak')
		.att('version', '1.0')
		.att('xml:lang', 'en-us')
		.ele('voice')
		.att('xml:lang', 'en-us')
		.att(
			'name',
			'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)'
		)
		.txt(text)
		.end();
	// Convert the XML into a string to send in the TTS request.
	let body = xml_body.toString();

	let options = {
		method: 'POST',
		baseUrl: 'https://westeurope.tts.speech.microsoft.com/',
		url: 'cognitiveservices/v1',
		headers: {
			Authorization: 'Bearer ' + accessToken,
			'cache-control': 'no-cache',
			'User-Agent': 'YOUR_RESOURCE_NAME',
			'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
			'Content-Type': 'application/ssml+xml'
		},
		body: body
	};

	let request = rp(options).on('response', response => {
		if (response.statusCode === 200) {
			request.pipe(fs.createWriteStream(Date.now() + '.wav'));
			console.log('\nYour file is ready.\n');
		}
	});
	return request;
}
export async function callApi(textToRead) {
	try {
		const accessToken = await getAccessToken(
			'379d5a3e6d8d40a9ac943f57581b38a2'
		);
		await textToSpeech(accessToken, textToRead);
		player
			.play({
				path: 'TTSOutput.wav'
			})
			.then(() => {
				console.log('The wav file started to be played successfully.');
			})
			.catch(error => {
				console.error(error);
			});
	} catch (err) {
		console.log(`Something went wrong: ${err}`);
	}
}
