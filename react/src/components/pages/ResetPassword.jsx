import React, { Component } from "react";
import { resetPass } from "./../../services/forgotPassService";
import logger from "sabio-debug";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Form, FormGroup, Button, Label } from "reactstrap";
import { withRouter } from "react-router-dom";
import { Formik, Field } from "formik";
import ResetPassValidationSchema from "./../../schema/ResetPassValidationSchema";

const _logger = logger.extend("ResetPassPage");
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        password: "",
        confirmPassword: "",
        token: this.props.match.params.token,
      },
      style: {},
    };
  }

  componentDidMount() {
    _logger(this.props);
  }
  handleSubmit = (values, { resetForm }) => {
    _logger(values);
    resetPass(values)
      .then(this.onResetPassSuccess)
      .catch(this.onResetPassError);
    resetForm(this.state.formData);
  };
  onResetPassSuccess = (response) => {
    _logger(response);

    toast.success("You have successfully reset your pasword.");

    this.handleRedirect();
  };
  onResetPassError = (response) => {
    _logger(response);
    toast.error("Oops, something went wrong. Please try again.");
  };
  handleRedirect = () => {
    this.props.history.push("/login");
  };
  render() {
    // let style = this.state.style;
    const background = require("../../assets/images/auth-layer.png");

    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={ResetPassValidationSchema}
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
              <div>
                <div className="page-wrapper">
                  <div className="container-fluid">
                    <div className="authentication-main">
                      <div className="row">
                        <div className="col-md-4 p-0">
                          <div
                            className="auth-innerleft"
                            style={{
                              backgroundImage: "url(" + background + ")",
                            }}
                          >
                            <div className="text-center">
                              <img
                                src={require("../../assets/images/key.png")}
                                className="img-fluid security-icon"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-8 p-0">
                          <div className="auth-innerright">
                            <div className="authentication-box">
                              <h3>RESET YOUR PASSWORD</h3>
                              <div className="card mt-4 p-4">
                                <Form
                                  onSubmit={handleSubmit}
                                  className="theme-form"
                                >
                                  <h5 className="f-16 mb-3">
                                    CREATE YOUR PASSWORD
                                  </h5>
                                  <FormGroup>
                                    <Label>New Password</Label>
                                    <Field
                                      name="password"
                                      type="password"
                                      values={values.password}
                                      placeholder="********"
                                      autoComplete="off"
                                      className="form-control"
                                    >
                                      {errors.password && touched.password && (
                                        <span className="input-feedback">
                                          {errors.password}
                                        </span>
                                      )}
                                    </Field>
                                    <Label>Confirm Password</Label>
                                    <Field
                                      name="confirmPassword"
                                      type="password"
                                      values={values.confirmPassword}
                                      placeholder="********"
                                      autoComplete="off"
                                      className="form-control"
                                    >
                                      {errors.confirmPassword &&
                                        touched.confirmPassword && (
                                          <span className="input-feedback">
                                            {errors.confirmPassword}
                                          </span>
                                        )}
                                    </Field>
                                  </FormGroup>
                                  <div className="form-group form-row mb-0">
                                    <div className="col-md-2">
                                      <Button
                                        type="submit"
                                        className="btn btn-sm btn-secondary d-inline-flex align-items-center"
                                        disabled={!isValid || isSubmitting}
                                      >
                                        Reset
                                      </Button>
                                    </div>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}
ResetPassword.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({
    params: PropTypes.shape({ token: PropTypes.string }),
  }),
};
export default withRouter(ResetPassword);
