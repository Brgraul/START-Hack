import React, { Component } from 'react';

class Graph extends Component {

	emotionToVector = (emotion) => {
		return [
			emotion['anger'],
			emotion['contempt'],
			emotion['disgust'],
			emotion['fear'],
			emotion['happiness'],
			emotion['neutral'],
			emotion['sadness'],
			emotion['surprise']
		];
	};

	getPieData = (person) => {
		const count = person.emotionHistory.length;
		console.log(person.emotionHistory);
		let freq = [0, 0, 0, 0, 0, 0, 0, 0];
		for (let i = 0; i < count; i++) {
			this.vectorAddInplace(freq, this.emotionToVector(person.emotionHistory[i]));
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
		data.forEach(emotion => {
			console.log(emotion);
			html += "<li>" + emotion.name + ": " + ((emotion.value * 100).toFixed(2)) + "%\n";
		});
		html += "</ul>"
		document.getElementById('chart').innerHTML = html;
	};

	populate = people => {
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

	render() {
		const { people } = this.props;
		this.populate(people);
		return (
			<React.Fragment>
				<div className='widget'>
					<div className='header'>Emotional Distribution</div>
					<div id='chart' />
				</div>
				<select id='dropdown' />
				<button type='button' onClick={() => this.refreshGraph(people)}>
					Refresh
				</button>
			</React.Fragment>
		);
	}
}
export default Graph;
