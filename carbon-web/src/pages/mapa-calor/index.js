import React from "react";
import MapaCalorPage from "./MapaCalorPage";
import { Route, Switch } from "react-router-dom";

function MapaCalorModule({ match: { url } }) {
  return (
    <Switch>
      <Route path={`${url}`} exact component={MapaCalorPage} />
    </Switch>
  );
}

export default MapaCalorModule;
