import React, { Component } from "react";
import * as userService from "../../services/userService";
import { Formik, Field } from "formik";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import logInValidationSchema from "./../../schema/LogInValidationSchema";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import * as userProfilesService from "../../services/userProfileServices";
const _logger = debug.extend("Login");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { email: "", password: "" },
      style: {},
    };
  }

  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ style: { display: "none" } });
      }.bind(this),
      1000
    );
  }

  handleSubmit = (formValues, { resetForm }) => {
    const payload = { email: formValues.email, password: formValues.password };

    userService
      .logIn(payload)
      .then(userService.currentUser)
      .then(this.onSuccessGetUser)
      .catch(this.onLogInError);

    resetForm(this.state.formData);
  };

  onSuccessGetUser = (response) => {
    _logger("Get User Success", response);

    let currentUser = { ...response.item };
    currentUser.email = response.item.name;
    delete currentUser.name;
    this.setState(
      (prevState) => {
        return { ...prevState, currentUser };
      },
      () => this.profileStatus()
    );
  };

  profileStatus = () => {
    _logger("geting profile status");
    userService
      .checkProfileStatus()
      .then(this.onSuccessGetStatus)
      .catch(this.onErrorProfileStatus);
  };

  onSuccessGetStatus = (response) => {
    _logger("Get Status Success", response);
    if (response.item > 0) {
      _logger("response Status Success", response);
      toast.success("🐻  Successfully Logged In 🐻  ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      userProfilesService
        .getById(response.item)
        .then(this.onSuccessGetUserProfile)
        .catch(this.onErrorGetUserProfile);
    } else {
      // admin will not have a profile
      if (this.state.currentUser.roles.includes("SystemAdmin")) {
        this.props.history.push(`/dashboard`, {
          type: "LOGIN",
          currentUser: { ...this.state.currentUser, isLoggedIn: true },
        });
      } else {
        //if the user doesnt have a profile we will redirect them to make one.
        this.props.history.push(`/initial/${this.state.currentUser.id}/setup`, {
          type: "LOGIN",
          currentUser: { ...this.state.currentUser, isLoggedIn: true },
        });
      }
    }
  };

  onSuccessGetUserProfile = (response) => {
    _logger("GetUserProfile Success", response);
    const currentUserProfile = response.item;
    if (this.state.currentUser.roles.includes("SystemAdmin")) {
      this.props.history.push(`/dashboard`, {
        type: "LOGIN",
        currentUser: { ...this.state.currentUser, isLoggedIn: true },
        currentUserProfile,
      });
    } else if (this.state.currentUser.roles.includes("Organization")) {
      this.props.history.push(
        `/organization/${this.state.currentUser.id}/dashboard`,
        {
          type: "LOGIN",
          currentUser: {
            ...this.state.currentUser,
            isLoggedIn: true,
          },
          currentUserProfile,
        }
      );
    } else {
      this.props.history.push(
        `/independent/${this.state.currentUser.id}/dashboard`,
        {
          type: "LOGIN",
          currentUser: {
            ...this.state.currentUser,
            isLoggedIn: true,
          },
          currentUserProfile,
        }
      );
    }
  };
  onErrorGetUserProfile = (response) => {
    _logger("error getting user profile ", response);
  };

  // When Logged In is successful, but getting profile is not. Then we push to initial setup page.
  onErrorProfileStatus = (error) => {
    _logger("Error getting profile status", error);

    this.props.history.push(`/initial/${this.state.currentUser.id}/setup`, {
      type: "LOGIN",
      currentUser: { ...this.state.currentUser, isLoggedIn: true },
    });

    toast.info("🐻 Please create your profile and give us your details. 🐻  ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  onLogInError = (error) => {
    // let message = error.errors ? error.errors[0] : "";
    let message =
      "Your username or password does not match! Please check your login credentials";
    _logger(error, "errorrrrr");
    toast.error(` 🐻 ${message} 🐻`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    let style = this.state.style;
    const background = require("../../assets/images/auth-layer.png");

    return (
      <div>
        {/* Loader starts */}
        <div className="loader-wrapper" style={style}>
          <div className="loader bg-white">
            <div className="line" />
            <div className="line" />
            <div className="line" />
            <div className="line" />
            <h4>
              Have a great day at work today <span>&#x263A;</span>
            </h4>
          </div>
        </div>
        {/* Loader ends */}

        {/*page-wrapper Start*/}
        <div className="page-wrapper">
          <div className="container-fluid">
            {/*login page start*/}
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
                    </div>
                  </div>
                </div>
                <div className="col-md-8 p-0">
                  <div className="auth-innerright">
                    <div className="authentication-box">
                      <h4>LOGIN</h4>
                      <h6>Enter your Email and Password For Login or Signup</h6>
                      <div className="card mt-4 p-4 mb-0">
                        <Formik
                          enableReinitialize={true}
                          validationSchema={logInValidationSchema}
                          initialValues={this.state.formData}
                          onSubmit={this.handleSubmit}
                        >
                          {(props) => {
                            const {
                              values,
                              touched,
                              errors,
                              handleSubmit,
                              isValid,
                              isSubmitting,
                            } = props;
                            return (
                              <Form
                                onSubmit={handleSubmit}
                                className={"theme-form"}
                              >
                                <FormGroup>
                                  <Label>Email</Label>
                                  <Field
                                    name="email"
                                    type="text"
                                    values={values.email}
                                    autoComplete="off"
                                    className={
                                      errors.email && touched.email
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                  />
                                  {errors.email && touched.email && (
                                    <span className="input-feedback">
                                      {errors.email}
                                    </span>
                                  )}
                                </FormGroup>
                                <FormGroup>
                                  <Label>Password</Label>
                                  <Field
                                    name="password"
                                    type="password"
                                    values={values.password}
                                    autoComplete="off"
                                    className={
                                      errors.password && touched.password
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                  />
                                  {errors.password && touched.password && (
                                    <span className="input-feedback">
                                      {errors.password}
                                    </span>
                                  )}
                                </FormGroup>

                                <Button
                                  type="submit"
                                  disabled={!isValid || isSubmitting}
                                >
                                  Login
                                </Button>

                                <Link
                                  to={"/register"}
                                  className="btn btn-danger mr-2"
                                >
                                  Register
                                </Link>
                                <Link
                                  to={"/verify"}
                                  className="btn btn-successful mr-2"
                                >
                                  Forgot Password?
                                </Link>
                              </Form>
                            );
                          }}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*login page end*/}
          </div>
        </div>
        {/*page-wrapper Ends*/}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
