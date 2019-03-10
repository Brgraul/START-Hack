import React, { Component } from 'react';

class Graph extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='widget average'>
					<h2>Average Emotions</h2>
					<div id='chart' />
				</div>
				<select className='hide' id='dropdown' />
			</React.Fragment>
		);
	}
}
export default Graph;
