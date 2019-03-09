import React, { Component } from 'react';
import { Video, Expressions, Layout } from './components/';
import './App.css';
class App extends Component {
	state = {
		expressions: {}
	}

	componentDidMount = () => {
		this.setState({
			expressions: {
				happy: 1,
				angry: 0.2
			}
		});
	}

/*	convertBase64oBinary = data => {
		const BASE64_MARKER = ';base64,';
		const base64Index = data.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		const base64 = data.substring(base64Index);
		const raw = window.atob(base64);
		var rawLength = raw.length;
		var array = new Uint8Array(new ArrayBuffer(rawLength));

		for (let i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
		}
		return array;
	};
	*/

	handleImage = image => {
		console.log(image);
	};

	render() {
		const { handleImage } = this;
		const { expressions } = this.state;
		return (
			<div className='App'>
				<Layout>
					<Video handleImage={handleImage} interval={1000} />
					<Expressions
						expressions={expressions}
					/>
				</Layout>
			</div>
		);
	}
}

export default App;
