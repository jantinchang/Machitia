import React from "react";
// import logger from "sabio-debug";
import PropTypes from "prop-types";
import "./../../assets/css/adminDash.css";

// const _logger = logger.extend("AdminPlanFavCard");

const AdminFollowedGroupsCard = ({
  followedGroups,
  handleClick,
  showGroup,
}) => {
  handleClick = () => {
    showGroup(followedGroups);
  };

  return (
    <React.Fragment>
      <tr>
        <td>{followedGroups.name}</td>
        <td className="font-secondary">
          <img
            src={followedGroups.imageUrl}
            className="ad-img-card"
            onClick={handleClick}
            alt={""}
          />
        </td>
      </tr>
    </React.Fragment>
  );
};
AdminFollowedGroupsCard.propTypes = {
  followedGroups: PropTypes.shape({
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    isActive: PropTypes.number,
    isPrivate: PropTypes.number,
    createdBy: PropTypes.number,
  }),
  handleClick: PropTypes.func,
  showGroup: PropTypes.func.isRequired,
};

export default AdminFollowedGroupsCard;
