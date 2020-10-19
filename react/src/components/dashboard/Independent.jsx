import React from "react";
import { withRouter } from "react-router-dom";
import getDashData from "./../../services/independentUserService";
import logger from "sabio-debug";
import PlansFavoredCard from "./PlansFavoredCard";
import GroupsFollowCard from "./GroupsFollowCard";
import PropTypes from "prop-types";

const _logger = logger.extend("Independent");

class Independent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      groups: [],
      planFavorite: 0,
      groupsFollowed: 0,
      mappedPlans: [],
      mappedGroups: [],
      recommendedGroups: [],
      recommendedPlans: [],
    };
  }

  componentDidMount = () => {
    getDashData().then(this.onGetSuccess).catch(this.onGetError);
  };

  onGetSuccess = (info) => {
    const groups = info.item.groups
      ? info.item.groups
      : info.item.recommendedGroups;
    const plans = info.item.plans
      ? info.item.plans
      : info.item.recommendedPlans;
    const followedGroups = info.item.groupsFollowed;
    const favoritedPlans = info.item.planFavorite;
    const recommendedGroups = info.item.recommendedGroups;
    const recommendedPlans = info.item.recommendedPlans;

    this.setState((prevState) => {
      return {
        ...prevState,
        groups,
        mappedPlans: plans ? plans.map(this.mapPlan) : [],
        mappedGroups: groups ? groups.map(this.mapGroup) : [],
        plans,
        followedGroups,
        favoritedPlans,
        recommendedGroups,
        recommendedPlans,
      };
    });
  };
  onGetError = (config) => {
    _logger(config, "could not retrieve data");
  };

  mapPlan = (plan) => (
    <PlansFavoredCard
      plan={plan}
      key={plan.id}
      handlePlanClick={this.handlePlanClick}
    />
  );

  mapGroup = (group) => (
    <GroupsFollowCard
      group={group}
      key={group.id}
      handleGroupClick={this.handleGroupClick}
    />
  );

  //reroutes to individual plan page
  handlePlanClick = (plan) => {
    this.props.history.push(`/plan/${plan.id}/detail`, plan);
  };

  //reroutes to individual group page
  handleGroupClick = (group) => {
    this.props.history.push(`/groups/${group.id}`, group);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-lg-6">
                <h3>
                  Welcome, User!<small>Instructor</small>
                </h3>
              </div>
              <div className="col-lg-6">
                <nav className="pull-right" aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/universal/dashboard/default">
                        <i className="fa fa-home" />
                      </a>
                    </li>
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="active breadcrumb-item" aria-current="page">
                      Crm
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="border-widgets card">
          <div className="m-0 row">
            <div className="col-6 xs-width-100 col-xl-6">
              <div className="crm-top-widget card-body">
                <div className="media">
                  <i className="icon-user font-primary align-self-center mr-3" />
                  <div className="media-body">
                    <span className="mt-0">Groups Followed</span>
                    <h4 className="counter">
                      <span>{this.state.followedGroups}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 xs-width-100 col-xl-6">
              <div className="crm-top-widget card-body">
                <div className="media">
                  <i className="icon-clipboard font-success align-self-center mr-3" />
                  <div className="media-body">
                    <span className="mt-0">FavoritePlans</span>
                    <h4 className="counter">
                      <span>{this.state.favoritedPlans}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 set-col-12 col-xl-6 xl-100">
            <div className="height-equal card">
              <div className="card-header">
                <h5>Groups</h5>
              </div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>{this.state.mappedGroups}</tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="height-equal card">
              <div className="card-header">
                <h5>Plans</h5>
              </div>
              <div className="card-body">
                <div className="user-status table-responsive product-chart">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Subject</th>
                      </tr>
                    </thead>
                    <tbody>{this.state.mappedPlans}</tbody>
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

Independent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(Independent);
