import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

let BASE_URL = "http://192.168.129.123:8000/api/arquivo/";

const styles = theme => ({
  root: {
    padding: "16px",
    margin: "5px",
    flex: 1,
    width: "40%",
    float: "left"
  },
  span: {
    paddingLeft: "10px",
    color: "#777"
  }
});
const google = window.google;

class DenunciaDetailsPage extends React.PureComponent {
  state = {
    loading: false,
    data: {}
  };

  async componentDidMount() {
    await this.getData();

    this.renderMap();
  }

  renderMap() {
    let map, heatmap;

    let { data } = this.state;

    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: Number(data.latitude), lng: Number(data.longitude) },
      mapTypeId: "satellite"
    });

    var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: ""
    });

    marker.setMap(map);
  }

  getPoints() {
    let { data } = this.state;

    return [
      new google.maps.LatLng(Number(data.latitude), Number(data.longitude))
    ];
  }

  async getData() {
    this.setState({
      loading: true
    });

    let response = await axios.get("/evento/" + this.props.match.params.id);

    this.setState({
      loading: false,
      data: response.data
    });
  }

  renderFile() {
    let { data } = this.state;

    let anexo = BASE_URL + data.anexo;

    if (data.tipo_anexo == "pdf") {
      return (
        <Button
          target="_blank"
          variant="contained"
          color="primary"
          href={anexo}
          as="a"
        >
          Visualizar PDF
        </Button>
      );
    }

    if (
      data.tipo_anexo == "jpg" ||
      data.tipo_anexo == "jpeg" ||
      data.tipo_anexo == "gif"
    ) {
      return <img src={anexo} />;
    }

    if (data.tipo_anexo == "mp3") {
      return (
        <audio controls>
          <source src={anexo} type="audio/mpeg" />
        </audio>
      );
    }

    if (data.tipo_anexo == "mp4") {
      return <video src={anexo} />;
    }
  }

  render() {
    const { classes } = this.props;

    let { data, loading } = this.state;

    return (
      <div>
        <h2> Denúncia #{data.id} <i className="fa fa-file-video-o" /></h2>

        {loading && <CircularProgress />}

        <Paper className={classes.root}>
          <div>
            <h4>
              Data e Hora:
              <span className={classes.span}>
                {moment(data.created_at).format("DD/MM/YYYY [ás] HH:mm")}
              </span>
            </h4>
          </div>
          <div>
            <h4>
              Natureza da Denúncia:
              <span className={classes.span}>
                {(data && data.natureza_evento && data.natureza_evento.nome) ||
                  "--"}
              </span>
            </h4>
          </div>
          <div>
            <h4>
              Descrição:
              <span className={classes.span}>
                {(data && data.descricao) || "--"}
              </span>
            </h4>
          </div>

          {this.renderFile()}
        </Paper>

        <Paper className={classes.root}>
          <h4>Local</h4>
          <div
            id="map"
            style={{
              height: 500
            }}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(DenunciaDetailsPage);
