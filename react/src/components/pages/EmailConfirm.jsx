import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import * as userService from "../../services/userService";
import debug from "sabio-debug";
// import * as userService from "../../services/userService";

const _logger = debug.extend("EmailConfirm");

class EmailConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;

    if (token) {
      userService
        .activateUser(token)
        .then(this.confirmationSuccess)
        .catch(this.confirmationFail);
    }
  }

  confirmationSuccess = (response) => {
    _logger(response.data);
  };

  confirmationFail = (error) => {
    _logger(error);
  };

  render() {
    const background = require("../../assets/images/auth-layer.png");

    return (
      <div>
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="authentication-main">
              <div className="row">
                <div className="col-md-4 p-0">
                  <div
                    className="auth-innerleft"
                    style={{ backgroundImage: "url(" + background + ")" }}
                  >
                    <div className="text-center">
                      <img
                        src={require("../../assets/images/machitia_logo.png")}
                        className="logo-login"
                        alt=""
                      />
                      <hr />
                    </div>
                  </div>
                </div>

                <div className="col-md-8 p-0">
                  <div className="auth-innerright">
                    <div className="custom-card card">
                      <h4>EMAIL CONFIRMED!</h4>
                      <Link to={"/login"} className="btn-danger mr-2">
                        You can login now!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmailConfirm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(EmailConfirm);
