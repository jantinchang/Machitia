import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import logger from "sabio-debug";
import Header from "./common/header/Header";
import Sidebar from "./common/sidebar/Sidebar";
import Footer from "./common/footer/Footer";

const _logger = logger.extend("App");

class App extends Component {
  render() {
    _logger("rendering");
    return (
      <div className="page-wrapper">
        <Header {...this.props} />
        <div className="page-body-wrapper">
          <Sidebar {...this.props} />
          <div className="page-body">
            {this.props.children}
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default App;
