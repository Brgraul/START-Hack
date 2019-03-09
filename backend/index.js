import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';

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


app.get('/', (req, res) => {
	res.send(`Localhost`);
});

app.post('/analyzeframe', (req, res) => {
	const { image } = req.body;
	let base64Data;
	if (image && image.split(',')[0].indexOf('base64') >= 0){
		base64Data = image.split(',')[1];
	} else {
		res.json({error: 'Please provide valid base64 encoded image'});
	}
	const filename = Date.now() + ".png";
	fs.writeFile('./frames/'+filename, base64Data, 'base64', (err) => console.log(err));
	res.send({ url: 'http://local.flomllr.com/' + filename });
});
