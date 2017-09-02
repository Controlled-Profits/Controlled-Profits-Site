import React, { Component } from 'react';
import axios from 'axios';
import Login from './login.js';
import NewUserSignIn from './newUserSignIn.js';
import '../../styles/signIn.css';

export default class SignInBox extends Component {
  constructor() {
    super();
  }

  render(){
    return(
      <div className="container">
        <div className="logo-cp"></div>
        <h1 className="cp-login-header">Controlled Profits</h1>
        <div className="container">
          <div className="login-block container col-md-6">
            <Login />
          </div>
          <div className="signIn-block container col-md-6">
            <NewUserSignIn />
          </div>
        </div>
      </div>
    )
  }
}
