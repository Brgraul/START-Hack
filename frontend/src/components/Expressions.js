import React, { Component } from 'react';
import '../style/expressions.css';
const svg = require('../assets/logo.svg');

class Expressions extends Component {
	render() { 
		const { expressions } = this.props;
		return (
			<div className='expressions'>
				<img src={svg}></img>
				<p>{JSON.stringify(expressions)}</p>
			</div>
		);
	}
}
 
export default Expressions;