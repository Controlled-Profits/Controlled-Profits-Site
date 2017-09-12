import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers/index.js';
import AppHomeBox from './components/AppHomeBox.js';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(allReducers,
  //allows access to redux dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/member/:userId/:lastname' component={AppHomeBox}/>
        <Route exact path='/' component={App} />
      </Switch>
    </BrowserRouter>
  </Provider> ,
  document.getElementById('root'));
registerServiceWorker();
