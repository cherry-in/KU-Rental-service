import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './Pages/Login';
import Home from './Pages/Home';

ReactDOM.render(
<Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Home" component={Home} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
