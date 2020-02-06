import React, { Component } from 'react';
import Chart from 'chart.js'

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: this.props.data,
    	labels: this.props.labels,
    	title: this.props.title
    };
  }

  componentDidMount() {
    this.renderGraph()
  }

  renderGraph() {
    var ctx = document.getElementById(`line-chart${this.state.title}`).getContext('2d');
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.props.labels,
        backgroundColor: '#8ed1fc',
        datasets: this.setDatasets()          
      },
    	options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
    	}
    });
  }

  setDatasets() {
    let datasets=[]
    datasets=[{
      label: "(No. of times) Scored more than 50 runs",
      backgroundColor: '#8ed1fc',
      borderColor: '#03a9f4',
      data: this.props.data
    }]
    return datasets
  }

  render() {
    return (
      <div className="mt-8">
        <canvas width='490px' height='290px' id={`line-chart${this.state.title}`}>
        </canvas>
      </div>
    );
  }
}

export default LineChart;
