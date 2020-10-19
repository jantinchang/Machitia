import React from "react";
import PropTypes from "prop-types";
import "./../../assets/css/userProfile.css";

const UserProfileCard = ({ userProfile }) => {
  return (
    <React.Fragment>
      <div className="col-lg-3 col-md-3 col-sm-6 mb-grid-gutter">
        <div
          className="card card-curved-body card-hover border-0 box-shadow mx-auto"
          style={{ maxWidth: "21rem" }}
        >
          <div className="card-img-top card-img-gradient">
            <img src={userProfile.avatarUrl} alt="Sarah Cole" />
          </div>
          <div className="card-body text-center">
            <h3 className="h6 card-title mb-2">
              {userProfile.firstName} {userProfile.mi} {userProfile.lastName}
            </h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

UserProfileCard.propTypes = {
  userProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default UserProfileCard;
