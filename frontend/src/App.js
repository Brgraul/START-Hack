import React, { Component } from 'react';
import { Video, Expressions, Layout } from './components/';
import './App.css';
class App extends Component {
	state = {
		expressions: undefined,
		error: undefined,
		interpretation: undefined,
		personName: undefined,
		personId: undefined
	};

	componentDidMount = async () => {
		try {
			await fetch(
				'https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/conversationpartners',
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Ocp-Apim-Subscription-Key': '94e0060162d84581975ef1011b018af9'
					}
				}
			);
		} catch (e) {}
	};

	handleImage = async image => {
		const trainingStatus = await fetch(
			'https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/conversationpartners/training',
			{
				method: 'GET',
				headers: {
					'Ocp-Apim-Subscription-Key': '94e0060162d84581975ef1011b018af9'
				}
			}
		);
		if (trainingStatus['status'] === 'running') {
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
		const {
			expressions,
			interpretation,
			error,
			personId,
			personName
		} = await rawResponse.json();
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
		console.log('Name', personName, personId);
		this.setState({
			personId,
			personName
		});
	};

	changeName = async (name, personId) => {
		await fetch('http://local.flomllr.com/rename', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, personId })
		});
		this.setState({
			personId: undefined,
			personName: undefined
		})
	};

	render() {
		const { handleImage, changeName } = this;
		const {
			expressions,
			error,
			interpretation,
			personId,
			personName
		} = this.state;
		return (
			<div className='App'>
				<div className='bg-overlay' />
				<Layout>
					<Video
						handleImage={handleImage}
						interval={1000}
						backgroundColor='#fcbfbe'
					/>
					<Expressions
						expressions={expressions}
						error={error}
						interpretation={interpretation}
						personId={personId}
						personName={personName}
						changeName={changeName}
					/>
				</Layout>
			</div>
		);
	}
}

export default App;
