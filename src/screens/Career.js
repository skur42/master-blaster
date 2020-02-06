import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getMatchesOverYears, getRunsOverYears, getCatchesOverYears,
  getCenturiesOverYears, getHalfCenturiesOverYears} from '../functions/stat_functions';
import BarChart from '../components/Graphs/BarChart';

class Career extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
      title: 'Matches Played',
      data: getMatchesOverYears(this.props.career_data)[1],
      labels: getMatchesOverYears(this.props.career_data)[0]
	  };
	}

  componentDidMount() {
    this.props.setView(this.props.location.pathname.slice(1))
  }

  changeGraph(e) {
    if(e.target.value == 'Matches Played') {
      this.setState({
        title: e.target.value,
        data: getMatchesOverYears(this.props.career_data)[1],
        labels: getMatchesOverYears(this.props.career_data)[0]
      })
    }
    else if(e.target.value == 'Runs Scored') {
      this.setState({
        title: e.target.value,
        data: getRunsOverYears(this.props.career_data)[1],
        labels: getRunsOverYears(this.props.career_data)[0]
      })
    }
    else if(e.target.value == 'Catches Taken') {
      this.setState({
        title: e.target.value,
        data: getCatchesOverYears(this.props.career_data)[1],
        labels: getCatchesOverYears(this.props.career_data)[0]
      })
    }
    else if(e.target.value == 'Centuries') {
      this.setState({
        title: e.target.value,
        data: getCenturiesOverYears(this.props.career_data)[1],
        labels: getCenturiesOverYears(this.props.career_data)[0]
      })
    }
    else {
      this.setState({
        title: e.target.value,
        data: getHalfCenturiesOverYears(this.props.career_data)[1],
        labels: getHalfCenturiesOverYears(this.props.career_data)[0]
      })
    }
  }

  render() {
    const {title} = this.state;
    return (
      <div>
        <Helmet>
          <title>Sachin Tendulkar - Career</title>
        </Helmet>

        <div className="container w-3/4 mx-auto mt-32 mb-40">
          <div>
            <BarChart 
              title={this.state.title}   
              data={this.state.data} 
              labels={this.state.labels}/>
          </div>
          <div className="w-full flex items-center justify-between mt-8">
            <span className="font-sans font-semibold text-xl text-gray-900">
              Sachin's performance over the years</span>
            <div className="font-mono text-gray-800" onChange={this.changeGraph.bind(this)}>
              <input type="radio" value="Matches Played" checked={title == 'Matches Played'}
                className="ml-5"/> Matches
              <input type="radio" value="Runs Scored" checked={title == 'Runs Scored'}
                className="ml-5"/> Runs
              <input type="radio" value="Catches Taken" checked={title == 'Catches Taken'}
                className="ml-5"/> Catches
              <input type="radio" value="Centuries" checked={title == 'Centuries'}
                className="ml-5"/> 100s
              <input type="radio" value="Half Centuries" checked={title == 'Half Centuries'}
                className="ml-5"/> 50s
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

export default connect(mapStateToProps,mapDispatchToProps)(Career);