import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import components
import Auth from './component/Auth/Auth';
import Dashboard from './component/Dashboard/Dashboard';
import Form from './component/Form/Form';
import Listing from './component/Listing/Listing';

export default (
  <Switch>
    <Route exact path='/' component={Auth} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/listing/new' component={Form} />
    <Route path='/listing/:id' component={Listing} />
  </Switch>
)