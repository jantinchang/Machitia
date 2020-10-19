import React, { Component } from "react";
import logger from "sabio-debug";
import UserProfileCard from "./UserProfileCard";
import * as userProfileServices from "./../../services/userProfileServices";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

const _logger = logger.extend("UserProfileCard");

class UserProfiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfiles: [],
      mappedUserProfiles: [],
      searchTerm: "",
      currentPage: 1,
      pageSize: 8,
      totalCount: 10,
    };
  }
  componentDidMount() {
    this.getPaginate(this.state.currentPage, this.state.pageSize);
  }

  getPaginate = (pageIndex, pageSize) => {
    userProfileServices
      .getPagList(pageIndex, pageSize)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };

  onGetSuccess = (response) => {
    const userProfiles = response.item.pagedItems;

    _logger(response);
    this.setState((prevState) => {
      return {
        ...prevState,
        userProfiles,
        mappedUserProfiles: userProfiles.map(this.mapUserProfile),
      };
    });
  };
  mapUserProfile = (userProfile) => (
    <UserProfileCard
      userProfile={userProfile}
      key={userProfile.id}
      handleEdit={this.handleEdit}
    />
  );
  onGetError = (error) => {
    _logger(error);
  };

  // pagination , page change, search query --------------------------------

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
    userProfileServices
      .search(this.state.searchTerm, pageIndex - 1, pageSize)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };

  handleEdit = (profile) => {
    _logger(profile);
    this.props.history.push(`/userProfiles/${profile.id}/edit`, profile);
  };
  handleAdd = (profile) => {
    _logger(profile);
    this.props.history.push(`/userProfiles/create`);
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
    _logger("rendering user profile", this.props);
    return (
      <div className="container-fluid">
        <div className="row pt-4">
          <div className="col-md-6">
            <Pagination
              onChange={this.onChange}
              current={this.state.currentPage}
              total={this.state.totalCount}
              locale={localeInfo}
              pageSize={this.state.pageSize}
            />
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
        </div>

        <div className="row pt-4">{this.state.mappedUserProfiles}</div>
      </div>
    );
  }
}

UserProfiles.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
};
export default UserProfiles;
