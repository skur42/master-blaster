import React from 'react';
import { NavLink } from 'react-router-dom';

export class NavBar extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
      path: this.props.location.pathname.split('/')[1]
	  };
	}

  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ path: this.props.location.pathname.split('/')[1] })
    }
  }

  render() {
    return (
      <div className="fixed flex inset-0 w-full h-20 justify-center z-50 bg-white">
        <div className="flex w-8/12 h-full items-center justify-between font-sans text-gray-600
          uppercase tracking-wider">
          <NavLink to={"/"} style={this.state.path == '/' || this.state.path == '' 
            ? {color: '#444', fontWeight: '700'} : {}}>
            Overview
          </NavLink>
          <NavLink to={"/versus"} style={this.state.path == 'versus' || this.state.path == 'versus/' 
            ? {color: '#444', fontWeight: '700'} : {}}>
            Versus
          </NavLink>
          <NavLink to={"/career"} style={this.state.path == 'career' || this.state.path == 'career/' 
            ? {color: '#444', fontWeight: '700'} : {}}>
            Career
          </NavLink>
          <NavLink to={"/statistics"} style={this.state.path == 'statistics' || this.state.path == 'statistics/' 
            ? {color: '#444', fontWeight: '700'} : {}}>
            Statistics
          </NavLink>
        </div>
      </div>
    )
  }
}