import React, { Component } from "react";
import logo from "./logo.svg";
import AppRoutes from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Appbar from "./shared/Appbar";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3076c2"
    }
  }
});

const styles = {
  root: {
    maxWidth: "1200px",
    width: "100%",
    margin: "10px auto",
    overflow: "hidden"
  }
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MuiThemeProvider theme={theme}>
            <Appbar />
            <div style={styles.root}>
              <AppRoutes />
            </div>
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

export default App;
