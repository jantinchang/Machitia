import React, { Component } from "react";
import PropTypes from "prop-types";

class UserPanel extends Component {
  render() {
    return (
      <div className="sidebar-user text-center">
        <div>
          <img
            className="img-50 rounded-circle"
            src={
              this.props.currentUserProfile &&
              this.props.currentUserProfile.avatarUrl
            }
            alt="#"
          />
        </div>

        <h6 className="mt-3 f-12">
          {this.props.currentUserProfile &&
            this.props.currentUserProfile.firstName}
          {"     "}
          {this.props.currentUserProfile &&
            this.props.currentUserProfile.lastName}
        </h6>

        <a href="#">
          <i className="fa fa-circle text-success" /> Online
        </a>
      </div>
    );
  }
}

UserPanel.propTypes = {
  currentUserProfile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default UserPanel;
