import React from "react";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import tiposVeiculos from "../../services/tipo-veiculo";
import agravantes from "../../services/agravante";
import causas from "../../services/causas";
import { Button } from "@material-ui/core";

const google = window.google;

const styles = {
  col: {
    width: "20%",
    float: "left",
    padding: 8
  },
  select: {
    padding: "6px 8px",
    height: 30,
    width: "100%"
  }
};

export default class RelatorioPage extends React.PureComponent {
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

  handleChange(prop, value) {
    let { filtros } = this.state;

    filtros[prop] = value;

    this.setState({
      filtros: { ...filtros }
    });
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
    let { filtros } = this.state;

    return (
      <div>
        <h2>
          {" "}
          Relatórios <i className="fa fa-file-text" />
        </h2>

        <div>
          
        </div>
      </div>
    );
  }
}
