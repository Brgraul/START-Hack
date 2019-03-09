import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import * as azure from './azure';
import * as feedback from './feedback';

const app = express();
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
app.use(cors());
const port = 8090;
app.listen(port, () => {
	console.log('DiscountInCart Backend listening on port', port);
});

app.use('/frames', express.static('frames'));

app.get('/', (req, res) => {
	res.send(`Localhost`);
});

app.post('/analyzeframe', async (req, res) => {
	const { image } = req.body;
	let base64Data;
	if (image && image.split(',')[0].indexOf('base64') >= 0) {
		base64Data = image.split(',')[1];
	} else {
		res.json({ error: 'Please provide valid base64 encoded image' });
	}
	const filename = Date.now() + '.png'; //new Date().getSeconds() + '.png';
	fs.writeFile('./frames/' + filename, base64Data, 'base64', err =>
		console.log(err)
	);
	const url = 'http://local.flomllr.com/frames/' + filename;
	console.log(url);
	const { error, result: expressions } = await azure.getExpressions(url);
	if (error) res.send({ error, expressions });
	const returnstring = await feedback.loadNewEmotion(expressions, url);
	console.log(returnstring);
	res.send({ interpretation: returnstring, expressions, people: feedback.people });
});
