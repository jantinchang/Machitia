import React from "react";
import {
  addOrganization,
  getOrganization,
  update,
} from "../../services/organizationServices";
import locationSearch from "../../services/locationSearchService";
import getTypes from "../../services/lookUpService";
import { FormGroup, Label } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import { PropTypes } from "prop-types";
import OrganizationValidationSchema from "../../schema/OrganizationValidationSchema";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardText,
  CardBody,
  CardImg,
  CardHeader,
  Button,
} from "reactstrap";
import logger from "sabio-debug";
import AsyncSelect from "react-select/async";
import "../../assets/css/organizations.css";
const _logger = logger.extend("Organization");

class OrganizationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        selectedLocation: { label: "", value: 0 },
      },
      organizationType: [],
      locationTypes: [],
    };
  }
  componentDidMount() {
    getTypes("OrganizationTypes").then(this.orgTypes);
    const { id } = this.props.match.params;
    if (id) {
      const { state } = this.props.location;
      if (state) {
        this.setFormData(state);
      } else {
        getOrganization((config) => this.setFormData(config.item));
      }
    }
  }
  setFormData = (formData) => {
    this.setState((prevState) => {
      return { ...prevState, formData };
    }, this.stateChanged);
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

  //LOCATION TYPE ARRAY
  LocationTypes = (config) => {
    const locationTypes = config.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        locationTypes,
        mappedLocationTypes: locationTypes.map(this.mapLocationTypes),
      };
    });
  };
  mapLocationTypes = (type) => <option value={type.id}>{type.lineOne}</option>;

  mapLocations(location) {
    var newLocation = {
      StreetAddress: location.lineOne,
      StreetAddress2: location.lineTwo,
      City: location.City,
      Zip: location.zip,
    };
    return newLocation;
  }

  //   HANDLE SUBMIT CLICK
  handleSubmit = (values) => {
    values.locationId = parseInt(values.locationId);
    values.OrganizationTypeId = parseInt(values.OrganizationTypeId);

    _logger(values, "This is the pre-id values handle submit");

    if (values.id) {
      update(values).then(this.SuccessToastify).catch(this.FailToastify);
    } else {
      addOrganization(values)
        .then(this.SuccessToastify)
        .catch(this.FailToastify);
    }
  };

  //SUCCESS FUNCTIONS

  SuccessToastify = () => {
    toast.success(
      "Success",
      {
        closeOnClick: true,
        position: "top-center",
      }, //USER TO BE PUSHED AFTER 2 SECONDS TO DISPLAY OF ORGANIZATIONS.
      setTimeout(() => {
        this.props.history.push(`/organizations`);
      }, 2000)
    );
  };

  //FAIL FUNCTION

  FailToastify = () => {
    toast.error(
      "Please update the information that you have entered and try again.",
      {
        closeOnClick: true,
        position: "top-center",
      }
    );
  };

  loadLocationOptions = (inputValue, callBack) => {
    //input and call apart of react select / callback should return an array of options
    new Promise((resolve) => {
      resolve(this.callLocations(inputValue, callBack));
    });
  };

  callLocations = (inputValue, callBack) => {
    locationSearch(inputValue).then((response) =>
      this.getLocationSearchSuccess(response, callBack)
    );
  };

  getLocationSearchSuccess = (response, callBack) => {
    let locations = response.items.map((location) => {
      return {
        label: `${location.lineOne} ${location.city}`,
        value: location.id,
      };
    });
    callBack(locations);
  };

  handleLocationChange = (selected, setFieldValue) => {
    setFieldValue("locationId", selected.value);
    setFieldValue("selectedLocation", selected);
  };

  cardText = (text, max) => {
    //FUNCTION CONTROLLING CARD TEXT DISPLAY.
    return text && text.length > max
      ? text.slice(0, max).split(" ").slice(0, -1).join(" ")
      : text;
  };

  //RENDER
  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={OrganizationValidationSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              setFieldValue,
              //   isValid,
              //   isSubmitting,
            } = props;
            return (
              <div className="container-fluider">
                <div className="page-header">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="text-center">
                            {
                              //TERNARY OPERATOR CONTROLLING HEADER OF FORM.
                              values.id ? (
                                <b>Organization Update Form</b>
                              ) : (
                                <b>Organization Entry Form</b>
                              )
                            }
                          </h3>
                        </div>
                        <Form className={"col-lg-6 pt-4"}>
                          <FormGroup>
                            <Label>OrganizationType</Label>
                            <Field
                              name="OrganizationTypeId"
                              component="select"
                              values={values.OrganizationTypeId}
                              label="Status"
                              className={
                                errors.OrganizationTypeId &&
                                touched.OrganizationTypeId
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              as="select"
                            >
                              <option value="">Select Status</option>
                              {this.state.mappedOrgTypes}
                            </Field>
                            {errors.OrganizationTypeId &&
                              touched.OrganizationTypeId && (
                                <span className="input-feedback">
                                  {errors.OrganizationTypeId}
                                </span>
                              )}
                          </FormGroup>
                          <FormGroup>
                            <Label>Name</Label>
                            <Field
                              name="name"
                              type="text"
                              values={values.name}
                              placeholder="name"
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
                            <Label>Headline</Label>
                            <Field
                              name="headline"
                              type="text"
                              values={values.headline}
                              placeholder="headline"
                              autoComplete="off"
                              className={
                                errors.headline && touched.headline
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                            />
                            {errors.headline && touched.headline && (
                              <span className="input-feedback">
                                {errors.headline}
                              </span>
                            )}
                          </FormGroup>
                          <FormGroup>
                            <Label>Description</Label>
                            <Field
                              name="description"
                              type="text"
                              values={values.description}
                              placeholder="Description"
                              autoComplete="off"
                              className={
                                errors.description && touched.description
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                            />
                            {errors.description && touched.description && (
                              <span className="input-feedback">
                                {errors.description}
                              </span>
                            )}
                          </FormGroup>
                          <FormGroup>
                            <Label>Logo</Label>
                            <Field
                              name="logo"
                              type="text"
                              values={values.logo}
                              placeholder="logo"
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
                          </FormGroup>
                          <FormGroup>
                            <Label>Location</Label>
                            <AsyncSelect
                              name="locationId"
                              value={values.selectedLocation}
                              cacheOptions
                              loadOptions={this.loadLocationOptions}
                              onChange={(change) =>
                                this.handleLocationChange(change, setFieldValue)
                              }
                            />
                            {errors.locationId && touched.locationId && (
                              <span className="input-feedback">
                                {errors.locationId}
                              </span>
                            )}
                          </FormGroup>
                          <FormGroup>
                            <Label>Phone</Label>
                            <Field
                              name="phone"
                              type="text"
                              values={values.phone}
                              placeholder="phone"
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
                            <Label>SiteUrl</Label>
                            <Field
                              name="SiteUrl"
                              type="text"
                              values={values.SiteUrl}
                              placeholder="SiteUrl"
                              autoComplete="off"
                              className={
                                errors.SiteUrl && touched.SiteUrl
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                            />
                            {errors.SiteUrl && touched.SiteUrl && (
                              <span className="input-feedback">
                                {errors.SiteUrl}
                              </span>
                            )}
                          </FormGroup>
                          <Button type="btn btn-primary btn-lg orgFormButton">
                            {values.id ? "Update" : "Submit"}
                          </Button>
                        </Form>
                      </div>
                    </div>
                    {values.id ? (
                      <Card className="col-lg-6 pt-4">
                        {" "}
                        <CardHeader className="orgCardHeaderForm">
                          {values.name}
                        </CardHeader>
                        <CardBody>
                          <CardImg
                            src={values.logo}
                            style={{ width: "90%", height: "90%" }} //These proportions keep the incoming card and the editing form the same size.
                          />
                          <CardText>
                            <span>
                              {this.cardText(values.description, 200)}
                            </span>
                          </CardText>
                        </CardBody>
                      </Card>
                    ) : null}
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

OrganizationForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.number }) }),
  location: PropTypes.shape({ state: PropTypes.func }),
};

export default withRouter(OrganizationForm);
