import React, { Component } from "react";

class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = { style: {} };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ style: { display: "none" } });
      }.bind(this),
      1000
    );
  }

  render() {
    let style = this.state.style;
    return (
      <div>
        <div className="loader-wrapper" style={style}>
          <div className="loader bg-white">
            <div className="line" />
            <div className="line" />
            <div className="line" />
            <div className="line" />
            <h4>
              Have a great day at work today <span>&#x263A;</span>
            </h4>
          </div>
        </div>
        {/*Loader ends */}
        {/*Maintenance start */}
        <div className="error-wrapper">
          <div className="container">
            <ul className="maintenance-icons">
              <li>
                <i className="fa fa-cog" />
              </li>
              <li>
                <i className="fa fa-cog" />
              </li>
              <li>
                <i className="fa fa-cog" />
              </li>
            </ul>
            <div className="maintenance-heading">
              <img
                src={require("../..//assets/images/cloud-bg-1.png")}
                className="cloud-first"
                alt=""
              />
              <h2 className="headline">MAINTENANCE</h2>
              <img
                src={require("../../assets/images/cloud-bg-2.png")}
                className="cloud-second"
                alt=""
              />
            </div>
            <h4 className="sub-content">
              Our Site is Currently under maintenance We will be back Shortly
              <br /> Thank You For Patience
            </h4>
            <div>
              <a
                href="/dashboard/default"
                className="btn btn-info-gradien btn-lg text-light"
              >
                BACK TO HOME PAGE
              </a>
            </div>
          </div>
        </div>
        {/* Maintenance end */}
      </div>
    );
  }
}

export default Maintenance;
