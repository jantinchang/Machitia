import React, { Component } from "react";

// Import authService

class Notification extends Component {
  render() {
    return (
      <li className="onhover-dropdown">
        <a className="txt-dark">
          <img
            className="align-self-center pull-right mr-2"
            src={require("../../../assets/images/dashboard/notification.png")}
            alt="header-notification"
          />
          <span className="badge badge-pill badge-primary notification">3</span>
        </a>
        <ul className="notification-dropdown onhover-show-div">
          <li>
            Notification{" "}
            <span className="badge badge-pill badge-secondary text-white text-uppercase pull-right">
              3 New
            </span>
          </li>
          <li>
            <div className="media">
              <i className="align-self-center notification-icon icofont icofont-shopping-cart bg-primary" />
              <div className="media-body">
                <h6 className="mt-0">Your order ready for Ship..!</h6>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetuer elit.
                </p>
                <span>
                  <i className="icofont icofont-clock-time p-r-5" />Just Now
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="media">
              <i className="align-self-center notification-icon icofont icofont-download-alt bg-success" />
              <div className="media-body">
                <h6 className="mt-0 txt-success">Download Complete</h6>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetuer elit.
                </p>
                <span>
                  <i className="icofont icofont-clock-time p-r-5" />5 minutes
                  ago
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="media">
              <i className="align-self-center notification-icon icofont icofont-recycle bg-danger" />
              <div className="media-body">
                <h6 className="mt-0 txt-danger">250 MB trush files</h6>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetuer elit.
                </p>
                <span>
                  <i className="icofont icofont-clock-time p-r-5" />25 minutes
                  ago
                </span>
              </div>
            </div>
          </li>
          <li className="text-center">
            You have Check <a href="#">all</a> notification{" "}
          </li>
        </ul>
      </li>
    );
  }
}

export default Notification;
