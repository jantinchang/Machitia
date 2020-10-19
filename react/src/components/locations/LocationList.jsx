import React from "react";
import LocationCard from "./LocationChildCard";
import * as locationService from "./../../services/locationService";
import logger from "sabio-debug";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
// import "rc-pagination/assets/index.less";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";

const _logger = logger.extend("Locations");
class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      selectedLocation: null,
      mappedLocations: [],
      currentPage: 1,
      totalCount: 6,
      pageSize: 6,
    };
  }
  componentDidMount() {
    this.paginate(this.state.currentPage - 1, this.state.pageSize);
  }

  paginate = (pageIndex, pageSize) => {
    locationService
      .paginate(pageIndex, pageSize)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };

  onChange = (page) => {
    this.setState({ currentPage: page }, () =>
      this.paginate(this.state.currentPage - 1, this.state.pageSize)
    );
  };

  updateLocationsList = (list) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        groups: list.map(this.mapGroup),
      };
    });
  };

  onGetSuccess = (config) => {
    const locations = config.item.pagedItems;
    let totalCount = config.item.totalCount;
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedLocations: locations.map(this.mapLocation),
        totalCount,
      };
    });
  };
  onGetError = (error) => {
    _logger(error);
  };

  mapLocation = (location) => (
    <LocationCard
      location={location}
      key={location.id}
      handleEdit={this.handleEdit}
      handleDelete={this.handleDelete}
    />
  );

  handleEdit = (profile) => {
    this.props.history.push(`/locations/${profile.id}/edit`, profile);
  };
  // handleDelete = (payLoad) => {
  //   locationService
  //     .remove(payLoad.id)
  //     .then(this.onDeleteSuccess)
  //     .catch(this.hanleDeleteError);
  // };

  handleError = (error) => {
    _logger(error);
    this.setState((prevState) => {
      return {
        ...prevState,
        location: [],
        mappedLocations: [],
        currentPage: 1,
        totalCount: 10,
      };
    });
  };

  onDeleteSuccess = (id) => {
    toast.success("Delete Successful!", {
      closeOnClick: true,
      position: "top-center",
    });
    this.setState((prevState) => {
      const indexofLocation = prevState.mappedLocations.findIndex(
        (location) => parseInt(location.key) === id
      );
      let mappedLocations = [...prevState.mappedLocations];
      if (indexofLocation >= 0) {
        mappedLocations.splice(indexofLocation, 1);
      }
      return {
        mappedLocations,
      };
    }, this.stateChanged);
  };

  routeToEdit = (location) => {
    this.props.history.push(`/locations/${location.id}/edit`, location);
  };

  render() {
    return (
      <React.Fragment>
        <div className="panel-heading">
          <h1>Locations</h1>
        </div>
        <div className="row">{this.state.mappedLocations}</div>
        <div className="groupPagination">
          <Pagination
            pageSize={this.state.pageSize}
            onChange={this.onChange}
            current={this.state.currentPage}
            total={this.state.totalCount}
            locale={localeInfo}
          />
        </div>
      </React.Fragment>
    );
  }
}
LocationList.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
};
export default LocationList;
