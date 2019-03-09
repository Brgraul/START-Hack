import React, { Component } from 'react';

class Expressions extends Component {
	function refreshGraph(people) {
		const index = document.getElementById("dropdown").selectedIndex;
		var data = people[index].getPieData();

		var w = 300,h = 300;
		var radius = (w - 20)/2;
		 
		var pie = d3.layout.pie()
			.value(function(d) { return d.value })
			.sort(null);
		var arc = d3.svg.arc()
			.innerRadius(0)
			.outerRadius(radius);
		var color = d3.scale.ordinal()
			.range(['#ff0000', '#ffaa00', '#009900', '#ffff00', '#00ff00', '#dddddd', '#0000ff', '#00ffff']);
		var svg = d3.select("#chart")
			.append("svg")
			.attr({
				width: w,
				height: h,
				class: 'shadow'
			}).append('g')
			.attr('transform', 'translate(' + (w / 2) + ',' + (h / 2) + ')');
		var path = svg.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr({
				d: arc,
				fill: function(d, i){
					return color(i)
				}
			})
			.style({
				'fill-opacity': 0.15,
				stroke: function(d, i){
					return color(i)
				},
				'stroke-width': '2px'
			});
		var text = svg.selectAll('text')
			.data(pie(data))
			.enter()
			.append("text")
			.attr("transform", function (d) {
				return "translate(" + arc.centroid(d) + ")";
			})
			.attr("text-anchor", "middle")
			.text(function(d) {
				return d.data.name + " (" + d.data.percent + "%)"
			})
			.style({
				fill:function(d, i) {
					return color(i)
				},
				'font-size': '18px',
		 
			});
	}

	render() { 
		function populate(people) {
			var menu = document.getElementById("dropdown");
			for (personID in people) {
				menu.options[menu.options.length] = new Option(people[personID].name, personID);
			}
		}
		return (
			const { people } = this.props;
			populate(people);
			<script src="https://d3js.org/d3.v5.min.js"></script>
			<div class='widget'>
				<div class='header'>Emotional Distribution</div>
				<div id='chart' class='chart-container'></div>
			</div>
			<input type='button' onclick="refreshGraph(people)">Refresh</input>
		);
	}
}
 
export default Expressions;
