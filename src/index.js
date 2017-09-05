import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import MemberHomeBox from './components/memberHome/memberHomeBox.js';
import BusinessHome from './components/memberHome/businessFinancials.js';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/member/:user' component={MemberHomeBox}/>
      <Route path='/member/:user/:buisness' component={BusinessHome}/>
      <Route exact path='/' component={App} />
    </Switch>
  </BrowserRouter> ,
  document.getElementById('root'));
registerServiceWorker();
