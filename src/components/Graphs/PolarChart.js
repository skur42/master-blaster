import React, { Component } from 'react';
import Chart from 'chart.js'

class PolarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: this.props.data
    };
  }

  componentDidMount() {
    this.renderGraph()
  }

  renderGraph() {
    var ctx = document.getElementById(`polar-chart${this.props.title}`).getContext('2d');
    var chart = new Chart(ctx, { 
    	type: 'polarArea',
      data: {
        labels: this.props.labels,
        datasets: [{
          label: this.props.name,
      		backgroundColor: this.props.colors,
          data: this.props.data
        }]
      },
    	options: {}
    });
  }

  render() {
    return (
      <div className="mt-8">
        <canvas width='500px' height='400px' id={`polar-chart${this.props.title}`}>
        </canvas>
      </div> 
    );
  }
}

export default PolarChart;