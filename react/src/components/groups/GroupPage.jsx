import React from "react";
import "../../assets/css/groupPage.css";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import {
  getById,
  getAllUserFollowed,
  removeFollow,
  addFollow,
} from "../../services/groupService";
import debug from "sabio-debug";
import { withRouter } from "react-router-dom";
const _logger = debug.extend("App");

class GroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupInfo: {},
      userInfo: {},
      likeGroups: [],
    };
  }
  componentDidMount = () => {
    // Need to call this was to get the list of followers in group
    getById(this.props.location.state.id)
      .then(this.onGetByIdSuccess)
      .then(this.getListOfFollowedGroups)
      .catch(this.onGetByIdError);
  };

  // Success Handlers
  onGetByIdSuccess = (config) => {
    let infoCopy = config.item;
    this.setState((prevState) => {
      return {
        ...prevState,
        groupInfo: infoCopy,
      };
    });
    _logger(this.state.groupInfo, "group info");
  };
  onGetByIdError = (config) => {
    _logger(config, "group info");
  };

  getListOfFollowedGroups = () => {
    getAllUserFollowed()
      .then(this.addListOfFollowedGroupsToState)
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
  onAjaxCallError = (config) => {
    _logger(config);
  };
  // onGetUserByIdSuccess = (config) => {
  //   let userCopy = config.item;
  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       userInfo: userCopy,
  //     };
  //   });
  //   _logger(this.state.userInfo, "user info");
  // };
  isLiked = () => {
    let holder = false;
    if (this.state.likeGroups.includes(this.props.location.state.id) === true) {
      holder = true;
    }
    return holder;
  };
  handleFollow = (groupId) => {
    addFollow(groupId)
      .then(this.onFollowSuccess(groupId))
      .catch(this.onFollowCallError);
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

    this.setState((prevState) => {
      return {
        ...prevState,
        likeGroups: copyList,
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
  onFollowCallError = () => {
    toast.error(`Follow Failed!`, {
      closeOnClick: true,
      position: "top-center",
    });
  };
  handleRemove = (groupId) => {
    removeFollow(groupId)
      .then(this.onUnfollowSuccess(groupId))
      .catch(this.onUnfollowCallError);
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
  onUnfollowCallError = () => {
    toast.error(`Unfollow Failed!`, {
      closeOnClick: true,
      position: "top-center",
    });
  };
  render() {
    return (
      <React.Fragment>
        {/* Logged in User card Possibly */}
        <div className="border-widgets col-12 card container-fluid groupPageContainer">
          <div className="m-0 row">
            <div className="col-4 xs-width-100 groupPageDiv  ">
              <div className="custom-card default-user-card card">
                <div className="card-profile">
                  <img
                    src={this.props.currentUserProfile.avatarUrl}
                    className="rounded-circle"
                    alt=""
                  />
                </div>

                <div className="text-center profile-details">
                  <h4 className="m-b-15 m-t-5">
                    {`${this.props.currentUserProfile.firstName} ${this.props.currentUserProfile.lastName}`}
                  </h4>
                </div>
              </div>

              {/* Group Admin Card */}
              <div className="col-12 xs-width-100 col-xl-12 card">
                <div className="card-header">About Admins</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
              </div>
            </div>
            <div className="col-8 xs-width-100 groupPageDiv">
              {/* Basic Group Card */}
              <div className="card groupInfoCard">
                <div>
                  <img
                    className="card-img-top basicCardImg"
                    src={this.state.groupInfo.imageUrl}
                    alt="Card  cap"
                  />
                </div>{" "}
                <div className="card-body">
                  <h5 className="card-title">{this.state.groupInfo.name}</h5>
                  <p>
                    <i className="icofont icofont-company font-secondary align-self-center mr-3" />
                    Listed Group
                  </p>
                  <p>{this.state.groupInfo.totalFollowers} Followers</p>
                </div>
                <button
                  type="button"
                  className={`btn  btn-sm ${
                    this.isLiked()
                      ? "unfollowButton btn-light"
                      : "joinButton btn-primary"
                  }`}
                  onClick={() =>
                    this.isLiked()
                      ? this.handleRemove(this.state.groupInfo.id)
                      : this.handleFollow(this.state.groupInfo.id)
                  }
                >
                  {this.isLiked() ? "UnFollow" : "Follow"}
                </button>
              </div>
              {/* About Group Card */}
              <div className="card">
                <h3 className="card-header aboutGroupHeader">
                  About this group
                </h3>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{this.state.groupInfo.description}</p>

                    <footer className="blockquote-footer">
                      <cite title="Source Title">Admins</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
GroupPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      createdBy: PropTypes.number,
      dateCreated: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
      imageUrl: PropTypes.string,
      isActive: PropTypes.bool,
      isPrivate: PropTypes.bool,
      name: PropTypes.string,
    }),
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    name: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
  currentUserProfile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
  }),
};

export default withRouter(GroupPage);
