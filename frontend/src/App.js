import React, { Component } from 'react';
import { Video, Expressions, Layout, Graph } from './components/';
import './App.css';
class App extends Component {
	getPieData = (person) => {
		const count = person.emotionHistory.length;
		let freq = [0, 0, 0, 0, 0, 0, 0, 0];
		for (let i = 0; i < count; i++) {
			this.vectorAddInplace(freq, person.emotionHistory[i]);
		}
		let data = [
			{ name: 'Anger', value: freq[0] / count },
			{ name: 'Contempt', value: freq[1] / count },
			{ name: 'Disgust', value: freq[2] / count },
			{ name: 'Fear', value: freq[3] / count },
			{ name: 'Happiness', value: freq[4] / count },
			{ name: 'Neutral', value: freq[5] / count },
			{ name: 'Sadness', value: freq[6] / count },
			{ name: 'Surprise', value: freq[7] / count }
		];
		return data;
	};

	vectorAddInplace = (v, w) => {
		for (let i = 0; i < v.length; i++) {
			v[i] += w[i];
		}
	};

	refreshGraph = people => {
		const dropdown = document.getElementById('dropdown');
		const key = dropdown.options[dropdown.selectedIndex].value;
		let person = people[key];
		let data = this.getPieData(person);
		let html = "<ul>\n";
		for (var emotion in data) {
			html += "<li>" + emotion.name + ": " + (emotion.value * 100) + "%\n";
		}
		html += "</ul>"
		document.getElementById('chart').innerHTML = html;
		let menu = document.getElementById('dropdown');
		if(menu){
			let newDropdown = document.createElement('select');
			newDropdown.id = 'dropdown';
			menu.insertAdjacentElement('afterend', newDropdown);
			menu.remove();
			menu = newDropdown;
		}
		for (let personID in people) {
			menu.options[menu.options.length] = new Option(
				people[personID].name,
				personID
			);
		}
	};

	state = {
		expressions: undefined,
		error: undefined,
		people: undefined,
		interpretation: undefined,
		personName: undefined,
		personId: undefined
	};

	componentDidMount = async () => {
		try {
			await fetch(
				'https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/conversationpartners',
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Ocp-Apim-Subscription-Key': '94e0060162d84581975ef1011b018af9'
					}
				}
			);
		} catch (e) {}
	};

	handleImage = async image => {
		const trainingStatus = await fetch(
			'https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/conversationpartners/training',
			{
				method: 'GET',
				headers: {
					'Ocp-Apim-Subscription-Key': '94e0060162d84581975ef1011b018af9'
				}
			}
		);
		if (trainingStatus['status'] === 'running') {
			return;
		}
		const rawResponse = await fetch('http://local.flomllr.com/analyzeframe', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ image })
		});
		const {
			expressions,
			interpretation,
			error,
			personId,
			personName,
			people
		} = await rawResponse.json();
		if (expressions || error || interpretation) {
			let currState = this.state;
			currState = {
				expressions: expressions ? expressions : currState.expressions,
				error: error ? error : currState.error,
				people: people ? people : currState.people,
				interpretation: interpretation
					? interpretation
					: currState.interpretation
			};
			this.setState(currState);
			this.refreshGraph(people);
		}
		console.log('Name', personName, personId);
		this.setState({
			personId,
			personName
		});
	};

	changeName = async (name, personId) => {
		await fetch('http://local.flomllr.com/rename', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, personId })
		});
		this.setState({
			personId: undefined,
			personName: undefined
		})
	};

	render() {
		const { handleImage, changeName } = this;
		const {
			expressions,
			error,
			interpretation,
			personId,
			personName,
			people
		} = this.state;
		return (
			<div className='App'>
				<div className='bg-overlay' />
				<Layout>
					<Video
						handleImage={handleImage}
						interval={1000}
						backgroundColor='#3ddbfd'
					/>
					<Expressions
						expressions={expressions}
						error={error}
						interpretation={interpretation}
						personId={personId}
						personName={personName}
						changeName={changeName}
					/>
					<Graph />
				</Layout>
			</div>
		);
	}
}

export default App;
