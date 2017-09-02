import React, { Component } from 'react';
import axios from 'axios';

export default class NewUserSignIn extends Component {
  constructor(props){
    super(props);

    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  }

  handleFirstnameChange(event){
    this.setState({firstname: event.target.value});
  }

  handleLastnameChange(event){
    this.setState({lastname: event.target.value});
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  handlePasswordConfirmationChange(event){
    this.setState({password_confirmation: event.target.value});
  }

  handleNewUserSubmit(){
    console.log(this.state);
  }

render(){
  return(
    <div className="col-sm-10">
      <h1>Sign Up Information</h1>
      <form onSubmit={this.handleUserSubmit}>

        <div className="form-group">
          <label>Firstname:</label>
          <input className="form-control" value={this.state.firstname} onChange={this.handleFirstnameChange} placeholder="firstname" />
        </div>
        <div className="form-group">
          <label>Lastname:</label>
          <input className="form-control" value={this.state.lastname} onChange={this.handleLastnameChange} placeholder="lastname"/>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input className="form-control" value={this.state.email} onChange={this.handleEmailChange} placeholder="email"/>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input className="form-control" value={this.state.password} onChange={this.handlePasswordChange} placeholder="password"/>
        </div>
        <div className="form-group">
          <label>Password Confirmation</label>
          <input className="form-control" value={this.state.password_confirmation} onChange={this.handlePasswordConfirmationChange} placeholder="password confirmation"/>
        </div>

        <button className="btn btn-primary" type="submit">submit</button>
      </form>
    </div>
  )
}
}
