import React, { Component } from 'react';
import axios from 'axios';
import Login from 'login.js';
import NewUserSignIn from 'newUserSignIn.js';

export default class SignInBox extends Component {
  constructor() {
    super();
  }

  render(){
    return(
      <div>
        <div className="logo-cp"></div>
        <h1>Controlled Profits</h1>
        <div className="login-block">
          <Login />
        </div>
        <div className="signIn-block">
          <NewUserSignIn />
        </div>
      </div>
    )
  }
}
