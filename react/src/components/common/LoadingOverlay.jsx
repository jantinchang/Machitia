import React, { Component } from "react";

class LoadingOverlay extends Component {
  state = {
    style: {}
  };
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader bg-white">
          <div className="line" />
          <div className="line" />
          <div className="line" />
          <div className="line" />
          <h4>
            Developers <span>&#x263A;</span>
          </h4>
        </div>
      </div>
    );
  }
}

export default LoadingOverlay;
