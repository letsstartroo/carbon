import React from "react";
import RelatorioPage from "./RelatorioPage";
import { Route, Switch } from "react-router-dom";

function RelatorioModule({ match: { url } }) {
  return (
    <Switch>
      <Route path={`${url}`} exact component={RelatorioPage} />
    </Switch>
  );
}

export default RelatorioModule;
