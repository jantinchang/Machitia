import React, { Component } from "react";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { Formik, Field } from "formik";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import registerValidationSchema from "./../../schema/RegisterValidationSchema";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      formData: {
        email: "",
        password: "",
        role: 0,
        confirmPassword: "",
      },
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
    userService
      .register(formValues)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);

    resetForm(this.state.formData);
  };

  onRegisterSuccess = () => {
    toast.success(" 🐻   REGISTER SUCCESSFUL  🐻 ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    this.props.history.push("/confirm");
  };

  onRegisterError = () => {
    toast.error(" 🐻   REGISTER ERROR  🐻 ", {
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
            {/*sign up page start*/}
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
                      <h3 className="text-center">NEW USER</h3>
                      <h6 className="text-center">
                        Enter your Username and Password For Login or Signup
                      </h6>
                      <div className="card mt-4 p-4">
                        <Formik
                          enableReinitialize={true}
                          validationSchema={registerValidationSchema}
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
                                <FormGroup>
                                  <Label>Confirm Password</Label>
                                  <Field
                                    name="confirmPassword"
                                    type="password"
                                    values={values.confirmPassword}
                                    autoComplete="off"
                                    className={
                                      errors.confirmPassword &&
                                      touched.confirmPassword
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                  />
                                  {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                      <span className="input-feedback">
                                        {errors.confirmPassword}
                                      </span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                  <Label>Role</Label>
                                  <Field
                                    name="role"
                                    component="select"
                                    className={
                                      errors.password && touched.password
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                  >
                                    <option value="0">
                                      Please select a Role
                                    </option>
                                    <option value="2">Independent</option>
                                    <option value="3">Organization</option>
                                  </Field>
                                  {errors.role && touched.role && (
                                    <span className="input-feedback">
                                      {errors.role}
                                    </span>
                                  )}
                                </FormGroup>

                                <Button
                                  type="submit"
                                  disabled={!isValid || isSubmitting}
                                >
                                  Register
                                </Button>
                                <div className="form-row">
                                  <div className="col-sm-3"></div>
                                  <div className="col-sm-8">
                                    <div className="text-left mt-2 m-l-20">
                                      Are you already user?&nbsp;&nbsp;
                                      <Link
                                        to={"/login"}
                                        className="btn btn-success"
                                      >
                                        Login
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            );
                          }}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*sign up page Ends*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Register;
