import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/organizations.css";
import { getOrgDetails } from "../../services/organizationServices";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import logger from "sabio-debug";
const _logger = logger.extend("OrganizationView");
const googleMapApiKey = process.env.REACT_APP_GOOGLE_APIKEY;
class OrganizationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Organization: {
        location: {},
        organizationType: {},
        createdBy: {},
        group: [],
        mappedOrgViewCards: [],
        colors: [
          "font-primary",
          "font-secondary",
          "font-success",
          "font-info",
          "font-light",
          "font-dark",
        ],
      },
    };
  }

  componentDidMount() {
    this.getOrganizationDetails(this.props.location.state.payload);
  }

  getOrganizationDetails = (Organization) => {
    getOrgDetails(Organization).then(this.onOrgDetailsSuccess);
  };

  onOrgDetailsSuccess = (response) => {
    _logger(response);
    this.setState(() => {
      let orgDetails = response.item;
      // let locationDetails = response.item.location;
      let orgGroupFollowers = response.item.group;
      return {
        Organization: orgDetails,
        // location: locationDetails,
        // createdBy: createdByDetails,
        groups: orgGroupFollowers,
        mappedOrgViewCards: orgGroupFollowers.map(this.mapOrgGroupFollowers),
      };
    });
  };

  mapOrgGroupFollowers = (group) => {
    return (
      <React.Fragment key={group.id}>
        <li className="media">
          <span className="mr-3 font-primary">{group.name.charAt(0)}</span>
          <div className="align-self-center media-body">
            <h6 className="mt-0">{group.name}</h6>
            <ul className="dates">
              <li className="digits">25 July 2017</li>
              <li className="digits">20 hours ago</li>
            </ul>
          </div>
        </li>
      </React.Fragment>
    );
  };

  render() {
    const containerStyle = {
      width: "100%",
      height: "400px",
    };

    const center = {
      lat: this.state.Organization.location.latitude,
      lng: this.state.Organization.location.longitude,
    };
    return (
      <div className="col-md-12">
        <div className="row m-0">
          <div className="card organizationViewCard">
            <div className="profile-img-style">
              <div className="row">
                <div className="col-sm-12">
                  <div className="media">
                    <img
                      src={this.state.Organization.logo}
                      className="img-thumbnail rounded-circle mr-3 orgimg"
                      alt="Generic placeholder"
                    />
                    <div className="media-body align-self-center">
                      <h5 className="mt-0 orgNameTitleViewComponent">
                        {this.state.Organization.name}
                      </h5>
                      <div className="float-sm-left">
                        <small>{this.state.Organization.headline}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="align-self-center col-sm-4"></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                  {" "}
                  <span>
                    {" "}
                    <p className="text-center">Phone</p>
                  </span>
                  <p className="text-center text-large">
                    {this.state.Organization.phone}
                  </p>
                </div>
                <div className="col-md-2">
                  {" "}
                  <span>
                    {" "}
                    <p className="text-center">Address</p>
                  </span>
                  <p className="OrgCenterHeader">
                    {this.state.Organization.location.lineOne}
                    <br />
                    {this.state.Organization.location.city},{" "}
                    {this.state.Organization.location.stateName}
                    <br />
                    {this.state.Organization.location.zip}
                  </p>
                </div>
                <div className="col-md-2">
                  {" "}
                  <span>
                    {" "}
                    <p className="text-center">Followers</p>
                  </span>
                  <p className="OrgCenterHeader">
                    {this.state.Organization.totalFollowers}
                  </p>
                </div>
                <div className="col-md-2">
                  {" "}
                  <span>
                    {" "}
                    <p className="text-center">Total Groups Under</p>
                  </span>
                  <p className="text-center text-large">
                    {this.state.Organization.totalGroups}
                  </p>
                </div>
                <div className="col-md-2"></div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-1"></div>
                    <p className="text-indent">
                      {this.state.Organization.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="height-equal card">
              <div className="card-header">
                <h5 className="text-uppercase">Groups Following</h5>
              </div>
              <div className="card-body">
                <ul className="crm-activity equal-height-xl">
                  {this.state.mappedOrgViewCards}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <LoadScript googleMapsApiKey={googleMapApiKey}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                  ></GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
OrganizationView.propTypes = {
  location: PropTypes.shape({ state: PropTypes.func }),
  prerequisites: PropTypes.string,
};

export default OrganizationView;
