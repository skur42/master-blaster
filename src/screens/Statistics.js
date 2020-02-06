import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import BarChart from '../components/Graphs/BarChart';
import PolarChart from '../components/Graphs/PolarChart';
import LineChart from '../components/Graphs/LineChart';
import { getAverageBattingScore, getCenturies, getMatchesWon,
        getTopGrounds, getTopRivals } from '../functions/stat_functions';

class Statistics extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
      statistics: [
        {
          name: 'Average Batting Score',
          graph: 'bar',
          data: getAverageBattingScore(this.props.career_data)[1],
          labels: getAverageBattingScore(this.props.career_data)[0],
          threshold: 30,
          thresholdColors: ['#8ed1fc', '#f47373'],
          thresholdLabels: ['Average Batting Score >= 30', 'Average Batting Score < 30']
        },
        {
          name: 'Centuries',
          data: getCenturies(this.props.career_data),
          labels: ['50s', '100s'],
          colors: ['#8ed1fc', '#f78da7'],
          graph: 'polarArea'
        },
        {
          name: 'Matches Won',
          data: getMatchesWon(this.props.career_data),
          labels: ['Won', 'Lost', 'Draw'],
          colors: ['#68bc00', '#eb144c', '#fcb900'],
          graph: 'polarArea'
        },
        {
          name: 'Top Performing Grounds',
          data: getTopGrounds(this.props.career_data)[0],
          labels: getTopGrounds(this.props.career_data)[1],
          colors: '#8ed1fc',
          graph: 'line'
        },
        {
          name: 'Top Rivals',
          data: getTopRivals(this.props.career_data)[0],
          labels: getTopRivals(this.props.career_data)[1],
          colors: '#8ed1fc',
          graph: 'line'
        }
      ]
	  };
	}

  componentDidMount() {
    this.props.setView(this.props.location.pathname.slice(1))
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Sachin Tendulkar - Statistics</title>
        </Helmet>

        <div className="container w-3/4 mx-auto mt-32 mb-40">
          <div>
            <span className="font-sans font-semibold text-xl text-gray-900">
              Average Batting Score</span>
            <BarChart
              title={this.state.statistics[0].name}   
              data={this.state.statistics[0].data} 
              labels={this.state.statistics[0].labels}
              threshold={this.state.statistics[0].threshold}
              thresholdColors={this.state.statistics[0].thresholdColors}
              thresholdLabels={this.state.statistics[0].thresholdLabels}/>
            <p className="w-full text-center mt-8 text-gray-700">
              Only 6 times in his career Sachin has had an average score of fewer than 30 runs.</p>
          </div>
          <div className="w-full flex items-start justify-between mt-24">
            <div>
              <span className="font-sans font-semibold text-xl text-gray-900">Centuries</span>
              <PolarChart 
                title={this.state.statistics[1].name}   
                data={this.state.statistics[1].data} 
                labels={this.state.statistics[1].labels}
                colors={this.state.statistics[1].colors}/>
              <p className="w-full text-center mt-8 text-gray-700">
                Record of 49 Centuries and 96 Half Centuries in ODI</p>
            </div>
            <div>
              <span className="font-sans font-semibold text-xl text-gray-900">Matches Won</span>
              <PolarChart 
                title={this.state.statistics[2].name}   
                data={this.state.statistics[2].data} 
                labels={this.state.statistics[2].labels}
                colors={this.state.statistics[2].colors}/>
              <p className="w-full text-center mt-8 text-gray-700">
                With Sachin on the field the Indian team won 231 times in ODI</p>
            </div>
          </div>
          <div className="w-full flex items-start justify-between mt-24">
            <div>
              <span className="font-sans font-semibold text-xl text-gray-900">
                Top Performing Grounds</span>
              <LineChart 
                title={this.state.statistics[3].name}   
                data={this.state.statistics[3].data} 
                labels={this.state.statistics[3].labels}
                colors={this.state.statistics[3].colors}/>
              <p className="w-full text-center mt-8 text-gray-700">
                Sachin has best performed in Sharjah Stadium, U.A.E.</p>
            </div>
            <div>
              <span className="font-sans font-semibold text-xl text-gray-900">Top Rivals</span>
              <LineChart
                title={this.state.statistics[4].name}   
                data={this.state.statistics[4].data} 
                labels={this.state.statistics[4].labels}
                colors={this.state.statistics[4].colors}/>
              <p className="w-full text-center mt-8 text-gray-700">
                Sachin's favourite rival is Sri Lanka (in ODI)</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    career_data: store.stats.career_data_overall,
    career_length: store.stats.career_length
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setView:(view) => dispatch({ type:'SET_VIEW', payload:view })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Statistics);