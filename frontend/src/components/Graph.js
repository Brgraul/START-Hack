import React, { Component } from 'react';

class Expressions extends Component {
	function refreshGraph(people, index) {
		var data = people[index].getPieData();

		var w=300,h=300;
		var radius=(w-20)/2;
		 
		var pie=d3.layout.pie()
			.value(function(d){return d.percent})
			.sort(null);
		var arc=d3.svg.arc()
			.innerRadius(0)
			.outerRadius(radius);
		var color = d3.scale.ordinal()
			.range([ '#e75244','#33bb9d']);
		var svg=d3.select("#chart")
			.append("svg")
			.attr({
				width:w,
				height:h,
				class:'shadow'
			}).append('g')
			.attr('transform','translate('+(w/2)+','+(h/2)+')');
		var path=svg.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr({
				d:arc,
				fill:function(d,i){
				return color(i);
				}
			})
			.style({
				'fill-opacity':.15,
				stroke: function(d,i){
				return color(i);
				},
				'stroke-width': '2px'
			});
		var text=svg.selectAll('text')
			.data(pie(data))
			.enter()
			.append("text")
			.attr("transform", function (d) {
				return "translate(" + arc.centroid(d) + ")";
			})
			.attr("text-anchor", "middle")
			.text(function(d){
				return d.data.name+" ("+d.data.percent+"%)" ;
			})
			.style({
				fill:function(d,i){
				return color(i);
				},
				'font-size':'18px',
		 
			});
	}

	render() { 
		return (
			const { people } = this.props;
			<div class='widget'>
				<div class='header'>Emotional Distribution</div>
				<div id='chart' class='chart-container'></div>
			</div>
			<input type='button' onclick="refreshGraph(people, 0)">Refresh</input>
		);
	}
}
 
export default Expressions;
