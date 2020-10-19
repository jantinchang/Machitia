import "./App.css";
import "./services/autoLogInService.js";
import "react-toastify/dist/ReactToastify.css";

import React, { Component } from "react";
import logo from "./logo.svg";
import SabioInit from "./components/SabioInit";
import { withRouter } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { ToastContainer } from "react-toastify";
const _logger = logger.extend("App"); //anywhere in the app.

class App extends Component {
  state = {
    currentUser: {
      roles: [],
      userName: "",
      email: "",
    },
  };

  render() {
    _logger("rendering");
    return (
      <React.Fragment>
        <ToastContainer />
        <Container>
          <Row className="justify-content-center">
            <img src={logo} className="App-logo" alt="logo" />
          </Row>
          <Row>
            <SabioInit />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
