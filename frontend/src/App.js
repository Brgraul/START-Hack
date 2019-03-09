import React, { Component } from 'react';
import { Video, Expressions, Layout } from './components/';
import './App.css';
class App extends Component {
	state = {
		expressions: undefined,
		error: undefined,
		interpretation: undefined
	};

	handleImage = async image => {
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
				<Layout>
					<Video handleImage={handleImage} interval={1000} />
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
