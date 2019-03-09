import React, { Component } from 'react';
import '../style/layout.css';
const svg = require('../assets/logo_white.svg');

class Layout extends Component {
	render() { 
		return (
			<React.Fragment>
				<img alt='Logo' className='logo' src={svg}></img>
				<div className='layout'>
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}
 
export default Layout;