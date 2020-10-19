import React, { Component } from "react";
import PropTypes from "prop-types";
import Logout from "../../pages/Logout";
import { Link } from "react-router-dom";

// Import authService
class UserMenu extends Component {
  redirect = () => {
    let targetId = this.props.currentUser.id;
    this.props.history.push("/userProfiles/" + targetId + "/edit");
  };

  render() {
    return (
      <li className="onhover-dropdown">
        <div className="media  align-items-center">
          <img
            className="align-self-center pull-right mr-2"
            src={require("../../../assets/images/dashboard/user.png")}
            alt="header-user"
          />
          <div className="media-body">
            <h6 className="m-0 txt-dark f-16">
              My Account
              <i className="fa fa-angle-down pull-right ml-2" />
            </h6>
          </div>
        </div>
        <ul className="profile-dropdown onhover-show-div p-20">
          <li>
            <Link onClick={this.redirect}>
              <i className="icon-user" />
              Edit Profile
            </Link>
          </li>
          <li>
            <Logout {...this.props} />
          </li>
        </ul>
      </li>
    );
  }
}
UserMenu.propTypes = {
  actions: PropTypes.shape({ logout: PropTypes.func.isRequired }),
  history: PropTypes.shape({ push: PropTypes.func }),
  currentUser: PropTypes.shape({ id: PropTypes.number }),
};
export default UserMenu;
