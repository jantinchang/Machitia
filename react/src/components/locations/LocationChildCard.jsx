import logger from "sabio-debug";
import PropTypes from "prop-types";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const googleMapApiKey = process.env.REACT_APP_GOOGLE_APIKEY;

const _logger = logger.extend("LocationChildCard");

const LocationChildCard = ({ location, handleEdit }) => {
  _logger(handleEdit);
  const onEditClick = () => {
    handleEdit(location);
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <React.Fragment>
      <div className="card col-4 mb-5">
        <LoadScript googleMapsApiKey={googleMapApiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: location.latitude, lng: location.longitude }}
            zoom={10}
          >
            <Marker
              position={{ lat: location.latitude, lng: location.longitude }}
            />
          </GoogleMap>
        </LoadScript>

        <div className="card-body">
          <h5 className="card-title font-weight-bold font-size-lg text-center">
            {location.locationTypeName}
          </h5>
          <p className="text-center">{`${location.lineOne} ${
            location.lineTwo ? location.lineTwo : ""
          }`}</p>
          <p className="text-center">
            {`${location.city}, ${location.stateName},
            ${location.zip}`}
          </p>
          <button className="btn btn-sm">
            <i className="fa fa-pencil-square-o" onClick={onEditClick}></i>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

LocationChildCard.propTypes = {
  location: PropTypes.shape({
    locationTypeName: PropTypes.string,
    lineOne: PropTypes.string,
    lineTwo: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    stateName: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default LocationChildCard;
