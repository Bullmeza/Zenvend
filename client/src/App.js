import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard.js";
import { withRouter } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import LoadingView from "./components/LoadingView.js";
import "./App.css";

import { useQuery } from "@apollo/client";
import { GET_USER_BY_SESSION_ID } from "./data/queries";
import { getCookie } from "./data/common";

const App = () => {
   const sessionId = getCookie("sessionid");
   const { data, error } = useQuery(GET_USER_BY_SESSION_ID, {
      variables: { sessionid: sessionId },
   });

   if (data) {
      const { email, points, id } = data?.getUserBySessionId;
      return <Dashboard email={email} points={points} userId={id} />;
   }

   if (error) {
      return (
         <Switch>
            <Route path="/login">
               <SignIn />
            </Route>
            <Route path="/signup">
               <SignUp />
            </Route>
            <Route>
               <Dashboard />;
            </Route>
         </Switch>
      );
   }

   return <LoadingView />;
};

export default withRouter(App);
