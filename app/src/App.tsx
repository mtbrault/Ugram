import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/Home';
import Profile from './pages/Profile';
import store from './store';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/profile" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
