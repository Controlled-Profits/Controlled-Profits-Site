import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);

    this.state = {
      email: "",
      password: ""
    }
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  handleUserSubmit() {

  }





  render(){
    return(
      <div>
        <h1>Login Information</h1>
        <form onSubmit={this.handleUserSubmit}>
          <br/>

          <label>Email:</label>
          <input value={this.state.email} onChange={this.handleEmailChange} placeholder="email"/>
          <br/>
          <label>Password:</label>
          <input value={this.state.password} onChange={this.handlePasswordChange} placeholder="password"/>
          <br/>
          <button type="submint">submit</button>
        </form>
      </div>
    )
  }
}
