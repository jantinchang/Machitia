import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { FormControl } from "@material-ui/core";
import getTypes from "../../services/lookUpService";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { Formik, Field } from "formik";
import "./initialSetup.css";
import locationValidationSchema from "../../schema/LocationsValidationSchema";
import GoogleMapAutocomplete from "./../locationMap/GoogleMapAutocomplete";
import logger from "sabio-debug";

const _logger = logger.extend("InitialLocation");

class Location extends React.Component {
  state = {
    locationTypes: [],
    mappedlocationTypes: [],
    states: [],
    mappedStates: [],
  };
  componentDidMount() {
    getTypes("LocationTypes").then(this.locationTypes);
    getTypes("States").then(this.onStateGetSuccess).catch(this.onStateGetError);
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  locationTypes = (config) => {
    const locationTypes = config.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        locationTypes,
        mappedlocationTypes: locationTypes.map(this.maplocationTypes),
      };
    });
  };

  maplocationTypes = (type) => (
    <option value={type.id} key={type.id}>
      {type.name}
    </option>
  );

  onStateGetSuccess = (response) => {
    _logger(response.items);
    //set state
    const states = response.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        states,
        mappedStates: states.map(this.mapStates),
      };
    });
  };

  onStateGetError = (response) => {
    _logger(response);
  };

  mapStates = (state) => <option value={state.id}>{state.name}</option>;

  handlePlaceChange = (address) => {
    _logger(address);

    let state = this.state.states.find((state) => {
      return state.name === address.administrative_area_level_1;
    });

    this.props.handleLocation(address, state);
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
                              <AppBar title="Enter Your Location" />
                              <br />
                              <Formik
                                enableReinitialize={true}
                                validationSchema={locationValidationSchema}
                                initialValues={this.props.values}
                              >
                                {(props) => {
                                  const {
                                    touched,
                                    errors,

                                    // isValid,
                                  } = props;
                                  return (
                                    <Form className={"theme-form"}>
                                      <FormGroup>
                                        <Label>Search Address:</Label>

                                        <GoogleMapAutocomplete
                                          handlePlaceChange={
                                            this.handlePlaceChange
                                          }
                                        />
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Location Type:</Label>
                                        <Field
                                          name="locationTypeId"
                                          component="select"
                                          values={values.locationTypeId}
                                          onChange={handleChange(
                                            "locationTypeId"
                                          )}
                                          label="Status"
                                          className={
                                            errors.locationTypeId &&
                                            touched.locationTypeId
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          as="select"
                                        >
                                          <option value="">
                                            Select Location Type
                                          </option>
                                          {this.state.mappedlocationTypes}
                                        </Field>
                                        {errors.locationTypeId &&
                                          touched.locationTypeId && (
                                            <span className="input-feedback">
                                              {errors.locationTypeId}
                                            </span>
                                          )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Address:</Label>
                                        <Field
                                          disabled
                                          name="lineOne"
                                          type="text"
                                          values={values.name}
                                          onChange={handleChange("lineOne")}
                                          autoComplete="off"
                                          className={
                                            errors.lineOne && touched.lineOne
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.lineOne && touched.lineOne && (
                                          <span className="input-feedback">
                                            {errors.lineOne}
                                          </span>
                                        )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Field
                                          disabled
                                          name="lineTwo"
                                          type="text"
                                          values={values.name}
                                          onChange={handleChange("lineTwo")}
                                          autoComplete="off"
                                          className={
                                            errors.lineTwo && touched.lineTwo
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.lineTwo && touched.lineTwo && (
                                          <span className="input-feedback">
                                            {errors.lineTwo}
                                          </span>
                                        )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>City:</Label>
                                        <Field
                                          disabled
                                          name="city"
                                          type="text"
                                          values={values.city}
                                          onChange={handleChange("city")}
                                          autoComplete="off"
                                          className={
                                            errors.city && touched.city
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.city && touched.city && (
                                          <span className="input-feedback">
                                            {errors.city}
                                          </span>
                                        )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>Zip:</Label>
                                        <Field
                                          disabled
                                          name="zip"
                                          type="number"
                                          values={values.zip}
                                          onChange={handleChange("zip")}
                                          autoComplete="off"
                                          className={
                                            errors.zip && touched.zip
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.zip && touched.zip && (
                                          <span className="input-feedback">
                                            {errors.zip}
                                          </span>
                                        )}
                                      </FormGroup>
                                      <FormGroup>
                                        <Label>State:</Label>
                                        <Field
                                          disabled
                                          name="stateId"
                                          component="select"
                                          values={values.stateId}
                                          onChange={handleChange("stateId")}
                                          label="State Name"
                                          className={
                                            errors.stateId && touched.stateId
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          as="select"
                                        >
                                          <option value="">Select State</option>
                                          {this.state.mappedStates}
                                        </Field>
                                        {errors.stateId && touched.stateId && (
                                          <span className="input-feedback">
                                            {errors.stateId}
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

Location.propTypes = {
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
  handleLocation: PropTypes.func,
};

export default withRouter(Location);
