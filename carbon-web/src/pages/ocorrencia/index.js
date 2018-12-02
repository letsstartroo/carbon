import React from "react";
import OcorrenciaPage from "./OcorrenciaPage";
import { Route, Switch } from "react-router-dom";
import OcorrenciaDetailsPage from "./OcorrenciaDetailsPage";

function OcorrenciaModule({ match: { url } }) {
  return (
    <Switch>
      <Route path={`${url}`} exact component={OcorrenciaPage} />
      <Route path={`${url}/:id`} exact component={OcorrenciaDetailsPage} />
    </Switch>
  );
}

export default OcorrenciaModule;
