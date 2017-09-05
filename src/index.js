import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import MemberHomeBox from './components/memberHome/memberHomeBox.js';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/member/:user' component={MemberHomeBox}/>
      <Route exact path='/' component={App} />
    </Switch>
  </BrowserRouter> ,
  document.getElementById('root'));
registerServiceWorker();
