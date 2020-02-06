import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CountUp from 'react-countup';
import { getCountryStats, getCountryMatches } from '../functions/stat_functions';
import PieChart from '../components/Graphs/PieChart';

const countries = {
  "Australia": 'australia',
  "Bangladesh": "bangladesh",
  "Pakistan": 'pakistan',
  "New Zealand": 'new-zealand',
  "Sri Lanka": 'sri-lanka',
  "England": "england",
  "South Africa": "south-africa",
  "Zimbabwe": "zimbabwe",
  "Kenya": "kenya"
}

const countryNames = Object.keys(countries).map(function(key) {
  return key;
});

class Versus extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
      countries: countries,
      countryNames: countryNames,
      country: 'Australia',
      results: getCountryStats('Australia',this.props.career_data),
      data: getCountryMatches('Australia',this.props.career_data)
	  };
    this.changeCountry = this.changeCountry.bind(this);
	}

  componentDidMount() {
    this.props.setView(this.props.location.pathname.slice(1));
  }

  changeCountry(val) {
    this.setState({ 
      country: val,
      results: getCountryStats(val,this.props.career_data),
      data: getCountryMatches(val,this.props.career_data)
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Sachin Tendulkar - Versus</title>
        </Helmet>

        <div className="container w-4/5 mx-auto mt-32 mb-40">
          <div className="w-full flex items-center">
            <div className="w-full flex items-center justify-between">
              {this.state.countryNames.map(country => 
                <div className="mr-6 cursor-pointer border-b-2 border-white" onClick={() => this.changeCountry(`${country}`)}
                  style={this.state.country == `${country}` ? {borderColor: 'rgba(255,153,51,0.80)'} : {}}
                  key={country}>
                  <img src={require(`../images/${this.state.countries[country]}.svg`)}
                    className="w-full"/>
                </div>
              )}
            </div>
          </div>
          <div className="w-full text-center font-sans font-semibold mt-12 text-gray-700 text-2xl">
            Sachin VS {this.state.country}
          </div>
          <div className="w-full flex items-start justify-between mt-12">
            <div className="w-3/6">
              <div className="flex items-center justify-between w-full py-5 px-3 border-b">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">Matches</span>
                  <p className="text-lg font-normal text-gray-700">Played</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700" 
                  end={this.state.results[0]} />
              </div>
              <div className="flex items-center justify-between w-full py-5 px-3 border-b">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">Runs</span>
                  <p className="text-lg font-normal text-gray-700">Scored</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700"
                 end={this.state.results[3]} />
              </div>
              <div className="flex items-center justify-between w-full py-5 px-3 border-b">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">100s</span>
                  <p className="text-lg font-normal text-gray-700">Centuries</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700"
                 end={this.state.results[2]} />
              </div>
              <div className="flex items-center justify-between w-full py-5 px-3 border-b">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">50s</span>
                  <p className="text-lg font-normal text-gray-700">Half centuries</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700"
                 end={this.state.results[1]} />
              </div>
              <div className="flex items-center justify-between w-full py-5 px-3">
                <div className="font-sans tracking-wider">
                  <span className="text-4xl font-semibold text-gray-800">Catches</span>
                  <p className="text-lg font-normal text-gray-700">Taken</p>
                </div>
                <CountUp className="font-mono text-4xl mb-2 text-gray-700"
                 end={this.state.results[4]} />
              </div>
            </div>
            <div>
              <PieChart data={this.state.data}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(Versus);