import React from "react";
import DenunciaPage from "./DenunciaPage";
import { Route, Switch } from "react-router-dom";
import DenunciaDetailsPage from "./DenunciaDetailsPage";

function DenunciaModule({ match: { url } }) {
  return (
    <Switch>
      <Route path={`${url}`} exact component={DenunciaPage} />
      <Route path={`${url}/:id`} exact component={DenunciaDetailsPage} />
    </Switch>
  );
}

export default DenunciaModule;
