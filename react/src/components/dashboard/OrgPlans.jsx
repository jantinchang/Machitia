import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/orgDashboard.css";

const OrgPlanCard = ({ plan, sendToPlanInfoCard }) => {
  const planClicked = () => {
    sendToPlanInfoCard(plan);
  };
  return (
    <React.Fragment>
      <tr onClick={planClicked} key={plan.id}>
        <td className="">{plan.title}</td>
        <td>
          <img
            className="planImg"
            alt="plan cover"
            src={
              plan.coverImageUrl ||
              "https://codelabs.developers.google.com/codelabs/kotlin-android-training-internet-images/img/467c213c859e1904.png"
            }
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

OrgPlanCard.propTypes = {
  plan: PropTypes.shape({
    coverImageUrl: PropTypes.string,
    createdBy: PropTypes.number,
    dateCreated: PropTypes.string,
    dateModified: PropTypes.string,
    duration: PropTypes.string,
    id: PropTypes.number,
    modifiedBy: PropTypes.number,
    overview: PropTypes.string,
    planTypeId: PropTypes.number,
    subject: PropTypes.string,
    title: PropTypes.string,
  }),

  sendToPlanInfoCard: PropTypes.func,
};
export default OrgPlanCard;
