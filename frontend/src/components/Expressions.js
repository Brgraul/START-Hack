import React, { Component } from 'react';
import '../style/expressions.css';

class Expressions extends Component {
	render() {
		const { expressions, interpretation, error } = this.props;
		const face = expressions ? expressions[0] : undefined;
		const emotions = face ? face.faceAttributes.emotion : undefined;
		return (
			<div className='expressions'>
				<table>
					<tbody>
						{emotions ? Object.keys(emotions).map(function(key) {
							return (
								<tr>
									<td>{key}</td>
									<td>{emotions[key]}</td>
								</tr>
							);
						}) : ''}
					</tbody>
				</table>
				<p>{interpretation}</p>
			</div>
		);
	}
}

export default Expressions;
