import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import UserDetails from "./User";
import OrganizationDetails from "./Organization";
import Confirmation from "./Confirmation";
import Location from "./Location";
import Success from "./Success";
import * as userService from "../../services/userService";
import debug from "sabio-debug";
const _logger = debug.extend("ProfileSetup");

class ProfileSetup extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    mi: "",
    avatarUrl: "",
    organizationTypeId: "",
    name: "",
    headline: "",
    description: "",
    logo: "",
    locationTypeId: "",
    phone: "",
    siteUrl: "",
    lineOne: "",
    lineTwo: "",
    city: "",
    zip: "",
    stateId: "",
    latitude: "",
    longitude: "",
    currentUser: { roles: "" },
  };

  componentDidMount() {
    userService.currentUser().then(this.onSuccessGetUser);
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // Handle field change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  // Handle avatarUrl
  handleAvatarUrl = (url) => {
    _logger(url);
    this.setState({ avatarUrl: url });
  };

  // Handle logo
  handleLogo = (url) => {
    this.setState({ logo: url });
  };

  // Handle Location
  handleLocation = (address, state) => {
    _logger(address, state);
    this.setState({
      lineOne: `${address.street_number} ${address.route}`,
      lineTwo: address.administrative_area_level_2,
      city: address.locality,
      zip: address.postal_code,
      stateId: state.id, // function that take in address.locality return stateId
      latitude: address.latitude,
      longitude: address.longitude,
    });
  };

  onSuccessGetUser = (response) => {
    _logger("Get User Success Initial SetUp", response);

    let currentUser = { ...response.item, isLoggedIn: true };
    currentUser.email = response.item.name;
    delete currentUser.name;
    this.setState((prevState) => {
      return { ...prevState, currentUser };
    });
  };

  render() {
    // const background = require("../../assets/images/auth-layer.png");
    const { step } = this.state;
    const {
      firstName,
      lastName,
      mi,
      avatarUrl,
      organizationTypeId,
      name,
      headline,
      description,
      logo,
      phone,
      siteUrl,
      lineOne,
      lineTwo,
      city,
      zip,
      stateId,
      latitude,
      longitude,
      locationTypeId,
    } = this.state;

    const values = {
      firstName,
      lastName,
      mi,
      avatarUrl,
      organizationTypeId,
      name,
      headline,
      description,
      logo,
      phone,
      siteUrl,
      lineOne,
      lineTwo,
      city,
      zip,
      stateId,
      latitude,
      longitude,
      locationTypeId,
    };

    if (this.state.currentUser.roles.includes("Organization")) {
      switch (step) {
        case 1:
          return (
            <UserDetails
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              handleAvatarUrl={this.handleAvatarUrl}
              values={values}
            ></UserDetails>
          );
        case 2:
          return (
            <OrganizationDetails
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              handleAvatarUrl={this.handleAvatarUrl}
              handleLogo={this.handleLogo}
              values={values}
              prevStep={this.prevStep}
            ></OrganizationDetails>
          );
        case 3:
          return (
            <Location
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              handleAvatarUrl={this.handleAvatarUrl}
              handleLocation={this.handleLocation}
              values={values}
              prevStep={this.prevStep}
            ></Location>
          );
        case 4:
          return (
            <Confirmation
              nextStep={this.nextStep}
              values={values}
              prevStep={this.prevStep}
              currentUser={this.state.currentUser}
            ></Confirmation>
          );
        default:
          return <Success currentUser={this.state.currentUser}></Success>;
      }
    } else {
      switch (step) {
        case 1:
          return (
            <UserDetails
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              handleAvatarUrl={this.handleAvatarUrl}
              values={values}
            ></UserDetails>
          );
        case 2:
          return (
            <Confirmation
              nextStep={this.nextStep}
              values={values}
              prevStep={this.prevStep}
              currentUser={this.state.currentUser}
            ></Confirmation>
          );
        default:
          return <Success currentUser={this.state.currentUser}></Success>;
      }
    }
  }
}

ProfileSetup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  currentUser: PropTypes.shape({
    roles: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(ProfileSetup);
