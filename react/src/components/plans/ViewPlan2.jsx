import React from "react";
import PropTypes from "prop-types";
// import { Card, CardHeader, CardFooter, CardBody } from "reactstrap";
import TabbedCard from "./TabbedCard";
import * as planService from "./../../services/planService";
import "../../assets/css/plans.css";
import logger from "sabio-debug";
const _logger = logger.extend("ViewPlan2");

class ViewPlan2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: { prerequisites: "" },
      tabContent: [],
      colors: [
        "badge-primary",
        "badge-secondary",
        "badge-success",
        "badge-info",
        "badge-light",
        "badge-dark",
      ],
    };
  }
  componentDidMount() {
    const { payload } = this.props.location.state;
    if (payload) {
      this.getPlanDetails(payload);
    } else {
      //show an error or redirect back to plans page
    }
  }
  getPlanDetails = (plan) => {
    planService
      .getById(plan.id)
      .then(this.onGetDetailsSuccess)
      .catch(this.onGetDetailsError);
  };
  onGetDetailsSuccess = (response) => {
    _logger(response);
    this.renderView(response.item);
  };
  onGetDetailsError = (errResponse) => {
    _logger(errResponse);
  };
  editCallback = () => {
    this.props.editClick(this.state.plan);
  };
  onEditClickHandler = (event) => {
    event.preventDefault();
    this.editCallback();
  };
  buildAgenda = (agendas) => <TabbedCard agendas={agendas} />;
  renderView = (plan) => {
    let preReqlist = plan.prerequisites;
    preReqlist = preReqlist.split(",");
    if (plan.agendas) {
      //put here to see
      this.setState(() => {
        let AgendaList = JSON.parse(plan.agendas);
        return {
          tabContent: this.buildAgenda(AgendaList),
          plan: {
            ...plan,
            agendas: AgendaList,
          },
          mappedPreRequisites: preReqlist.map(this.mapBadges),
        };
      });
    } else {
      this.setState({ plan: plan });
    }
  };

  mapBadges = (element) => (
    <span
      className={`badge sm ` + this.state.colors[Math.floor(Math.random() * 5)]}
    >
      {element}
    </span>
  );

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12">
          <div className="border-widgets card">
            <div className="m-0 row">
              <div className="col-6 xs-width-100 col-xl-3">
                <div className="crm-top-widget card-body">
                  <div className="media">
                    <div className="media-body">
                      <span className="mt-0">
                        <h4 className="planTitle">{this.state.plan.title}</h4>
                      </span>
                      <h4 className="counter">
                        <span></span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 xs-width-100 col-xl-3">
                <div className="crm-top-widget card-body">
                  <div className="media">
                    <i className="font-secondary align-self-center mr-3" />
                    <div className="media-body">
                      <h4>DURATION</h4>
                      <h4 className="counter">
                        <span className="durationText">
                          {this.state.plan.duration}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 xs-width-100 col-xl-3">
                <div className="crm-top-widget card-body">
                  <div className="media">
                    <i className="font-success align-self-center mr-3" />
                    <div className="media-body">
                      <h4>CONCEPTS</h4>
                      {this.state.plan.concepts}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 xl-100">
            <div className="card">
              <div className="card-header">
                <h5>Overview</h5>
              </div>
              <div className="card-body">
                <div className="ct-chart ct-10 total-chart">
                  {this.state.plan.overview}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h5>Prerequisites</h5>
              </div>
              <div className="card-body">{this.state.mappedPreRequisites}</div>
            </div>
            <div className="card">
              <div className="card-header">
                <h5>Media & Examples</h5>
              </div>
              <div className="card-body">fddafds</div>
            </div>
          </div>
          <div className="col-xl-6 xl-100">
            <div className="card">
              <div className="card-header">
                <h5>Objectives</h5>
              </div>
              <div className="card-body">
                <div className="row objectivesRow">
                  <div className="col">
                    <div className="card bg-secondary">
                      <div className="card-header bg-secondary">
                        <h5>Learners will understand (concepts)</h5>
                      </div>
                      <div className="card-body">
                        <p className="text-white">{this.state.plan.concepts}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row objectivesRow">
                  <div className="col">
                    <div className="card bg-primary">
                      <div className="card-header bg-primary">
                        <h5>Learners Will Be Able To (Skill, Practice)</h5>
                      </div>
                      <div className="card-body">
                        <p className="text-white">{this.state.plan.concepts}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row objectivesRow">
                  <div className="col">
                    <div className="card bg-secondary">
                      <div className="card-header bg-secondary">
                        <h5>Vocabulary with Definitions</h5>
                      </div>
                      <div className="card-body">
                        <p className="text-white">
                          {this.state.plan.vocabulary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row objectivesRow">
                  <div className="col">
                    <div className="card bg-primary">
                      <div className="card-header bg-primary">
                        <h5>State/Federal Standards</h5>
                      </div>
                      <div className="card-body">
                        <p className="text-white">
                          {this.state.plan.vocabulary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">{this.state.tabContent}</div>
        </div>
      </React.Fragment>
    );
  }
}
ViewPlan2.propTypes = {
  planId: PropTypes.number,
  editClick: PropTypes.func,
  location: PropTypes.shape({ state: PropTypes.func }),
  prerequisites: PropTypes.string,
};

export default ViewPlan2;
