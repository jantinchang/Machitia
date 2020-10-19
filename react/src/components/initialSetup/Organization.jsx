import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import organizationValidationSchema from "../../schema/OrganizationValidationSchema";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { FormControl } from "@material-ui/core";
import getTypes from "../../services/lookUpService";
import { Formik, Field } from "formik";
import { Form, FormGroup, Label, Button } from "reactstrap";
import FileUpload from "./../fileUpload/FileUploadForm";

import "./initialSetup.css";

class Organization extends React.Component {
  state = {
    orgTypes: [],
    mappedOrgTypes: [],
  };
  componentDidMount() {
    getTypes("OrganizationTypes").then(this.orgTypes).catch();
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  //ORGANIZATION TYPE ARRAY (FORM)
  orgTypes = (config) => {
    const orgTypes = config.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        orgTypes,
        mappedOrgTypes: orgTypes.map(this.mapOrgTypes),
      };
    });
  };

  mapOrgTypes = (type) => (
    <option value={type.id} key={type.id}>
      {type.name}
    </option>
  );

  handleFileChange = (response, setFieldValue) => {
    this.props.handleLogo(response[0]);
    setFieldValue("logo", response[0]);
  };

  render() {
    const background = require("../../assets/images/auth-layer.png");
    const { values, handleChange } = this.props;

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
                          <div
                            className="card mt-8 p-4 mb-4"
                            id="organizationCard"
                          >
                            <FormControl>
                              <AppBar title="Organization Setup" />
                              <br />
                              <Formik
                                enableReinitialize={true}
                                validationSchema={organizationValidationSchema}
                                initialValues={this.props.values}
                              >
                                {(props) => {
                                  const {
                                    touched,
                                    errors,
                                    setFieldValue,
                                    // isValid,
                                  } = props;
                                  return (
                                    <Form className={"theme-form"}>
                                      <FormGroup>
                                        <Label>Organization Type:</Label>
                                        <Field
                                          name="OrganizationTypeId"
                                          component="select"
                                          values={values.organizationTypeId}
                                          onChange={handleChange(
                                            "organizationTypeId"
                                          )}
                                          label="Status"
                                          className={
                                            errors.organizationTypeId &&
                                            touched.organizationTypeId
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          as="select"
                                        >
                                          <option value="">
                                            Select Organization Type
                                          </option>
                                          {this.state.mappedOrgTypes}
                                        </Field>
                                        {errors.organizationTypeId &&
                                          touched.organizationTypeId && (
                                            <span className="input-feedback">
                                              {errors.organizationTypeId}
                                            </span>
                                          )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Organization Name:</Label>
                                        <Field
                                          name="name"
                                          type="text"
                                          values={values.name}
                                          onChange={handleChange("name")}
                                          autoComplete="off"
                                          className={
                                            errors.name && touched.name
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.name && touched.name && (
                                          <span className="input-feedback">
                                            {errors.name}
                                          </span>
                                        )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Headline:</Label>
                                        <Field
                                          name="headline"
                                          type="text"
                                          values={values.headline}
                                          onChange={handleChange("headline")}
                                          autoComplete="off"
                                          className={
                                            errors.headline && touched.headline
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.headline &&
                                          touched.headline && (
                                            <span className="input-feedback">
                                              {errors.headline}
                                            </span>
                                          )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Description:</Label>
                                        <Field
                                          name="description"
                                          type="text"
                                          values={values.description}
                                          onChange={handleChange("description")}
                                          autoComplete="off"
                                          className={
                                            errors.description &&
                                            touched.description
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.description &&
                                          touched.description && (
                                            <span className="input-feedback">
                                              {errors.description}
                                            </span>
                                          )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Logo: </Label>
                                        {/* Code Talk This */}
                                        <div className="row">
                                          {/* Uploads Image */}
                                          <FileUpload
                                            isMultiple={false}
                                            onChange={handleChange("logo")}
                                            onUploadSuccess={(response) =>
                                              this.handleFileChange(
                                                response,
                                                setFieldValue
                                              )
                                            }
                                          />
                                          {/* Shows Image */}
                                          <div className="col-auto">
                                            {values.logo && (
                                              <img
                                                className="img-100"
                                                alt="404"
                                                src={values.logo}
                                              />
                                            )}
                                          </div>
                                        </div>
                                        ​
                                        {errors.logo && touched.logo && (
                                          <span className="input-feedback">
                                            {errors.logo}
                                          </span>
                                        )}
                                      </FormGroup>
                                      {/* <FormGroup>
                                        <Label>Logo:</Label>
                                        <Field
                                          name="logo"
                                          type="text"
                                          values={values.logo}
                                          onChange={handleChange("logo")}
                                          autoComplete="off"
                                          className={
                                            errors.logo && touched.logo
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.logo && touched.logo && (
                                          <span className="input-feedback">
                                            {errors.logo}
                                          </span>
                                        )}
                                      </FormGroup> */}
                                      <FormGroup>
                                        <Label>Phone:</Label>
                                        <Field
                                          name="phone"
                                          type="text"
                                          values={values.phone}
                                          onChange={handleChange("phone")}
                                          autoComplete="off"
                                          className={
                                            errors.phone && touched.phone
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.phone && touched.phone && (
                                          <span className="input-feedback">
                                            {errors.phone}
                                          </span>
                                        )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Website URL:</Label>
                                        <Field
                                          name="siteUrl"
                                          type="text"
                                          values={values.siteUrl}
                                          onChange={handleChange("siteUrl")}
                                          autoComplete="off"
                                          className={
                                            errors.siteUrl && touched.siteUrl
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.siteUrl && touched.siteUrl && (
                                          <span className="input-feedback">
                                            {errors.siteUrl}
                                          </span>
                                        )}
                                      </FormGroup>

                                      <Button
                                        // disabled={!isValid}
                                        onClick={this.continue}
                                      >
                                        Continue
                                      </Button>
                                      <Button
                                        color="warning"
                                        // disabled={!isValid}
                                        onClick={this.back}
                                      >
                                        Back
                                      </Button>
                                    </Form>
                                  );
                                }}
                              </Formik>
                            </FormControl>
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

Organization.propTypes = {
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
  handleLogo: PropTypes.func,
};

export default withRouter(Organization);
