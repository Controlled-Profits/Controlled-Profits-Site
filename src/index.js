import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import AppHomeBox from './components/AppHomeBox.js';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/member/:userId/:lastname' component={AppHomeBox}/>
      <Route exact path='/' component={App} />
    </Switch>
  </BrowserRouter> ,
  document.getElementById('root'));
registerServiceWorker();
