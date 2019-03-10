import React, { Component } from 'react';
import { Video, Expressions, Layout } from './components/';
import './App.css';
class App extends Component {
	state = {
		expressions: undefined,
		error: undefined,
		interpretation: undefined
	};

	componentDidMount = () => {
		try {
			await fetch('https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/conversationpartners', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Ocp-Apim-Subscription-Key': '94e0060162d84581975ef1011b018af9'
				}
			});
		} catch (e) {}
	};

	handleImage = async image => {
		const trainingStatus = await fetch('https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/conversationpartners/training', {
			method: 'POST',
			headers: {
				'Ocp-Apim-Subscription-Key': '94e0060162d84581975ef1011b018af9'
			}
		});
		if (trainingStatus["status"] === "running") {
			return;
		}
		const rawResponse = await fetch('http://local.flomllr.com/analyzeframe', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ image })
		});
		const { expressions, interpretation, error } = await rawResponse.json();
		if (expressions || error || interpretation) {
			let currState = this.state;
			currState = {
				expressions: expressions ? expressions : currState.expressions,
				error: error ? error : currState.error,
				interpretation: interpretation
					? interpretation
					: currState.interpretation
			};
			this.setState(currState);
		}
	};

	render() {
		const { handleImage } = this;
		const { expressions, error, interpretation } = this.state;
		return (
			<div className='App'>
				<div className='bg-overlay' />
				<Layout>
					<Video
						handleImage={handleImage}
						interval={1000}
						backgroundColor='#3ddbfd'
					/>
					<Expressions
						expressions={expressions}
						error={error}
						interpretation={interpretation}
					/>
				</Layout>
			</div>
		);
	}
}

export default App;
