import React, { Component } from 'react';
import { Video, Expressions, Layout, Graph } from './components/';
import './App.css';
class App extends Component {
	state = {
		expressions: undefined,
		error: undefined,
		people: undefined,
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
		const { expressions, interpretation, error, people } = await rawResponse.json();
		if (expressions || error || interpretation || people) {
			let currState = this.state;
			currState = {
				expressions: expressions ? expressions : currState.expressions,
				error: error ? error : currState.error,
				people: people ? people : currState.people,
				interpretation: interpretation
					? interpretation
					: currState.interpretation
			};
			this.setState(currState);
		}
	};

	render() {
		const { handleImage } = this;
		const { expressions, error, interpretation, people } = this.state;
		return (
			<div className='App'>
				<Layout>
					<Video handleImage={handleImage} interval={1000} />
					<Expressions
						expressions={expressions}
						error={error}
						interpretation={interpretation}
					/>
					<Graph people={people} />
				</Layout>
			</div>
		);
	}
}

export default App;
