import React, {Component} from 'react';
import superagent from 'superagent';
import {Redirect} from 'react-router-dom';

import AddBusiness from './addBusiness.js';
import ActiveBusiness from './activeBusiness.js';

import '../../styles/memberDesktop.css';

export default class MemberHomeBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: localStorage.getItem('Current-UserFN'),
      lastname: localStorage.getItem('Current-UserLN'),
      activeBiz: 'Your Biz'
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
          <AddBusiness/>
          <ActiveBusiness/>
        </div>
      </div>
    )
  }
}
