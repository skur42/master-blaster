import React, { Component } from 'react';
import Chart from 'chart.js'

var chart = ''

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: this.props.data
    };
  }

  componentDidMount() {
    this.renderGraph()
  }

  componentDidUpdate(prevProps) {
  	if(this.props.data !== prevProps.data) {
  		this.setState({
  			data: this.props.data
  		})
  		chart.data.datasets[0].data = this.props.data;
  		chart.update();
  	}
  }

  renderGraph() {
    var ctx = document.getElementById(`doughnut-chart`).getContext('2d');
    chart = new Chart(ctx, { 
    	type: 'doughnut',
      data: {
        labels: ['Won', 'Lost', 'Draw'],
        datasets: [{
          label: 'Matches Won',
      		backgroundColor: ['#68bc00', '#eb144c', '#fcb900'],
          data: this.props.data
        }]
      },
    	options: {}
    });
  }

  render() {
    return (
      <div className="mt-8">
        <canvas width='400px' height='400px' id={`doughnut-chart`}>
        </canvas>
      </div> 
    );
  }
}

export default PieChart;