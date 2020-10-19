import React, { Component } from "react";
import * as userService from "../../services/userService";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { toast } from "react-toastify";
const _logger = debug.extend("Login");

class Logout extends Component {
  handleLogOut = () => {
    userService
      .logOutUser()
      .then(this.onLogOutSuccess)
      .catch(this.onLogOutFail);
  };

  onLogOutSuccess = () => {
    toast.info(" YOU ARE LOGGED OUT NOW. ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.history.push("/", { type: "LOGOUT" });
  };

  onLogOutFail = (error) => {
    _logger(error);
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="btn social-btn btn-danger mr-2"
          onClick={this.handleLogOut}
        >
          LOG OUT
        </button>
      </React.Fragment>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Logout;
