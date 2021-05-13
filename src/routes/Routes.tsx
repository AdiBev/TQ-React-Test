import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Companies from './Companies';
import CreateCompany from './CreateCompany';

import Home from './Home';
import NotFound from './NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/companies' exact component={Companies} />
      <Route path='/create' exact component={CreateCompany} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
