import React, { Component } from "react";

// Import authService

class Language extends Component {
  render() {
    return (
      <li className="onhover-dropdown">
        <button className="txt-dark force-link-button">
          <img
            className="align-self-center pull-right mr-2"
            src={require("../../../assets/images/dashboard/translate.png")}
            alt="header-translate"
          />
        </button>
        <ul className="language-dropdown onhover-show-div p-20">
          <li>
            <button className=" force-link-button" data-lng="en">
              <i className="flag-icon flag-icon-ws" /> English
            </button>
          </li>
          <li>
            <button className=" force-link-button" data-lng="es">
              <i className="flag-icon flag-icon-va" /> Spanish
            </button>
          </li>
          <li>
            <button className=" force-link-button" data-lng="pt">
              <i className="flag-icon flag-icon-id" /> Portuguese
            </button>
          </li>
          <li>
            <button className=" force-link-button" data-lng="fr">
              <i className="flag-icon flag-icon-fr" /> French
            </button>
          </li>
        </ul>
      </li>
    );
  }
}

export default Language;
