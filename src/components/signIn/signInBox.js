import React, { Component } from 'react';

export default class SignInBox extends Component {
  constructor(props) {
    super(props);

    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);

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




  render(){
    return(
      <div>
        <h1>Login Information</h1>
        <form onSubmit={this.handleUserSubmit}>
          <br/>
          <label>Firstname:</label>
          <input value={this.state.firstname} onChange={this.handleFirstnameChange} placeholder="firstname" />
          <br/>
          <label>Lastname:</label>
          <input value={this.state.lastname} onChange={this.handleLastnameChange} placeholder="lastname"/>
          <br/>
          <label>Email:</label>
          <input value={this.state.email} onChange={this.handleEmailChange} placeholder="email"/>
          <br/>
          <label>Password:</label>
          <input value={this.state.password} onChange={this.handlePasswordChange} placeholder="password"/>
          <br/>
          <label>Password Confirmation</label>
          <input value={this.state.password_confirmation} onChange={this.handlePasswordConfirmationChange} placeholder="password confirmation"/>
          <br/>
          <button type="submint">submit</button>
        </form>
      </div>
    )
  }
}
