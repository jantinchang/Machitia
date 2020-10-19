import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { List, ListItem } from "material-ui/List";
import {
  add,
  addBothUserOrganization,
} from "../../services/userProfileServices";
import Card from "material-ui/Card";

class Confirmation extends React.Component {
  state = {};
  componentDidMount() {}

  continue = (e) => {
    e.preventDefault();
    const {
      values: {
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
      },
    } = this.props;

    const userDetails = { firstName, lastName, mi, avatarUrl };

    // hardcoded for now as per eric's advice.

    const allDetails = {
      firstName: firstName,
      lastName: lastName,
      mi: mi,
      avatarUrl: avatarUrl,
      organizationTypeId: organizationTypeId,
      name: name,
      headline: headline,
      description: description,
      logo: logo,
      locationTypeId: locationTypeId,
      phone: phone,
      siteUrl: siteUrl,
      lineOne: lineOne,
      lineTwo: lineTwo,
      city: city,
      zip: zip,
      stateId: stateId,
      latitude: latitude,
      longitude: longitude,
    };

    if (this.props.currentUser.roles.includes("Independent")) {
      add(userDetails).then(this.onAddSuccess).catch(this.onActionError);
    } else {
      // do not pass userId in front end.
      // make this all into one big SQL insert.

      addBothUserOrganization(allDetails)
        .then(this.onAddSuccess)
        .catch(this.onActionError);
    }
  };

  onAddSuccess = () => {
    toast.success("You have successfully finished your initial Setup!");
    this.props.nextStep();
  };

  onActionError = () => {
    toast.error("Opps, something went wrong.");
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const background = require("../../assets/images/auth-layer.png");
    const {
      values: {
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
      },
    } = this.props;
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
                            <AppBar title="Confirm Profile Details" />
                            <br />
                            <Card>
                              <h1> User Profile </h1>
                              <List>
                                <ListItem
                                  primaryText="First Name"
                                  secondaryText={firstName}
                                />
                                <ListItem
                                  primaryText="Last Name"
                                  secondaryText={lastName}
                                />
                                <ListItem
                                  primaryText="Middle Initial"
                                  secondaryText={mi}
                                />
                                <ListItem
                                  primaryText="Avatar Url"
                                  secondaryText={avatarUrl}
                                />
                              </List>
                              <div className="col-auto">
                                {avatarUrl && (
                                  <img
                                    className="img-100"
                                    alt="404"
                                    src={avatarUrl}
                                  />
                                )}
                              </div>
                              <br />
                            </Card>
                            {this.props.currentUser.roles.includes(
                              "Organization"
                            ) && (
                              <React.Fragment>
                                <br />
                                <Card>
                                  <h1> Organization Info </h1>
                                  <List>
                                    <ListItem
                                      primaryText="Organization Type"
                                      secondaryText={organizationTypeId}
                                    />
                                    <ListItem
                                      primaryText="Organization Name"
                                      secondaryText={name}
                                    />
                                    <ListItem
                                      primaryText="Headline"
                                      secondaryText={headline}
                                    />
                                    <ListItem
                                      primaryText="Description"
                                      secondaryText={description}
                                    />
                                    <ListItem
                                      primaryText="Logo"
                                      secondaryText={logo}
                                    />
                                    <div className="col-auto">
                                      {logo && (
                                        <img
                                          className="img-100"
                                          alt="404"
                                          src={logo}
                                        />
                                      )}
                                    </div>
                                    <ListItem
                                      primaryText="phone"
                                      secondaryText={phone}
                                    />
                                    <ListItem
                                      primaryText="siteUrl"
                                      secondaryText={siteUrl}
                                    />
                                  </List>
                                  <br />
                                </Card>
                                <br />
                                <Card>
                                  <h1> Location Details </h1>
                                  <List>
                                    <ListItem
                                      primaryText="Address"
                                      secondaryText={lineOne}
                                    />
                                    <ListItem secondaryText={lineTwo} />
                                    <ListItem
                                      primaryText="City"
                                      secondaryText={city}
                                    />
                                    <ListItem
                                      primaryText="Zip Code"
                                      secondaryText={zip}
                                    />
                                  </List>
                                  <br />
                                </Card>
                              </React.Fragment>
                            )}
                            <div>
                              <Button
                                // disabled={!isValid}
                                onClick={this.continue}
                              >
                                Confirm & Continue
                              </Button>
                              <Button
                                color="warning"
                                // disabled={!isValid}
                                onClick={this.back}
                              >
                                Back
                              </Button>
                            </div>
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

Confirmation.propTypes = {
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
};

export default withRouter(Confirmation);
