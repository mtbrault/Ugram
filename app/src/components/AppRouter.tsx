import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Divider from './Divider';
import Header from './Header';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const AppRouter: React.SFC = () => (
  <>
    <Header />
    <Divider />
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/" render={() => <Redirect to="/home" />} />
    </Switch>
  </>
);

export default AppRouter;
