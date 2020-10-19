import React from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { Formik, Field } from "formik";
import ForgotPassValidationSchema from "./../../schema/ForgotPassValidationSchema";
import logger from "sabio-debug";
import { forgotPass } from "./../../services/forgotPassService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const _logger = logger.extend("ForgotPassPage");

class ForgotPassword extends React.Component {
  state = {
    formData: {
      email: "",
    },
    isVerified: false,
  };
  handleSubmit = (values, { resetForm }) => {
    _logger(values);
    forgotPass(values.email)
      .then(this.onForgotPassSuccess)
      .catch(this.onForgotPassError);
    resetForm(this.state.formData);
  };
  onForgotPassSuccess = (response) => {
    _logger(response);
    this.setState((prevState) => {
      return {
        ...prevState,
        isVerified: true,
      };
    });
    toast.success("Email Successful");
  };
  onForgotPassError = (response) => {
    _logger(response);
    toast.error("Email does not exist. Please double check email.");
  };
  render() {
    return (
      <React.Fragment>
        {this.state.isVerified ? (
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Next Step...</h1>
              <p className="lead">
                An email with the link to reset your password has been sent to
                you.
              </p>
            </div>
          </div>
        ) : (
          <Formik
            enableReinitialize={true}
            validationSchema={ForgotPassValidationSchema}
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
                <div className="container">
                  <div className="row">
                    <div className="col pt-5">
                      <div className="lg-white shadow-lg">
                        <div className="row no-gutters">
                          <Form
                            onSubmit={handleSubmit}
                            className={"col-lg-7 p-4 p-lg-6"}
                          >
                            <h2 className="h3">Forgot Password?</h2>

                            <div className="align-center">
                              <b>
                                Enter the email address associated with your
                                Machitia account.
                              </b>
                            </div>

                            <FormGroup>
                              <Field
                                name="email"
                                type="text"
                                values={values.email}
                                placeholder="Email"
                                autoComplete="off"
                                className="form-control"
                              />
                              {errors.email && touched.email && (
                                <span className="input-feedback">
                                  {errors.email}
                                </span>
                              )}
                            </FormGroup>
                            <div className="col-3 px-2 mb-3">
                              <Button
                                type="submit"
                                className="btn btn-sm btn-secondary d-inline-flex align-items-center"
                                disabled={!isValid || isSubmitting}
                              >
                                Reset
                              </Button>
                            </div>
                            <div>
                              <span>Need some help?</span>
                            </div>
                            <Link
                              to={"/contactus"}
                              className="btn btn-danger mr-2"
                            >
                              Contact Us
                            </Link>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Formik>
        )}
      </React.Fragment>
    );
  }
}
export default ForgotPassword;
