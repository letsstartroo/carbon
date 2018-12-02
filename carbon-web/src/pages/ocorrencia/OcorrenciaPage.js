import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class OcorrenciaPage extends React.PureComponent {
  state = {
    loading: false,
    data: []
  };

  componentWillMount() {
    this.getData();
  }

  async getData() {
    this.setState({
      loading: true
    });

    let response = await axios.get("/ocorrencia");

    this.setState({
      loading: false,
      data: response.data
    });
  }

  verDetalhe(item) {
    this.props.history.push("/ocorrencia/" + item.id);
  }

  render() {
    const { classes } = this.props;

    let { data, loading } = this.state;

    return (
      <div>
        <h2> Ocorrências <i className="fa fa-bullhorn" /> </h2>

        {loading && <CircularProgress />}

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "30px", padding: 8 }}>Cod.</TableCell>
                <TableCell style={{ width: "140px" }}>Data</TableCell>
                <TableCell>Causa</TableCell>
                <TableCell>Local</TableCell>
                <TableCell>Total Vitimas</TableCell>
                <TableCell style={{ width: "100px" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell style={{ width: "30px", padding: 8 }}>{row.id}</TableCell>
                    <TableCell>
                      <i className="fa fa-calendar" />{" "}
                      {moment(row.created_at).format("DD/MM/YYYY [ás] HH:mm")}
                    </TableCell>
                    <TableCell>
                      {(row.causa && row.causa.nome) || "--"}
                    </TableCell>
                    <TableCell>
                      {(row.local_fato && row.local_fato.nome) || "--"}
                    </TableCell>
                    <TableCell>{row.total_vitimas}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        size={"small"}
                        onClick={() => this.verDetalhe(row)}
                      >
                        <i
                          className="fa fa-search"
                          style={{ marginRight: 6 }}
                        />
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(OcorrenciaPage);
