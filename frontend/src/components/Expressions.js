import React, { Component } from 'react';
import '../style/expressions.css';
const svg = require('../assets/logo.svg');

class Expressions extends Component {
	render() { 
		return (
			<div className='expressions'>
				<img src={svg}></img>
				<h2>This person is feeling</h2>
				<p>happy but it seems like he's in a rush.</p>
			</div>
		);
	}
}
 
export default Expressions;