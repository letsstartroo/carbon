import React from "react";
import DashboardPage from "./DashboardPage";
import { Route, Switch } from "react-router-dom";

function DashboardModule({ match: { url } }) {
  return (
    <Switch>
      <Route path="/" exact component={DashboardPage} />
    </Switch>
  );
}

export default DashboardModule;
