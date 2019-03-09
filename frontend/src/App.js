import React, { Component } from 'react';
import { Video, Expressions, Layout } from './components/';
import './App.css';
class App extends Component {
	state = {
		expressions: {}
	};

	componentDidMount = () => {
		this.setState({
			expressions: {
				happy: 1,
				angry: 0.2
			}
		});
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
		const content = await rawResponse.json();

		console.log(content);
	};

	render() {
		const { handleImage } = this;
		const { expressions } = this.state;
		return (
			<div className='App'>
				<Layout>
					<Video handleImage={handleImage} interval={1000} />
					<Expressions expressions={expressions} />
				</Layout>
			</div>
		);
	}
}

export default App;
