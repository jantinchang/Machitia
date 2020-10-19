import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Button } from "reactstrap";

class Success extends React.Component {
  state = {};
  componentDidMount() {}

  // Click handler to redirect based on roles.
  redirect = () => {
    if (this.props.currentUser.roles.includes("SystemAdmin")) {
      this.props.history.push(`/dashboard`, {
        type: "LOGIN",
        currentUser: { ...this.props.currentUser, isLoggedIn: true },
      });
    } else if (this.props.currentUser.roles.includes("Organization")) {
      this.props.history.push(
        `/organization/${this.props.currentUser.id}/dashboard`,
        {
          type: "LOGIN",
          currentUser: {
            ...this.props.currentUser,
            isLoggedIn: true,
          },
        }
      );
    } else {
      this.props.history.push(
        `/independent/${this.props.currentUser.id}/dashboard`,
        {
          type: "LOGIN",
          currentUser: {
            ...this.props.currentUser,
            isLoggedIn: true,
          },
        }
      );
    }
  };

  render() {
    const background = require("../../assets/images/auth-layer.png");
    return (
      <MuiThemeProvider>
        <React.Fragment>
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
                            src={require("../../assets/images/logo-login.png")}
                            className="logo-login"
                            alt=""
                          />
                          <hr />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 p-0">
                      <div className="auth-innerright">
                        <div>
                          <div className="card mt-8 p-4 mb-4">
                            <AppBar title="Success" />
                            <h1>Thank you for creating your profile!</h1>
                            <Button
                              // disabled={!isValid}
                              onClick={this.redirect}
                            >
                              Go To Dashboard
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

Success.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.number }) }),
  location: PropTypes.shape({ state: PropTypes.func }),
  currentUser: PropTypes.shape({
    roles: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  id: PropTypes.number,
  nextStep: PropTypes.func,
  handleChange: PropTypes.func,
  values: PropTypes.string,
  prevStep: PropTypes.func,
};

export default withRouter(Success);
