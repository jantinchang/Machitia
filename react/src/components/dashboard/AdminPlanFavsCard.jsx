//import { Subject } from "@material-ui/icons";
import React from "react";
// import logger from "sabio-debug";
import PropTypes from "prop-types";
import "./../../assets/css/adminDash.css";
// const _logger = logger.extend("AdminPlanFavCard");

const AdminPlanFavCard = ({ planFavorites, handleClick, showPlan }) => {
  handleClick = () => {
    showPlan(planFavorites);
  };

  return (
    <React.Fragment>
      <tr>
        <td>{planFavorites.title}</td>
        <td className="font-secondary">
          <img
            src={planFavorites.coverImageUrl}
            className="ad-img-card"
            onClick={handleClick}
            alt={""}
          />
        </td>
      </tr>
    </React.Fragment>
  );
};
AdminPlanFavCard.propTypes = {
  planFavorites: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subject: PropTypes.string,
    overview: PropTypes.string,
    duration: PropTypes.string,
    coverImageUrl: PropTypes.string,
    createdBy: PropTypes.number,
  }),
  handleClick: PropTypes.func,
  showPlan: PropTypes.func,
};

export default AdminPlanFavCard;
