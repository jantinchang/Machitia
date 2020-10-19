import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { currentUser } from "../../services/userService";
import "../../assets/css/landing.css";
import Footer from "../common/footer/Footer";
import debug from "sabio-debug";
import PropTypes from "prop-types";
const _logger = debug.extend("Landing");

const backgroundHome = require("../../assets/images/landing/home/main_bg.jpg");

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      activeTab: "1",
      showButton: true,
      showDashboard: false,
    };
  }

  componentDidMount() {
    currentUser().then(this.onCurrentSuccess).catch(this.handleError);
  }
  onCurrentSuccess = (response) => {
    this.setState({
      showButton: false,
      showDashboard: true,
    });
    return response.data.item.id;
  };
  handleError = (error) => {
    _logger("Not Logged In", error);
  };

  handleLogIn = (e) => {
    e.preventDefault();
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

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
    return (
      <div>
        {/*page-wrapper Start*/}
        <div className="page-wrapper">
          <div className="page-body-wrapper landing-main">
            <div
              className="landing-home"
              style={{ backgroundImage: "url(" + backgroundHome + ")" }}
            >
              <div className="landing-header">
                <div className="container-fluid">
                  <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="#">
                      <div className="pr-0 col-md-6">
                        <img
                          src={require("../../assets/images/machitia_logo.png")}
                          className="lan-logo"
                          alt=""
                        />
                      </div>
                    </a>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapsibleNavbar"
                    >
                      <span className="navbar-toggler-icon">
                        <i className="fa fa-bars" />
                      </span>
                    </button>
                    <div
                      className="collapse navbar-collapse"
                      id="collapsibleNavbar"
                    >
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          {this.state.showButton && (
                            <Link to={"/login"} className="btn-success mr-2">
                              LOGIN
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {this.state.showButton && (
                            <Link to={"/register"} className="btn-dark mr-2">
                              REGISTER
                            </Link>
                          )}
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="landing-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-4 offset-lg-2 dashboard-image-pt-xs offset-md-1 col-md-5 offset-sm-0">
                      <div className="landing-left">
                        <div>
                          <h1>Machitia</h1>
                          <p className="pr-5">
                            <h3>
                              <strong>
                                For <em>educators</em> dedicated to lifelong
                                learning
                              </strong>
                            </h3>
                            <div>
                              <em>Machitia</em> is designed to help educators
                              dedicated to education for liberation to improve
                              their lesson plans, apply various pedagogies, and
                              build community. <em>Machitia </em>
                              will make it easier for educators to
                              <strong> create, collaborate, </strong>
                              and <strong>share</strong> transformative lesson
                              plans.
                            </div>
                          </p>
                          {this.state.showDashboard && (
                            <Button type="submit" onClick={this.redirect}>
                              Dashboard
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="pr-0 col-md-6">
                      <div className="lan-column maxw_380">
                        <div className="row">
                          <div className="lan-img_wrapper">
                            <img
                              src="https://thumb.tildacdn.com/tild3064-3265-4464-a534-396633306234/-/cover/180x180/center/center/-/format/webp/94459CB2-9585-4889-8.jpg"
                              className="logo-login"
                              alt=""
                            />
                          </div>
                          <div className="lan-img_wrapper">
                            <img
                              src="https://thumb.tildacdn.com/tild3432-6165-4432-a131-616434613161/-/cover/180x180/center/center/-/format/webp/IMG_0213.JPG"
                              className="logo-login"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="lan-img_wrapper">
                            <img
                              src="https://thumb.tildacdn.com/tild6530-6363-4362-b432-333462383834/-/cover/180x180/center/center/-/format/webp/9771B08F-29D9-4171-B.jpg"
                              className="logo-login"
                              alt=""
                            />
                          </div>
                          <div className="lan-img_wrapper">
                            <img
                              src="https://thumb.tildacdn.com/tild3561-3534-4062-b633-313062626232/-/cover/180x180/center/center/-/format/webp/CECE4A40-FE12-4366-B.jpg"
                              className="logo-login"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        {/*page-wrapper Ends*/}
      </div>
    );
  }
}

Landing.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.number }) }),
  location: PropTypes.shape({ state: PropTypes.func }),
  currentUser: PropTypes.shape({
    roles: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default Landing;
