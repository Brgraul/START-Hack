import React, { Component } from 'react';
import '../style/expressions.css';

class Expressions extends Component {
	handleNameChange = () => {
		const { changeName, personId } = this.props;
		const name = document.querySelector("input[name='name'").value;
		changeName(name, personId);
	};
	render() {
		const { expressions, interpretation, error, personName } = this.props;
		const face = expressions ? expressions[0] : undefined;
		const emotions = face ? face.faceAttributes.emotion : undefined;
		return (
			<div className='expressions'>
				<table>
					<tbody>
						{emotions
							? Object.keys(emotions).map(function(key) {
									return (
										<tr>
											<td>{key}</td>
											<td>{emotions[key]}</td>
										</tr>
									);
							  })
							: ''}
					</tbody>
				</table>
				<p>{interpretation}</p>
				{personName === 'Unnamed person' ? (
					<React.Fragment>
						<input name='name' placeholder='What is the name of this person?' />
						<button onClick={this.handleNameChange}>Submit</button>
					</React.Fragment>
				) : (
					''
				)}
			</div>
		);
	}
}

export default Expressions;
