import React, { Component } from 'react';
import '../style/expressions.css';
import { Graph } from './';

class Expressions extends Component {
	componentDidMount = () => {
		const { active } = this.props;
		this.setState({ active });
	};

	handleNameChange = () => {
		const { changeName, personId } = this.props;
		const name = document.querySelector("input[name='name'").value;
		changeName(name, personId);
	};
	render() {
		const { expressions, interpretation, error, personName } = this.props;
		const face = expressions ? expressions[0] : undefined;
		const emotions = face ? face.faceAttributes.emotion : undefined;
		const innerElem = (
			<React.Fragment>
				<div className='current'>
					<h2>Current Emotions</h2>
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
				</div>
				<Graph />
				<div className='interpretation'>
					<h2>Interpretation</h2>
					<p>{interpretation}</p>
				</div>
				{personName === 'Unnamed person' ? (
					<div className='addname'>
						<input name='name' placeholder='What is her name?' />
						<button onClick={this.handleNameChange}>Submit</button>
					</div>
				) : (
					''
				)}
			</React.Fragment>
		);
		return (
			<div className='expressions'>
				{expressions && expressions.length ? innerElem : ''}
			</div>
		);
	}
}

export default Expressions;
