import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/independent-user.css";

const PlansFavoredCard = ({ plan, handlePlanClick, handleClick }) => {
  //handleclick
  handleClick = () => {
    handlePlanClick(plan);
  };

  return (
    <tr>
      <td>{plan.subject}</td>
      <td className="font-secondary">
        <img
          className="table-img"
          src={plan.coverImageUrl}
          onClick={handleClick}
          alt="404"
        />
      </td>
    </tr>
  );
};

PlansFavoredCard.propTypes = {
  plan: PropTypes.shape({
    title: PropTypes.string,
    subject: PropTypes.string,
    coverImageUrl: PropTypes.string,
  }),
  handleClick: PropTypes.func,
  handlePlanClick: PropTypes.func,
};
export default PlansFavoredCard;
