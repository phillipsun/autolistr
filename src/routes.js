import React from "react";
import { Switch, Route } from "react-router-dom";

// Import components
import Auth from "./component/Auth/Auth";
import Dashboard from "./component/Dashboard/Dashboard";
import Form from "./component/Form/Form";
import ListingDetails from "./component/ListingDetails/ListingDetails";
import UserListings from "./component/UserListings/UserListings";
import UpdateListing from "./component/UpdateListing/UpdateListing";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/listing/new" component={Form} />
    <Route path="/listing/:id/edit" component={UpdateListing} />
    <Route path="/listing/:id" component={ListingDetails} />
    <Route path="/listings/:user_id" component={UserListings} />
  </Switch>
);
