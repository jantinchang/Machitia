import React from "react";
import PropTypes from "prop-types";

const GroupsFollowCard = ({ group, handleClick, handleGroupClick }) => {
  //handleclick
  handleClick = () => {
    handleGroupClick(group);
  };

  return (
    <tr>
      <td>{group.name}</td>
      <td className="font-secondary">
        <img
          className="table-img"
          src={group.imageUrl}
          alt="404"
          onClick={handleClick}
        />
      </td>
    </tr>
  );
};

GroupsFollowCard.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  handleClick: PropTypes.func,
  handleGroupClick: PropTypes.func,
};

export default GroupsFollowCard;
