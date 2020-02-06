import React, { Component } from 'react';
import Chart from 'chart.js'

var chart = ''

class BarChart extends Component {
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

  componentDidUpdate(prevProps) {
  	if(this.props.title !== prevProps.title) {
  		this.setState({
  			data: this.props.data,
  			labels: this.props.labels,
    		title: this.props.title
  		})
  		chart.data.datasets[0].data = this.props.data;
  		chart.data.labels = this.props.labels;
  		chart.data.datasets[0].label = this.props.title;
  		chart.update();
  	}
  }

  renderGraph() {
    var ctx = document.getElementById('bar-chart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
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

    if(this.props.threshold !== undefined) {
      this.setColors(chart)
    }
  }

  setColors(chart) {
    let datasets = chart.data.datasets
    datasets.map((dataset) => {
      let bars=dataset.data
      let colors=[]
      bars.map((bar)=>{
        if(bar >= this.props.threshold) {
          colors.push(this.props.thresholdColors[0])
        }
        else {
          colors.push(this.props.thresholdColors[1])
        }
    	})
    	dataset.backgroundColor = colors
    })
    chart.update()
  }

  setDatasets() {
    let datasets=[]
    if(this.props.threshold !== undefined) {
      datasets.push({
        label: this.props.title,
        backgroundColor: '#8ed1fc',
        borderColor: '#03a9f4',
        data: this.props.data
      })
    }
    else {
    	datasets=[{
    	  label: this.props.title,
    	  backgroundColor: '#8ed1fc',
    	  borderColor: '#03a9f4',
    	  data: this.props.data
    	}]
    }
    return datasets
  }

  render() {
    return (
      <div className="mt-8">
        <canvas width='400px' height='180px' id={'bar-chart'}>
        </canvas>
      </div>
    );
  }
}

export default BarChart;
