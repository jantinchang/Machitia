import React, { Component } from "react";
import PropTypes from "prop-types";

class Breadcrumb extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6">
              <h3>
                {this.props.title}
                <small>Universal Admin panel</small>
              </h3>
            </div>
            <div className="col-lg-6">
              <ol className="breadcrumb pull-right">
                <li className="breadcrumb-item">
                  <a href="#!">
                    <i className="fa fa-home" />
                  </a>
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
Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
};
export default Breadcrumb;
