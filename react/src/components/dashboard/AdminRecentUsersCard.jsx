import React from "react";
import PropTypes from "prop-types";
import "./../../assets/css/adminDash.css";

const AdminRecentUsersCard = ({ recentUsers }) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          {recentUsers.firstName} {recentUsers.lastName}
        </td>
        <td className="font-secondary">
          <img src={recentUsers.avatarUrl} className="ad-img-card" alt={""} />
        </td>
      </tr>
    </React.Fragment>
  );
};
AdminRecentUsersCard.propTypes = {
  recentUsers: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.number,
    avatarUrl: PropTypes.number,
  }),
};

export default AdminRecentUsersCard;
