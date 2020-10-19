import React from "react";
import Pagination from "rc-pagination";
import { paginatedList, search } from "../../services/organizationServices";
import OrgCard from "./OrgCard";
import { PropTypes } from "prop-types";
import logger from "sabio-debug";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "../../assets/css/organizations.css";
const _logger = logger.extend("Organizations"); //anywhere in the app.

class OrganizationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      mappedOrgs: [],
      pageSize: 8,
      searchTerm: "",
      currentPage: 1,
      totalCount: 10,
    };
  }

  componentDidMount() {
    this.getPaginate(this.state.currentPage, this.state.pageSize);
  }

  getPaginate = (pageIndex, pageSize) => {
    paginatedList(pageIndex - 1, pageSize)
      .then(this.onOrgSuccess)
      .catch(this.handleError);
  };

  handleError = (error) => {
    _logger(error);
    this.setState((prevState) => {
      return {
        ...prevState,
        organizations: [],
        mappedOrgs: [],
        currentPage: 1,
        totalCount: 10,
      };
    });
  };

  searchQuery = (pageIndex, pageSize) => {
    _logger(pageIndex, pageSize);
    search(this.state.searchTerm, pageIndex - 1, pageSize)
      .then(this.onOrgSuccess)
      .catch(this.handleError);
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
  onOrgSuccess = (config) => {
    let initialOrganizations = config.item.pagedItems;
    this.setState((prevState) => {
      //WHILE ORG CALL IS MADE. WE ALSO GET PAGE NUMBERS FOR PAGINATION
      let totalCount = config.item.totalCount;
      //ORG CALL - FOR THE ARRAY.
      let organizations = { ...prevState.organizations };
      const newOrganizations = initialOrganizations;
      organizations = newOrganizations;
      return {
        ...prevState,
        mappedOrgs: organizations.map(this.mapOrg),
        totalCount,
      };
    }, this.stateChanged);
  };
  mapOrg = (Organization) => (
    <OrgCard
      Organization={Organization}
      key={Organization.id}
      editOrganization={this.editOrganization}
      viewDetails={this.viewDetails}
      currentUser={this.props.currentUser}
    />
  );

  //View Edit Page of Organization. Not Currently Used.
  editOrganization = (Organization) => {
    this.props.history.push(
      `/organization/${Organization.id}/edit`,
      Organization
    );
  };

  //View Profile Page of Organization
  viewDetails = (Organization) => {
    this.props.history.push(`/organizations/${Organization.id}/details`, {
      type: "Organization",
      payload: Organization,
    });
  };

  clearInput = () => {
    this.setState((prevState) => {
      return { prevState, searchTerm: "" };
    }, this.getPaginate(this.state.currentPage, this.state.pageSize));
  };

  changePagePize = (e) => {
    const pageSize = parseInt(e.target.value);
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          pageSize,
          currentPage: 1,
          searchTerm: "",
        };
      },
      () => this.returnSearchCondition()
    );
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row pt-4">
          <div className="col-md-6 text-center">
            <Pagination
              onChange={this.onChange}
              current={this.state.currentPage}
              total={this.state.totalCount}
              locale={localeInfo}
            />
          </div>
          <div className="col-md-2">
            <select
              name="pageSize"
              className="form-control"
              onChange={this.changePagePize}
            >
              <option value="8"> Default Size 8</option>
              <option value="16"> 16 </option>
              <option value="32"> 32</option>
              <option value="50"> 50 </option>
              <option value="100"> 100 </option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="query"
              value={this.state.searchTerm}
              id="search-input"
              placeholder="Search..."
              className="search-label form-control"
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-md-2">
            {" "}
            <button
              type="button"
              className="btn btn-primary"
              id="clear-button"
              onClick={this.clearInput}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="row mt-4">{this.state.mappedOrgs}</div>
      </div>
    );
  }
}
OrganizationsList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
  }),
};

export default OrganizationsList;
