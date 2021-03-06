import React, { Component } from 'react';
import '../../styles/signIn.css';
import superagent from 'superagent';

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
    //console.log(this.state.email);
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
    //console.log(this.state.password);
  }

  handleUserSubmit(event) {
    event.preventDefault();
    superagent
      .post('http://controlledprofits.herokuapp.com/auth/sign_in/')
      .send({email: this.state.email, password: this.state.password})
      .end((err, res) => {
        if(err) { this.setState({errorMessage: "Authentication Failed"}); return; }
        console.log('res.body', res.body);
        var headers = res.header;
        console.log(headers);
        localStorage.setItem('Current-UserFN', res.body.data.firstname);
        localStorage.setItem('Current-UserLN', res.body.data.lastname);
        localStorage.setItem('Access-Token', headers['access-token']);
        localStorage.setItem('Client', headers['client']);
        localStorage.setItem('Token-Type', headers['token-type']);
        localStorage.setItem('Uid', headers['uid']);
        this.props.authenticateUser(headers, this.state.email, res.body.data.id);
      });
  }


  render(){
    console.log("state:", this.state)
    return(
      <div className="col-sm-10" >
        <h1 className="login-header">Login Information</h1>
        <form onSubmit={this.handleUserSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input className="form-control" value={this.state.email} onChange={this.handleEmailChange} placeholder="email"/>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="password"/>
          </div>
          <button className="btn btn-primary" type="submint">Login</button>
        </form>
      </div>
    )
  }
}
