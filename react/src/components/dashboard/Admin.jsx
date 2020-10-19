import React, { Component } from "react";
import logger from "sabio-debug";
import * as adminDashServices from "./../../services/adminDashService";
import AdminPlanFavCard from "./../dashboard/AdminPlanFavsCard";
import AdminFollowedGroupsCard from "./../dashboard/AdminFollowedGroupsCard";
import AdminRecentUsersCard from "./../dashboard/AdminRecentUsersCard";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const _logger = logger.extend("App");

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: "",
      groups: "",
      organizations: "",
      plans: "",
      planFavorites: [],
      followedGroups: [],
      recentUsers: [],
    };
  }
  componentDidMount = () => {
    adminDashServices
      .getAdminDashInfo()
      .then(this.onGetAdminDataSuccess)
      .catch(this.onGetAdminDataError);
  };
  onGetAdminDataSuccess = (response) => {
    this.addAdminDataToState(response.items[0]);
  };

  addAdminDataToState = (data) => {
    _logger(data);
    var activeUser = data.activeUser;
    var groups = data.groups;
    var organizations = data.organizations;
    var plans = data.plans;
    var planFavorites = data.planFavorites ? data.planFavorites : [];
    var followedGroups = data.followedGroups ? data.followedGroups : [];
    var recentUsers = data.recentUsers ? data.recentUsers : [];

    this.setState((prevState) => {
      return {
        ...prevState,
        activeUser,
        groups,
        organizations,
        plans,
        planFavorites: planFavorites.map(this.mapPlanFavorites),
        followedGroups: followedGroups.map(this.mapFollowedGroups),
        recentUsers: recentUsers.map(this.mapRecentUsers),
      };
    });
  };

  mapPlanFavorites = (plan) => (
    <AdminPlanFavCard
      planFavorites={plan}
      key={plan.id}
      showPlan={this.showPlan}
    />
  );

  showPlan = (plan) => {
    this.props.history.push(`plan/${plan.id}/detail`, {
      type: "Plan",
      payload: plan,
    });
  };
  mapFollowedGroups = (followedGroups) => (
    <AdminFollowedGroupsCard
      followedGroups={followedGroups}
      key={followedGroups.id}
      showGroup={this.showGroup}
    />
  );
  showGroup = (Group) => {
    this.props.history.push(`groups/${Group.id}`, Group);
  };
  mapRecentUsers = (recentUsers) => (
    <AdminRecentUsersCard recentUsers={recentUsers} />
  );

  onGetAdminDataError = (response) => {
    _logger(response);
  };
  render() {
    return (
      <React.Fragment>
        <h1>Admin Dashboard</h1>
        <div className="border-widgets card dashPanel container-fluid planDashPanel">
          <div className="m-0 row">
            <div className="col-6 xs-width-100 col-xl-3">
              <div className="crm-top-widget card-body">
                <div className="media">
                  <i className="icon-user font-primary align-self-center mr-3" />
                  <div className="media-body">
                    <span className="mt-0">Total Users</span>
                    <h4 className="counter">
                      <span>{this.state.activeUser}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 xs-width-100 col-xl-3">
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
            <div className="col-6 xs-width-100 col-xl-3">
              <div className="crm-top-widget card-body">
                <div className="media">
                  <i className="fa fa-bank font-success align-self-center mr-3"></i>
                  <div className="media-body">
                    <span className="mt-0">Total Organizations</span>
                    <h4 className="counter">
                      <span>{this.state.organizations}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 xs-width-100 col-xl-2">
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
          <div className="col-md-4">
            <div className="height-equal card">
              <div className="card-header">
                <h5>Top Favorited Plans</h5>
              </div>
              <div className="card-body">
                <div className="user-status table-responsive product-chart">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                      </tr>
                    </thead>
                    <tbody>{this.state.planFavorites}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="height-equal card">
              <div className="card-header">
                <h5>Most Followed Groups</h5>
              </div>
              <div className="card-body">
                <div className="user-status table-responsive product-chart">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                      </tr>
                    </thead>
                    <tbody>{this.state.followedGroups}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="height-equal card">
              <div className="card-header">
                <h5>Recently Added Users</h5>
              </div>
              <div className="card-body">
                <div className="user-status table-responsive product-chart">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                      </tr>
                    </thead>
                    <tbody>{this.state.recentUsers}</tbody>
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
Admin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(Admin);
