import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './components/Home';
import Profile from './components/Profile';

const history = createBrowserHistory();

const App: React.FC = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
)

export default App;
