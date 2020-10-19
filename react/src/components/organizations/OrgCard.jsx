import React from "react";
// import { Card, CardText, CardBody, CardImg, CardHeader } from "reactstrap";
import PropTypes from "prop-types";
import Logger from "sabio-debug";
import "../../assets/css/organizations.css";
const _logger = Logger.extend("OrgCard");

const OrgCard = ({
  Organization,
  editOrganization,
  currentUser,
  viewDetails,
}) => {
  //OPERATIONAL FUNCTIONS
  _logger(Organization, editOrganization);

  const handleEdit = () => {
    editOrganization(Organization);
  };

  const onViewDetails = () => {
    viewDetails(Organization);
  };
  return (
    <div className="col-md-4 col-sm-12">
      <div className="card mainCard">
        <div className="container text-center">
          <img
            className="img-tumb orgimg"
            src={
              Organization.logo ||
              "https://sabio-training.s3-us-west-2.amazonaws.com/intern_02599708-3f27-4adc-a35b-be642fdede28GREEN-SMILE-00.png"
            }
            alt="avatar"
          />
        </div>
        <div className="card-body text-center">
          <div>
            <h4 className="card-title font-weight-bold mb-2">
              {Organization.name}{" "}
            </h4>
            <p className="card-text">{Organization.headline}</p>
            {Organization.createdBy.userId === currentUser.id &&
              currentUser.isLoggedIn && (
                <span onClick={handleEdit}>
                  <i className="fa fa-pencil-square fa-2x float-right"></i>
                </span>
              )}
            <button
              type="button"
              className="btn-pill btn btn-secondary btn-sm float-right"
              onClick={onViewDetails}
            >
              <i className="fa fa-info"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

OrgCard.propTypes = {
  Organization: PropTypes.shape({
    id: PropTypes.number,
    OrganizationTypeId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.string,
    headline: PropTypes.string,
    locationId: PropTypes.number,
    phone: PropTypes.string,
    siteUrl: PropTypes.string,
    createdBy: PropTypes.shape({
      userId: PropTypes.number,
    }),
  }).isRequired,
  editOrganization: PropTypes.func,
  onViewDetails: PropTypes.func,
  viewDetails: PropTypes.func,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
  }),
};

export default OrgCard;
