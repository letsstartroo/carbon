import React from "react";
import axios from "axios";
import { Button, Paper } from "@material-ui/core";
import Filtro from "./components/Filtro";
import CardTop from "../dashboard/components/CardTop";

const google = window.google;

export default class MapaCalorPage extends React.PureComponent {
  state = {
    loading: false,
    data: [],
    filtros: {}
  };

  async getData() {
    let { filtros } = this.state;

    this.setState({
      loading: true
    });

    let response = await axios.get("/estatistica/ocorrencias/localizacao", {
      params: filtros
    });

    this.setState({
      loading: false,
      data: response.data
    });
  }

  onFilter(filtros) {
    this.setState(
      {
        filtros: { ...filtros }
      },
      () => this.filtrar()
    );
  }

  filtrar() {
    this.componentDidMount();
  }

  async componentDidMount() {
    let map, heatmap;

    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: -16.4553954, lng: -54.6399975 },
      mapTypeId: "satellite"
    });

    await this.getData();

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.getPoints(),
      map: map
    });
  }

  getPoints() {
    let { data } = this.state;

    return data.map(
      item =>
        new google.maps.LatLng(Number(item.latitude), Number(item.longitude))
    );
  }

  render() {
    let { loading, data } = this.state;

    return (
      <div>
        <h2>
          Mapa de Calor <i className="fa fa-map" />
        </h2>

        <div style={{ clear: "both", width: "100%" }}>
          <Filtro onChange={filtros => this.onFilter(filtros)} />
        </div>

        <div style={{ clear: "both" }}>
          <Paper style={{ padding: 8, width: "70%", float: "left" }}>
            <div
              id="map"
              style={{
                width: "100%",
                height: "calc(100vh - 200px)"
              }}
            />
          </Paper>

          <div style={{ width: "25%", float: "right" }}>
            <div style={{ margin: "10px 0", width: "100%", float: "left" }}>
              <CardTop
                loading={loading}
                title="Total de Homens"
                color={"blue"}
                value={data.filter(x => x.sexo == "m").length}
                icon="fa fa-male"
              />
            </div>

            <div style={{ clear: "both", margin: "10px 0" }} />

            <div style={{ margin: "10px 0", width: "100%", float: "left" }}>
              <CardTop
                loading={loading}
                title="Total de Mulheres"
                color={"pink"}
                value={data.filter(x => x.sexo == "f").length}
                icon="fa fa-female"
              />
            </div>

            <div style={{ clear: "both", margin: "10px 0" }} />

            <div style={{ margin: "10px 0", width: "100%", float: "left" }}>
              <CardTop
                loading={loading}
                title="Mortes"
                color={"red"}
                value={data.filter(x => x.situacao_vitima_id == 4).length}
                icon="fa fa-user-times"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
