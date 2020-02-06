import React, { Component, Suspense, lazy } from "react";
import {render} from "react-dom";
import {Switch, Route} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import data_overall from './sachin.csv';
import * as d3 from 'd3';
import { connect } from 'react-redux';

import { NavBar } from './components/NavBar';
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const Overview = lazy(() => import('./screens/Overview'));
const Versus = lazy(() => import('./screens/Versus'));
const Career = lazy(() => import('./screens/Career'));
const Statistics = lazy(() => import('./screens/Statistics'));

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading:true
    }
  }

  componentDidMount() {
    this.readCSV()
    setTimeout(() => {this.setState({ loading:false })}, 2000);
  }

  readCSV() {
    let matches_overall=[]
    this.setState({loading:true})

    d3.csv(data_overall, (res) => {
      let match=res
      matches_overall.push(match)
      this.props.setCareerDataOverall(matches_overall) 
    })
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<div></div>}>
          <ScrollToTop/>
          <Route path="/" component={NavBar}/>
          {this.state.loading ? <div></div> : <Switch>
            <Route exact path="/" component={Overview}/>
            <Route exact path="/versus" component={Versus}/>
            <Route exact path="/career" component={Career}/>
            <Route exact path="/statistics" component={Statistics}/>
          </Switch>}
        </Suspense>
      </Router>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    career_data: store.stats.career_data_overall,
    career_length: store.stats.career_length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCareerDataOverall: (career_data) => dispatch({type:'SET_CAREER_DATA_OVERALL',payload:career_data})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);