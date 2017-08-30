import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignInBox from './components/signIn/signInBox.js';

class App extends Component {
  render() {
    return (
      <div>
        <SignInBox />
      </div>
    );
  }
}

export default App;
