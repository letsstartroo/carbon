import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardModule from "./pages/dashboard";
import RelatorioModule from "./pages/relatorio";
import DenunciaModule from "./pages/denuncia";
import OcorrenciaModule from "./pages/ocorrencia";
import MapaCalorPage from "./pages/mapa-calor/MapaCalorPage";

const AppRouter = () => (
  <Switch>
    <Route component={DashboardModule} exact path="/" />
    <Route component={RelatorioModule} path="/relatorio" />
    <Route component={DenunciaModule} path="/denuncia" />
    <Route component={OcorrenciaModule} path="/ocorrencia" />
    <Route component={MapaCalorPage} path="/mapa-calor" />
  </Switch>
);

export default AppRouter;
