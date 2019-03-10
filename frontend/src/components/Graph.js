import React, { Component } from 'react';
import * as d3 from 'd3';

class Graph extends Component {
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
		const select = document.getElementById('dropdown');
		const key = select.options[select.selectedIndex].value;
		var person = people[key];
		console.log(person);
		let data = this.getPieData(person);

		var w = 300,
			h = 300;
		var radius = (w - 20) / 2;

		var pie = d3.pie()
			.value(function(d) {
				return d.value;
			})
			.sort(null);
		var arc = d3.arc()
			.innerRadius(0)
			.outerRadius(radius);
		var color = d3.scaleOrdinal()
			.range([
				'#ff0000',
				'#ffaa00',
				'#009900',
				'#ffff00',
				'#00ff00',
				'#dddddd',
				'#0000ff',
				'#00ffff'
			]);
		const chartEl = document.getElementById('chart');
		var svg = d3
			.select(chartEl)
			.append('svg')
			.attr({
				width: w,
				height: h,
				class: 'shadow'
			})
			.append('g')
			.attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');
		var path = svg
			.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr({
				d: arc,
				fill: function(d, i) {
					return color(i);
				}
			})
			.style({
				'fill-opacity': 0.15,
				stroke: function(d, i) {
					return color(i);
				},
				'stroke-width': '2px'
			});
		var text = svg
			.selectAll('text')
			.data(pie(data))
			.enter()
			.append('text')
			.attr('transform', function(d) {
				return 'translate(' + arc.centroid(d) + ')';
			})
			.attr('text-anchor', 'middle')
			.text(function(d) {
				return d.data.name + ' (' + d.data.percent + '%)';
			})
			.style({
				fill: function(d, i) {
					return color(i);
				},
				'font-size': '18px'
			});
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
				<script src='https://d3js.org/d3.v5.min.js' />
				<div className='widget'>
					<div className='header'>Emotional Distribution</div>
					<div id='chart' className='chart-container' />
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
