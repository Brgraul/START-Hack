import React, { Component } from 'react';

class Graph extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='widget'>
					<div className='header'>Emotional Distribution</div>
					<div id='chart' />
				</div>
				<select id='dropdown' />
			</React.Fragment>
		);
	}
}
export default Graph;
