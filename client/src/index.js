import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { PrivateRoute } from './Components/PrivateRoute';

import Login from './Pages/LoginPage';
import Home from './Pages/HomePage';
import Signup from './Pages/SignupPage';
import Find from './Pages/FindPage';
import Change from './Pages/ChangePage';
import Apply from './Pages/ApplyPage';
import Check from './Pages/CheckPage';
import Notice from './Pages/NoticePage';
import ACheck from './Pages/ACheckPage';
import Write from './Pages/WritePage';
import Modify from './Pages/ModifyPage';

axios.defaults.validateStatus = function (status) {
  return status < 500; // default
}

ReactDOM.render(
  <HashRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/find" component={Find} />
      <Route path="/change" component={Change} />
      <Route path="/apply/:id" component={Apply} />
      <Route path="/check/:id" component={Check} />
      <Route path="/modify/:id" component={Modify} />
      <Route path="/write" component={Write} />
      <Route path="/notice" component={Notice} />
      <Route path="/acheck/:id" component={ACheck} />
      <Redirect path="/home" to="/" />
      <Redirect path="/change/:id" to="/change" />
      <Redirect path="/notice" to="/notice" />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();