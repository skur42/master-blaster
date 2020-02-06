import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CountUp from 'react-countup';
import { getMatchesWon, getRuns, getCenturies, getCatches } from '../functions/stat_functions';

class Overview extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
      matches: getMatchesWon(this.props.career_data),
      centuries: getCenturies(this.props.career_data),
      totalRuns: getRuns(this.props.career_data),
      catches: getCatches(this.props.career_data)
	  };
	}

  componentDidMount() {
    this.props.setView('')
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Sachin Tendulkar</title>
        </Helmet>

        <div className="container w-3/4 mx-auto mt-24 mb-40">
          <div className="w-full flex items-start justify-between">
            <div className="w-5/12">
              <img className="w-full" src={require("../images/sachin.jpg")}/>
              <div className="mt-6 font-mono text-xl leading-relaxed">
                Sachin Tendulkar is the only cricketer who has scored 
                <span className="font-bold"> 100 centuries</span> in the international cricket.
              </div>
            </div>
            <div className="w-3/6 pt-5">
              <div className="flex items-center justify-between w-full py-5 px-3 border-b">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">Runs</span>
                  <p className="text-lg font-normal text-gray-700">Scored</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700" 
                  end={this.state.totalRuns} />
              </div>
              <div className="flex items-center justify-between w-full py-5 px-3 border-b">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">Matches</span>
                  <p className="text-lg font-normal text-gray-700">Played</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700"
                 end={this.props.career_length} />
              </div>
              <div className="flex items-center justify-between w-full py-5 px-3 border-b">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">Matches</span>
                  <p className="text-lg font-normal text-gray-700">Won</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700"
                 end={this.state.matches[0]} />
              </div>
              <div className="flex items-center justify-between w-full py-5 px-3 border-b">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">100s</span>
                  <p className="text-lg font-normal text-gray-700">Centuries</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700"
                 end={this.state.centuries[1]} />
              </div>
              <div className="flex items-center justify-between w-full py-5 px-3 border-b">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">50s</span>
                  <p className="text-lg font-normal text-gray-700">Half centuries</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700"
                 end={this.state.centuries[0]} />
              </div>
              <div className="flex items-center justify-between w-full py-5 px-3">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">Catches</span>
                  <p className="text-lg font-normal text-gray-700">Taken</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700"
                 end={this.state.catches} />
              </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Overview);
