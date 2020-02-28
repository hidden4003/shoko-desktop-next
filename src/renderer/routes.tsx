import React from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './pages/login';

export default () => (
    <Switch>
      <Route exact path="/" component={LoginPage} />
    </Switch>
);
