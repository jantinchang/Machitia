import React from "react";
import { withRouter } from "react-router-dom";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { Formik, Field } from "formik";
import logger from "sabio-debug";
import {
  addLocation,
  updateLocation,
  getById,
} from "./../../services/locationService";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import getType from "./../../services/lookUpService";
import locationsValidationSchema from "./../../schema/LocationsValidationSchema";
import AutoCompleteWithMap from "../locationMap/AutoCompleteWithMap";
import "./../locationMap/button.css";
const _logger = logger.extend("LocationAddForm");

class LocationAddForm extends React.Component {
  state = {
    formData: {
      locationTypeId: "",
      lineOne: "",
      lineTwo: "",
      city: "",
      zip: "",
      stateId: "",
      latitude: 38.685,
      longitude: -115.234,
    },
    locationTypes: [],
    mappedLocationTypes: [],
    states: [],
    mappedStates: [],
  };

  componentDidMount() {
    getType("LocationTypes")
      .then(this.onLocationTypeGetSuccess)
      .catch(this.onLocationTypeGetError);

    getType("States").then(this.onStateGetSuccess).catch(this.onStateGetError);

    _logger(this.props);
    const { id } = this.props.match.params;
    if (id) {
      const { state } = this.props.location;
      if (state) {
        this.setFormData(state);
      } else {
        getById(id)
          .then((response) => this.setFormData(response.item))
          .catch(this.onGetByIdError);
      }
    }
  }

  setFormData = (formData) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData,
      };
    });
  };

  onGetByIdError = (error) => {
    _logger(error);
  };

  onUpdateSuccess = (config) => {
    _logger(config);
    toast.success("You have successfully updated your location");
    this.props.history.push("/locations/list");
  };
  onUpdateError = (config) => {
    toast.success("Sorry, Your request did not go through");
    _logger(config);
  };

  onAddSuccess = (config) => {
    _logger(config);
    toast.success("You have successfully added your location");
    this.props.history.push("/locations/list");
  };
  onAdderror = (config) => {
    toast.success("Sorry, Your request did not go through");
    _logger(config);
  };

  onLocationTypeGetSuccess = (response) => {
    _logger(response.items);
    const locationTypeName = response.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        locationTypeName,
        mappedLocationTypes: locationTypeName.map(this.mapLocationTypeName),
      };
    });
  };

  onLocationTypeGetError = (response) => {
    _logger(response);
  };

  mapLocationTypeName = (type) => <option value={type.id}>{type.name}</option>;

  onLocationTypeGetError = (response) => {
    _logger(response);
  };

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

  handleSubmit = (values, { resetForm }) => {
    _logger(values);

    values.locationTypeId = parseInt(values.locationTypeId);
    values.stateId = parseInt(values.stateId);

    if (values.id) {
      updateLocation(values)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      addLocation(values).then(this.onAddSuccess).catch(this.onAdderror);
    }

    resetForm(this.state.formData);
  };

  handlePlaceChange = (address) => {
    _logger(address);

    let state = this.state.states.find((state) => {
      return state.name === address.administrative_area_level_1;
    });

    _logger(state);
    let formData = {
      lineOne: `${address.street_number} ${address.route}`,
      lineTwo: address.administrative_area_level_2,
      city: address.locality,
      zip: address.postal_code,
      stateId: state.id, // function that take in address.locality return stateId
      latitude: address.latitude,
      longitude: address.longitude,
    };
    this.setState((prevState) => {
      return {
        ...prevState,
        formData,
      };
    });
  };

  returnStateId = (locality) => {
    _logger(locality.items);
    const stateId = locality.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        stateId,
      };
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row pt-5">
          <React.Fragment>
            <Formik
              enableReinitialize={true}
              validationSchema={locationsValidationSchema}
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
                  <>
                    <div className="col-md-7">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label>Location Type</Label>
                          <Field
                            name="locationTypeId"
                            component="select"
                            values={values.locationTypeId}
                            label="Location Id"
                            className={
                              errors.locationTypeName &&
                              touched.locationTypeName
                                ? "form-control error"
                                : "form-control"
                            }
                            as="select"
                          >
                            <option value="0"> Please select a type</option>
                            {this.state.mappedLocationTypes}
                          </Field>
                          {errors.locationTypeName && (
                            <span className="input-feedback">
                              {errors.locationTypeName}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label>Line One</Label>
                          <Field
                            disabled
                            name="lineOne"
                            type="text"
                            values={values.lineOne}
                            placeholder="Line One"
                            autoComplete="off"
                            className={
                              errors.lineOne && touched.lineOne
                                ? "form-control error"
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
                          <Label>Line Two</Label>
                          <Field
                            disabled
                            name="lineTwo"
                            type="text"
                            values={values.lineTwo}
                            placeholder="Line Two"
                            autoComplete="off"
                            className={
                              errors.lineTwo && touched.lineTwo
                                ? "form-control error"
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
                          <Label>City</Label>
                          <Field
                            disabled
                            name="city"
                            type="text"
                            values={values.city}
                            placeholder="City"
                            autoComplete="off"
                            className={
                              errors.city && touched.city
                                ? "form-control error"
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
                          <Label>Zip</Label>
                          <Field
                            disabled
                            name="zip"
                            type="text"
                            values={values.zip}
                            placeholder="zip"
                            autoComplete="off"
                            className={
                              errors.zip && touched.zip
                                ? "form-control error"
                                : "form-control"
                            }
                          />
                          {errors.zip && touched.zip && (
                            <span className="input-feedback">{errors.zip}</span>
                          )}
                        </FormGroup>
                        {
                          <FormGroup>
                            <Label>State</Label>
                            <Field
                              disabled
                              name="stateId"
                              component="select"
                              values={values.stateId}
                              label="State Name"
                              className={
                                errors.stateName && touched.stateName
                                  ? "form-control error"
                                  : "form-control"
                              }
                              as="select"
                            >
                              {this.state.mappedStates}
                            </Field>
                            {errors.stateName && (
                              <span className="input-feedback">
                                {errors.stateName}
                              </span>
                            )}
                          </FormGroup>
                        }
                        <Button
                          type="submit"
                          disabled={!isValid || isSubmitting}
                        >
                          Submit
                        </Button>
                      </Form>
                    </div>
                    <div className="col-md-5">
                      <AutoCompleteWithMap
                        handlePlaceChange={this.handlePlaceChange}
                        center={{ lat: values.latitude, lng: values.longitude }}
                      />
                    </div>
                  </>
                );
              }}
            </Formik>
          </React.Fragment>
        </div>
      </div>
    );
  }
}
LocationAddForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  location: PropTypes.shape({ state: PropTypes.func }),
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.number }) }),
};

export default withRouter(LocationAddForm);
