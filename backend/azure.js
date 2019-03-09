import * as fetch from 'node-fetch';

export async function getExpressions(imageUrl) {
	// Replace <Subscription Key> with your valid subscription key.
	const subscriptionKey = '94e0060162d84581975ef1011b018af9';

	const azureUrl =
		'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion';
	try {
		const rawResponse = await fetch(azureUrl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key': subscriptionKey
			},
			body: JSON.stringify({ url: imageUrl })
		});
		const content = await rawResponse.json();
		return { result: content };
	} catch (e) {
		return { error: e };
	}
}
