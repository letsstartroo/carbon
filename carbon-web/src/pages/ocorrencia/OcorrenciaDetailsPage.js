import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

let BASE_URL = "http://192.168.129.123:8000/api/arquivo/";

const styles = theme => ({
  root: {
    margin: "5px",
    flex: 1,
    width: "45%",
    float: "left"
  },
  span: {
    paddingLeft: "10px",
    color: "#777"
  },
  card: {
    marginBottom: 10
  }
});
const google = window.google;

class OcorrenciaDetailsPage extends React.PureComponent {
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
      title: "Hello World!"
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

    let response = await axios.get("/ocorrencia/" + this.props.match.params.id);

    this.setState({
      loading: false,
      data: response.data
    });
  }

  render() {
    const { classes } = this.props;

    let { data, loading } = this.state;

    data.eventos = data.eventos || [];
    data.veiculo = data.veiculo || [];
    data.vitima = data.vitima || [];

    return (
      <div>
        <h2> Ocorrências #{data.id}</h2>

        {loading && <CircularProgress />}

        <div className={classes.root}>
          <Paper
            style={{
              padding: 16
            }}
          >
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
                Narrativa <br />
                <span className={classes.span}>
                  {data.anexo && data.anexo.length ? (
                    <audio controls>
                      <source
                        src={BASE_URL + data.anexo[0].anexo}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  ) : null}
                </span>
              </h4>
            </div>
            <div>
              <h4>
                Causa:
                <span className={classes.span}>
                  {(data && data.causa && data.causa.nome) || "--"}
                </span>
              </h4>
            </div>
            <div>
              <h4>
                Local:
                <span className={classes.span}>
                  {(data && data.local_fato && data.local_fato.nome) || "--"}
                </span>
              </h4>
            </div>
            <div>
              <h4>
                Agravantes:
                <span className={classes.span}>
                  <List>
                    {(data.agravantes || []).map(item => (
                      <ListItem>
                        <ListItemText
                          primary={
                            <div>
                              <i className="fa fa-chevron-right" /> {item.nome}
                            </div>
                          }
                          // secondary={secondary ? "Secondary text" : null}
                        />
                      </ListItem>
                    ))}
                  </List>
                </span>
              </h4>
            </div>
            <div />
          </Paper>

          <br />

          <Paper style={{ padding: 16 }}>
            <List
              subheader={<ListSubheader>Veículos Vinculados</ListSubheader>}
            >
              {data.veiculo.map(item => (
                <ListItem>
                  <ListItemIcon>
                    <i className="fa fa-car" />
                  </ListItemIcon>
                  <ListItemText primary={item.placa} />
                </ListItem>
              ))}
            </List>
          </Paper>

          <br />

          <Paper style={{ padding: 16 }}>
            <List subheader={<ListSubheader>Vitimas</ListSubheader>}>
              {data.vitima.map(item => (
                <ListItem>
                  <ListItemIcon>
                    <i className="fa fa-user" />
                  </ListItemIcon>
                  <ListItemText primary={item.nome || "Desconhecida"} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>

        <div className={classes.root}>
          <Paper style={{ padding: 16 }}>
            <h4>Local</h4>
            <div
              id="map"
              style={{
                height: 500
              }}
            />
          </Paper>

          <br />

          <Paper style={{ padding: 16 }}>
            <h3>Denúncias ({data.eventos.length}) <i className="fa fa-bullhorn"></i></h3>
            {data.eventos.map(evento => (
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      <i className="fa fa-user" />
                    </Avatar>
                  }
                  title={evento.cpf}
                  subheader={moment(evento.created_at).format(
                    "DD/MM/YYYY [ás] HH:mm"
                  )}
                />
                {evento.tipo_anexo == "jpg" ||
                evento.tipo_anexo == "jpeg" ||
                evento.tipo_anexo == "png" ||
                evento.tipo_anexo == "git" ? (
                  <div style={{ padding: 16 }}>
                    <img
                      style={{ width: "100%" }}
                      src={BASE_URL + evento.anexo}
                    />
                  </div>
                ) : null}

                {evento.tipo_anexo == "mp4" ? (
                  <video src={BASE_URL + evento.anexo} />
                ) : null}

                <CardContent>
                  <Typography component="p">{evento.descricao}</Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(OcorrenciaDetailsPage);
