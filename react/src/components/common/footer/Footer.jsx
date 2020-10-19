import React, { Component } from "react";
import logger from "sabio-debug";
const _logger = logger.extend("Footer");
class Footer extends Component {
  render() {
    _logger("rendering footer ");
    return (
      <div>
        <footer className="main-footer">
          <p>2020 © Sabio </p>
          <div className="pull-right hidden-xs">
            <ul>
              <li>
                <a href="/aboutUs">About</a>
              </li>
              <li>
                <a href="/contactus">Contact Us</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
