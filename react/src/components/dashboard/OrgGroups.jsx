import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/orgDashboard.css";

const OrgGroupCard = ({ group, onGroupClick }) => {
  const groupClicked = () => {
    onGroupClick(group);
  };

  return (
    <React.Fragment>
      <tr onClick={groupClicked} key={group.id}>
        <td>{group.name}</td>
        <td className=" ">
          <img className="planImg" alt="plan cover" src={group.imageUrl} />
        </td>
      </tr>
    </React.Fragment>
  );
};

OrgGroupCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    isActive: PropTypes.bool,
    isPrivate: PropTypes.bool,
    createdBy: PropTypes.number,
    dateCreated: PropTypes.number,
  }),

  onGroupClick: PropTypes.func,
};
export default OrgGroupCard;
