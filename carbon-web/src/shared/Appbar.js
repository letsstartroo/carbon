import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%"
  },
  logo: {
    maxWidth: "190px",
    paddingTop: "5px"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  menuItem: {
    color: "white",
    textDecoration: "none",
    padding: "0 16px"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <img src={"/logo-branca.png"} className={classes.logo} />
            </Link>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  className={classes.menuItem}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  <i className="fa fa-dashboard" /> Painel
                </Typography>
              </Link>

              <Link to="/ocorrencia" style={{ textDecoration: "none" }}>
                <Typography
                  className={classes.menuItem}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  <i className="fa fa-bullhorn" /> Ocorrências
                </Typography>
              </Link>

              <Link to="/denuncia" style={{ textDecoration: "none" }}>
                <Typography
                  className={classes.menuItem}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  <i className="fa fa-file-video-o" /> Denúncias
                </Typography>
              </Link>

              <Link to="/mapa-calor" style={{ textDecoration: "none" }}>
                <Typography
                  className={classes.menuItem}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  <i className="fa fa-map" /> Mapa de Calor
                </Typography>
              </Link>

              {/* <Link to="/relatorio" style={{ textDecoration: "none" }}>
                <Typography
                  className={classes.menuItem}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  <i className="fa fa-file-text" /> Relatório
                </Typography>
              </Link> */}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
