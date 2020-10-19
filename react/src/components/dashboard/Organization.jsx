import React, { Component } from "react";
import { getDashboardData } from "../../services/organizationServices";
import "../../assets/css/orgDashboard.css";
import logger from "sabio-debug";
import { PropTypes } from "prop-types";
import OrgPlanCard from "./OrgPlans";
import OrgGroupCard from "./OrgGroups";
import OrgfollowerCard from "./OrgFollowers";
import { withRouter } from "react-router-dom";

const _logger = logger.extend("App");

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: 0,
      groups: 0,
      plans: 0,
      updatedPlans: [],
      mappedPlans: [],
      newestGroups: [],
      mappedGroups: [],
      topFollowers: [],
      mappedFollowers: [],
    };
  }
  // Recieving and Setting Data into State
  componentDidMount = () => {
    getDashboardData()
      .then(this.onGetDataSuccess)
      .then(this.setMappedPlans)
      .then(this.setMappedGroups)
      .then(this.setMappedFollowers)
      .catch(this.onGetDataError);
  };
  onGetDataSuccess = (config) => {
    this.addDataToState(config.items[0]);
  };
  onGetDataError = (config) => {
    _logger(config, "error");
  };
  addDataToState = (info) => {
    _logger(info, "info");
    var followers = info.followers;
    var groups = info.groups;
    var plans = info.plans;
    var updatedPlans = info.updatedPlans ? info.updatedPlans : [];
    var newestGroups = info.addedGroups ? info.addedGroups : [];
    var topFollowers = info.topFollowers ? info.topFollowers : [];

    this.setState((prevState) => {
      return {
        ...prevState,
        followers,
        groups,
        plans,
        updatedPlans,
        newestGroups,
        topFollowers,
      };
    });
  };

  // Mapping Code
  setMappedPlans = () => {
    let planCopy = this.state.updatedPlans;
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedPlans: planCopy.map(this.mapOrganizationPlan),
      };
    });
  };
  setMappedGroups = () => {
    let groupCopy = this.state.newestGroups;

    this.setState((prevState) => {
      return {
        ...prevState,
        mappedGroups: groupCopy.map(this.mapOrganizationGroup),
      };
    });
  };
  setMappedFollowers = () => {
    let followersCopy = this.state.topFollowers;

    this.setState((prevState) => {
      return {
        ...prevState,
        mappedFollowers: followersCopy.map(this.mapOrganizationFollower),
      };
    });
  };

  // Cards
  mapOrganizationPlan = (plan) => (
    <OrgPlanCard plan={plan} sendToPlanInfoCard={this.sendToPlanInfoCard} />
  );
  mapOrganizationGroup = (group) => (
    <OrgGroupCard group={group} onGroupClick={this.sendToGroupInfoCard} />
  );
  mapOrganizationFollower = (follower) => (
    <OrgfollowerCard follower={follower} />
  );

  // Redirect Code
  sendToGroupInfoCard = (Group) => {
    this.props.history.push(`/groups/${Group.id}`, Group);
  };
  sendToPlanInfoCard = (plan) => {
    this.props.history.push(`/plan/${plan.id}/detail`, {
      type: "Plan",
      payload: plan,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="border-widgets card dashPanel container-fluid planDashPanel">
          <div className="m-0 row">
            <div className="col-6 xs-width-100 col-xl-4">
              <div className="crm-top-widget card-body">
                <div className="media">
                  <i className="icon-user font-primary align-self-center mr-3" />
                  <div className="media-body">
                    <span className="mt-0">Total Followers</span>
                    <h4 className="counter">
                      <span>{this.state.followers}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 xs-width-100 col-xl-4">
              <div className="crm-top-widget card-body">
                <div className="media">
                  <i className="icofont icofont-company font-secondary align-self-center mr-3" />
                  <div className="media-body">
                    <span className="mt-0">Total Groups</span>
                    <h4 className="counter">
                      <span>{this.state.groups}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 xs-width-100 col-xl-4">
              <div className="crm-top-widget card-body">
                <div className="media">
                  <i className="icon-clipboard font-success align-self-center mr-3" />
                  <div className="media-body">
                    <span className="mt-0">Total Plans</span>
                    <h4 className="counter">
                      <span>{this.state.plans}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="height-equal card">
              <div className="card-header">
                <h5>Recently Modified Plans</h5>
              </div>
              <div className="card-body">
                <div className="user-status table-responsive product-chart">
                  <table className="table table-borderless">
                    <tbody>{this.state.mappedPlans}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="height-equal card">
              <div className="card-header">
                <h5>Recently Added Groups</h5>
              </div>
              <div className="card-body">
                <div className="user-status table-responsive product-chart">
                  <table className="table table-borderless">
                    <tbody>{this.state.mappedGroups}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="height-equal card">
              <div className="card-header">
                <h5>Top Followers</h5>
              </div>
              <div className="card-body">
                <div className="user-status table-responsive product-chart">
                  <table className="table table-borderless">
                    <tbody>{this.state.mappedFollowers}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Organization.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
};

export default withRouter(Organization);
