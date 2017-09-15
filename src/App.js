import React, { Component } from 'react';
import './App.css';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';

import MemberHomeBox from './components/memberHome/memberHomeBox.js';
import SignInBox from './components/signIn/signInBox.js';

class App extends Component {
  constructor(props){
    super(props);

    this.handleUserAuthentication = this.handleUserAuthentication.bind(this);

    this.state= {
      authenticated: false,
      accessToken: '',
      client: '',
      tokenType: '',
      uid: '',
      id: ''
    }
  }

  handleUserAuthentication(headers, userEmail, userId){
    this.setState({accessToken: headers['access-token'], client: headers['client'], tokenType: headers['token-type'], uid: headers['uid'], id: userId});
    console.log('state', this.state);
    if(this.state.accessToken.length > 7 && this.state.client.length > 7 && this.state.tokenType === "Bearer" && this.state.uid === userEmail){
      this.setState({authenticated: true});
    }
  }


  render() {
    let match = this.props.match;
    return (
      <div>
        {this.state.authenticated === false ? (
          <SignInBox authenticateUser={this.handleUserAuthentication}/>
        ) : (
          <Redirect to={`/member/${this.state.id}/${this.state.uid}`} />
        )}
      </div>
    )
  }
}

export default App;
