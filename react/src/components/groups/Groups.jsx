import React from "react";
import "../../assets/css/groups.css";
import GroupsCard from "./GroupsCard";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import GroupModal from "./GroupModal";
import {
  getPaginated,
  search,
  addFollow,
  removeFollow,
  getAllUserFollowed,
} from "../../services/groupService";
import { toast } from "react-toastify";
import debug from "sabio-debug";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
const _logger = debug.extend("App");

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      mappedGroups: [],
      groupData: {},
      currentPage: 0,
      amountOfGroups: 8,
      totalCount: 10,
      searchText: "",
      likeGroups: [],
      tracker: 0,
      isOpen: false,
      doesCreatedByMatch: false,
    };
  }

  componentDidMount = () => {
    this.getListOfFollowedGroups();
  };
  paginateControl = (page) => {
    getPaginated(page, this.state.amountOfGroups)
      .then(this.onGroupSuccess)
      .catch(this.onLaunchListError);
  };
  onLaunchListError = (error) => {
    _logger(error);
    this.setState((prevState) => {
      return {
        ...prevState,
        groups: [],
        mappedGroups: [],
        currentPage: 0,
        pageSize: 3,
        totalCount: 10,
        count: 0,
      };
    });
  };
  searchQuery = (page) => {
    search(page, this.state.amountOfGroups, this.state.searchText)
      .then(this.onGroupSuccess)
      .catch(this.onLaunchListError);
  };

  onChange = (page) => {
    if (page === 0) {
      page = 1;
    }
    this.setState({ currentPage: page-- }, () =>
      this.alternateListGraber(page)
    );
  };

  handleSearch = (e) => {
    let searchTerm = e.target.value;

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: 1,
          searchText: searchTerm,
        };
      },

      () => this.onChange(this.state.currentPage)
    );
  };
  alternateListGraber = (page) => {
    return this.state.searchText.length > 0
      ? this.searchQuery(page)
      : this.paginateControl(page);
  };
  onGroupSuccess = (config) => {
    let initialGroups = config.item.pagedItems;
    this.setState((prevState) => {
      let totalCount = config.item.totalCount;
      let groups = { ...prevState.groups };
      const newGroups = initialGroups;
      groups = newGroups;
      return {
        ...prevState,
        mappedGroups: groups.map(this.mapGroup),
        totalCount,
      };
    }, this.stateChanged);
  };

  mapGroup = (group) => (
    <GroupsCard
      userInfo={this.props}
      group={group}
      key={group.id}
      handleEdit={this.handleEdit}
      handleFollow={this.onFollow}
      handleRemove={this.onUnFollow}
      likedGroups={this.state.likeGroups}
      handleDetails={this.handleDetails}
    />
  );
  onAddClicked = () => {
    this.props.history.push(`/groups/create`);
  };
  handleEdit = (group) => {
    this.props.history.push(`/groups/${group.id}/edit`, group);
  };

  // Follow Group code
  onFollow = (groupId) => {
    addFollow(groupId)
      .then(this.onFollowSuccess(groupId))
      .catch(this.onFollowCallError);
  };
  onUnFollow = (groupId) => {
    removeFollow(groupId)
      .then(this.onUnfollowSuccess(groupId))
      .catch(this.onUnfollowCallError);
  };
  getListOfFollowedGroups = () => {
    getAllUserFollowed()
      .then(this.addListOfFollowedGroupsToState)
      .then(() => this.paginateControl(this.state.currentPage))
      .catch(this.onAjaxCallError);
  };
  addListOfFollowedGroupsToState = (config) => {
    var likeGroups = config.items;

    this.setState((prevState) => {
      return {
        ...prevState,
        likeGroups,
      };
    });
  };
  onFollowSuccess = (id) => {
    this.alterList(id, this.state.likeGroups, true);

    toast.success("Group Followed!", {
      closeOnClick: true,
      position: "top-center",
    });
  };
  onUnfollowSuccess = (id) => {
    var placement = null;

    placement = this.state.likeGroups.findIndex(function (element) {
      return element === id;
    });

    this.alterList(placement, this.state.likeGroups, false);

    toast.success("Group Unfollowed!", {
      closeOnClick: true,
      position: "top-center",
    });
  };
  alterList = (numberHolder, list, booleanHolder) => {
    var copyList;
    if (booleanHolder === false) {
      copyList = list;
      copyList.splice(numberHolder, 1);
    } else {
      copyList = list;
      copyList.push(numberHolder);
    }

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          likeGroups: copyList,
        };
      },

      this.onChange(this.state.currentPage)
    );
  };

  onUnfollowCallError = () => {
    toast.error(`Unfollow Failed!`, {
      closeOnClick: true,
      position: "top-center",
    });
  };
  onFollowCallError = () => {
    toast.error(`Follow Failed!`, {
      closeOnClick: true,
      position: "top-center",
    });
  };
  onAjaxCallError = (config) => {
    _logger(config);
  };
  handleDetails = (Group) => {
    this.props.history.push(`/groups/${Group.id}`, Group);
  };
  // toggleModal = () => {
  //   this.setState((prevState) => {
  //     return {
  //       isOpen: !prevState.isOpen,
  //     };
  //   });
  // };
  // showModalOnClickOfGroupCard = (groupData) => {
  //   _logger(groupData, "show modal");
  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       groupData,
  //     };
  //   });
  //   this.toggleModal();
  // };

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
      () => this.onLaunchListError()
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12">
          {this.state.isOpen ? (
            <GroupModal
              isOpen={this.state.isOpen}
              toggleModal={this.toggleModal}
              group={this.state.groupData}
            />
          ) : null}

          <h2 className="text-center groupHeader">Groups</h2>
        </div>
        <div>
          <form className="form-inline search-form">
            <div className="form-group">
              <div>
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  onChange={this.handleSearch}
                  value={this.state.searchText}
                  className="form-control-plaintext searchBox"
                  placeholder="Search Groups"
                />
              </div>
              <div className="groupPagination">
                <Pagination
                  defaultPageSize={this.state.amountOfGroups}
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
            </div>
          </form>
          {this.props.currentUser.roles[0] === "Organization" ? (
            <button
              type="button"
              className="btn btn-primary btn-sm float-right groupAddButton"
              onClick={this.onAddClicked}
            >
              Add New Group
            </button>
          ) : null}
        </div>
        {this.state.mappedGroups.length > 0 ? (
          <div className="container-fluid">
            <div className="row mt-4">{this.state.mappedGroups}</div>
          </div>
        ) : (
          <h3 className="noMatch">
            Zero Groups matching Search {this.state.searchText}
          </h3>
        )}
      </React.Fragment>
    );
  }
}
Groups.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),

  currentUser: PropTypes.shape({
    id: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    name: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default withRouter(Groups);
