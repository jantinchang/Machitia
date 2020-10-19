import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./initialSetup.css";
import FileUpload from "./../fileUpload/FileUploadForm";
import { FormControl } from "@material-ui/core";
import { Formik, Field } from "formik";
import { Form, FormGroup, Label, Button } from "reactstrap";
import initialUserProfileSchema from "../../schema/InitialUserProfileSchema";
import "../../assets/images/avtar/1.jpg";

class User extends React.Component {
  state = {};
  componentDidMount() {}

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  handleFileChange = (response, setFieldValue) => {
    this.props.handleAvatarUrl(response[0]);
    setFieldValue("avatarUrl", response[0]);
  };

  render() {
    const { values, handleChange } = this.props;
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
                            src={require("../../assets/images/machitia_logo.png")}
                            className="logo-login"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 p-0">
                      <div className="auth-innerright">
                        <div>
                          <div className="card mt-8 p-4 mb-4" id="cardSize">
                            <FormControl>
                              <AppBar title="User Profile Setup" />
                              <br />
                              <Formik
                                enableReinitialize={true}
                                validationSchema={initialUserProfileSchema}
                                initialValues={this.props.values}
                              >
                                {(props) => {
                                  const {
                                    touched,
                                    errors,
                                    setFieldValue,
                                  } = props;
                                  return (
                                    <Form className={"theme-form"}>
                                      <FormGroup>
                                        <Label>First Name:</Label>
                                        <Field
                                          name="firstName"
                                          type="text"
                                          values={values.firstName}
                                          onChange={handleChange("firstName")}
                                          autoComplete="off"
                                          id="inputs"
                                          className={
                                            errors.firstName &&
                                            touched.firstName
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.firstName &&
                                          touched.firstName && (
                                            <span className="input-feedback">
                                              {errors.firstName}
                                            </span>
                                          )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Last Name:</Label>
                                        <Field
                                          name="lastName"
                                          type="text"
                                          values={values.lastName}
                                          onChange={handleChange("lastName")}
                                          autoComplete="off"
                                          id="inputs"
                                          className={
                                            errors.lastName && touched.lastName
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.lastName &&
                                          touched.lastName && (
                                            <span className="input-feedback">
                                              {errors.lastName}
                                            </span>
                                          )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Middle Initial:</Label>
                                        <Field
                                          name="mi"
                                          type="text"
                                          values={values.mi}
                                          onChange={handleChange("mi")}
                                          autoComplete="off"
                                          id="inputs"
                                          className={
                                            errors.mi && touched.mi
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.mi && touched.mi && (
                                          <span className="input-feedback">
                                            {errors.mi}
                                          </span>
                                        )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Upload Profile Image</Label>
                                        {/* Code Talk This */}
                                        <div className="row">
                                          {/* Uploads Image */}
                                          <FileUpload
                                            isMultiple={false}
                                            onChange={handleChange("avatarUrl")}
                                            onUploadSuccess={(response) =>
                                              this.handleFileChange(
                                                response,
                                                setFieldValue
                                              )
                                            }
                                          />
                                        </div>
                                        ​
                                        {errors.avatarUrl &&
                                          touched.avatarUrl && (
                                            <span className="input-feedback">
                                              {errors.avatarUrl}
                                            </span>
                                          )}
                                      </FormGroup>
                                      <Button
                                        // disabled={!isValid}
                                        onClick={this.continue}
                                      >
                                        Continue
                                      </Button>
                                    </Form>
                                  );
                                }}
                              </Formik>
                            </FormControl>
                            <div className="col-md-6" id="profileCard">
                              <div className="card card-curved-body card-hover border-0 box-shadow mx-auto">
                                <div
                                  className="card-img-top card-img-gradient"
                                  id="profileImage"
                                >
                                  <img
                                    src={values.avatarUrl}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "https://history.ucr.edu/sites/g/files/rcwecm1916/files/styles/form_preview/public/blank-profile-picture-png.png?itok=MQ-iPuNG";
                                    }}
                                    alt="Sarah Cole"
                                    width="350px"
                                    height="350px"
                                  />
                                </div>
                                <div className="card-body text-center">
                                  <h3 className="h6 card-title mb-2">
                                    {values.firstName} {values.mi}{" "}
                                    {values.lastName}
                                  </h3>
                                </div>
                              </div>
                            </div>
                            {/* <div className="col-md-6" id="profileCard">
                              <div className="custom-card card">
                                <div className="card-header">
                                  <img
                                    src={
                                      userCardImage ||
                                      "../../assets/images/avtar/1.jpg"
                                    } 
                                    className="img-fluid"
                                    alt={""}
                                  />
                                </div>
                                <div className="card-profile">
                                  <img
                                    src={values.avatarUrl}
                                    className="img-tumb"
                                    alt={""}
                                  />
                                </div>
                                <div className="text-center profile-details">
                                  <h4>
                                    {values.firstName} {values.lastName}
                                  </h4>
                                </div>
                              </div>
                            </div> */}
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

User.propTypes = {
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
  handleAvatarUrl: PropTypes.func,
};

export default withRouter(User);
