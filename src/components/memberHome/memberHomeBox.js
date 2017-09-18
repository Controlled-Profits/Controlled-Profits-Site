import React, {Component} from 'react';
import superagent from 'superagent';
import {Redirect} from 'react-router-dom';

import AddBusiness from './addBusiness.js';
import ActiveBusiness from './activeBusiness.js';

import '../../styles/memberDesktop.css';

export default class MemberHomeBox extends Component {
  constructor(props){
    super(props);

    this.handleActiveBusinessChange = this.handleActiveBusinessChange.bind(this);

    this.state = {
      firstname: localStorage.getItem('Current-UserFN'),
      lastname: localStorage.getItem('Current-UserLN'),
      activeBiz: 'Your Biz'
    }
  }

  handleActiveBusinessChange(string){
    this.setState({activeBiz:string});
  }

  componentDidMount(){
    if(this.props.businessHolder.length === 1){
      let business = this.props.businessHolder[0].bizName
      this.handleActiveBusinessChange(business);
      this.props.setActiveBusiness(business);
    }
  }

  render(){
    return(
      <div className="memberHome-container">
        <div className="title-content-container">
          <h1>Welcome {this.state.firstname + ' ' + this.state.lastname}. </h1>
          <hr/>
        </div>
        <div className="settings-container">
          <div className="biz-header">
            <h1>{this.state.activeBiz}</h1>
            <hr/>
          </div>
          <div className="options-container">
            <AddBusiness getUserBusinesses={this.props.getUserBusinesses}/>
            <ActiveBusiness
            handleActiveBusinessChange={this.handleActiveBusinessChange}
            businessHolder={this.props.businessHolder}
            currentBusinesses={this.props.currentBusinesses} getUserBusinesses={this.props.getUserBusinesses}
            setActiveBusiness={this.props.setActiveBusiness} />
          </div>
        </div>
      </div>
    )
  }
}
