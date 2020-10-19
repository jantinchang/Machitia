import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class AboutCard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6">
              <h3>{this.props.title}</h3>
            </div>
            <div className="col-lg-6">
              <ol className="breadcrumb pull-right">
                <li className="breadcrumb-item">
                  <Link to={"/"}>
                    <i className="fa fa-home" />
                  </Link>
                </li>
                <li className="breadcrumb-item">{this.props.parent}</li>
                <li className="breadcrumb-item active">{this.props.title}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AboutCard.propTypes = {
  title: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
};
export default AboutCard;
