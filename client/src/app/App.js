import React from "react";

import { Route, Switch } from "react-router-dom";
import "./App.css";

import Dashboard from "../dashboard/Dashboard.js";
import { withRouter } from "react-router-dom";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";

const App = () => {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route component={Dashboard} />
    </Switch>
  );
};

export default withRouter(App);
