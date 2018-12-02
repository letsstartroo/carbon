import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import style from "./styles.module.scss";
import Ocorrencia24h from "./components/Ocorrencia24h";
import OcorrenciaMes from "./components/OcorrenciaMes";
import ParticipacaoDeHoje from "./components/ParticipacaoDeHoje";
import EvolucaoAcidenteTransito from "./components/EvolucaoAcidenteTransito";

export default class DashboardPage extends React.PureComponent {
  render() {
    return (
      <div style={{ paddingTop: 20 }}>
        <GridList spacing={16} cellHeight={130} cols={3}>
          <GridListTile>
            <OcorrenciaMes />
          </GridListTile>
          <GridListTile>
            <Ocorrencia24h />
          </GridListTile>
          <GridListTile>
            <ParticipacaoDeHoje />
          </GridListTile>
        </GridList>

        <div className={style.cardGrafico}>
          <h2 className={style.titleGrafico}>
            Evolução de Acidente de Trânsito
          </h2>
          <EvolucaoAcidenteTransito />
        </div>
      </div>
    );
  }
}
