import React from "react";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";
import * as planService from "./../../services/planService";
import PlanGridCard from "./PlanGridCard";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import logger from "sabio-debug";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
const _logger = logger.extend("PlanGrid"); //anywhere in the app.

class PlanGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      mappedPlans: [],
      searchTerm: "",
      pageSize: 12,
      currentPage: 1,
      totalCount: 10,
    };
  }

  componentDidMount() {
    this.getPaginate(this.state.currentPage, this.state.pageSize);
  }

  getPaginate = (pageIndex, pageSize) => {
    planService
      .paginatedGeneral(pageIndex - 1, pageSize)
      .then(this.onPlanSuccess)
      .catch(this.handleError);
  };

  handleError = (error) => {
    _logger(error);
    this.setState((prevState) => {
      return {
        ...prevState,
        plans: [],
        mappedPlans: [],
        currentPage: 1,
        totalCount: 10,
      };
    });
  };

  onPlanSuccess = (config) => {
    let initialPlans = config.item.pagedItems;
    this.setState((prevState) => {
      let totalCount = config.item.totalCount;

      let Plans = { ...prevState.Plans };
      const newPlans = initialPlans;
      Plans = newPlans;
      return {
        ...prevState,
        mappedPlans: Plans.map(this.mapPlans),
        totalCount,
      };
    });
  };

  onChange = (page) => {
    this.setState({ currentPage: page }, () => this.returnSearchCondition());
  };
  handleSearch = (event) => {
    let searchTerm = event.target.value;

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: 1,
          searchTerm,
        };
      },
      () => this.returnSearchCondition()
    );
  };
  returnSearchCondition = () => {
    return this.state.searchTerm.length > 0
      ? this.searchQuery(this.state.currentPage, this.state.pageSize)
      : this.getPaginate(this.state.currentPage, this.state.pageSize);
  };

  searchQuery = (pageIndex, pageSize) => {
    _logger(pageIndex, pageSize);
    planService
      .search(this.state.searchTerm, pageIndex - 1, pageSize)
      .then(this.onPlanSuccess)
      .catch(this.handleError);
  };
  mapPlans = (Plan) => (
    <PlanGridCard
      Plan={Plan}
      key={Plan.id}
      planDetails={this.planDetails}
      onEditClick={this.onEditClick}
      isCreatedByUser={this.props.currentUser.id === Plan.createdBy}
    />
  );
  planDetails = (plan) => {
    this.props.history.push(`/plan/${plan.id}/detail`, {
      type: "Plan",
      payload: plan,
    });
  };

  clearInput = () => {
    this.setState((prevState) => {
      return { prevState, searchTerm: "", currentPage: 1 };
    }, this.getPaginate(this.state.currentPage, this.state.pageSize));
  };

  onEditClick = (plan) => {
    _logger(plan);
    this.getPlanDetails(plan.id);
  };
  getPlanDetails = (planId) => {
    planService
      .getById(planId)
      .then(this.onGetDetailsSuccess)
      .catch(this.onGetDetailsError);
  };
  onGetDetailsSuccess = (response) => {
    _logger(response);
    let plan = response.item;
    plan.agendas = JSON.parse(response.item.agendas);
    this.props.history.push(`/plans/${plan.id}/edit`, {
      plan: plan,
    });
  };
  onGetDetailsError = (errResponse) => {
    _logger(errResponse);
  };
  onCreateClick = () => {
    this.props.history.push(`/plans/create`);
  };
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} className="page-header">
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h3" component="h1">
                Plans
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Grid container justify="flex-end" spacing={2}>
                <Grid item>
                  <TextField
                    id="search-input"
                    value={this.state.searchTerm}
                    name="query"
                    size="small"
                    onChange={this.handleSearch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="icofont icofont-ui-search"></i>
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={this.onCreateClick}>
                    <i className="icofont icofont-edit"></i>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="left" spacing={2}>
            {this.state.mappedPlans}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Pagination
              onChange={this.onChange}
              current={this.state.currentPage}
              total={this.state.totalCount}
              locale={localeInfo}
              pageSize={this.state.pageSize}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
PlanGrid.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default withRouter(PlanGrid);
