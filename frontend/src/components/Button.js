import React, { Component } from 'react';
import '../style/button.css';

class Button extends Component {
	render() { 
		const { backgroundColor, toggleFunction } = this.props;
		return (
			<button onClick={toggleFunction} style={{ backgroundColor }} className='startWebcam' type='button'>
				Start
			</button>
		);
	}
}
 
export default Button;