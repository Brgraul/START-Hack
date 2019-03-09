import React, { Component } from 'react';
import '../style/expressions.css';

class Expressions extends Component {
	render() { 
		const { expressions } = this.props;
		return (
			<div className='expressions'>
				<p>{JSON.stringify(expressions)}</p>
			</div>
		);
	}
}
 
export default Expressions;