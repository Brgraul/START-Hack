import React, { Component } from 'react';
import { Video, Expressions, Layout } from './components/';
import './App.css';
class App extends Component {
	handleImage(image) {
		console.log(image);
	}

	render() {
		const { handleImage } = this;
		return (
			<div className='App'>
				<Layout>
					<Video 
						handleImage={handleImage}
						interval={1000}
					/>
					<Expressions />
				</Layout>
			</div>
		);
	}
}

export default App;
