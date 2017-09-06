import React, { Component } from 'react';
import Login from './login.js';
import NewUserSignIn from './newUserSignIn.js';
import '../../styles/signIn.css';

export default class SignInBox extends Component {
  render(){
    return(
      <div className="container">
        <div className="logo-cp"></div>
        <h1 className="cp-login-header">Controlled Profits</h1>
        <div className="container">
          <div className="login-block container col-md-6">
            <Login authenticateUser={this.props.authenticateUser} />
          </div>
          <div className="signIn-block container col-md-6">
            <NewUserSignIn props={this.props}/>
          </div>
        </div>
      </div>
    )
  }
}
