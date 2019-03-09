import React, { Component } from 'react';
import { Video, Expressions, Layout } from './components/';

import './App.css';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Layout>
					<Video />
					<Expressions />
				</Layout>
			</div>
		);
	}
}

export default App;
