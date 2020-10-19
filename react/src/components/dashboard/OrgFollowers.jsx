import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/orgDashboard.css";

const OrgFollowerCard = ({ follower }) => {
  return (
    <React.Fragment>
      <tr key={follower.id}>
        <td className="">{`${follower.firstName} ${follower.lastName}`}</td>
        <td>
          <img className="planImg" alt="plan cover" src={follower.avatarUrl} />
        </td>
      </tr>
    </React.Fragment>
  );
};

OrgFollowerCard.propTypes = {
  follower: PropTypes.shape({
    avatarUrl: PropTypes.string,
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    userId: PropTypes.number,
  }),
};
export default OrgFollowerCard;
