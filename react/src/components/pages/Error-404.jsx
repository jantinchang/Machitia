import React, { Component } from "react";

class Error404 extends Component {
  constructor(props) {
    super(props);
    this.state = { style: {} };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ style: { display: "none" } });
      }.bind(this),
      2000
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

        {/*page-wrapper Start*/}
        <div className="page-wrapper">
          {/*error-400 start*/}
          <div className="error-wrapper">
            <div className="container">
              <img
                src={require("../../assets/images/sad.png")}
                className="img-100"
                alt=""
              />
              <div className="error-heading">
                <img
                  src={require("../../assets/images/cloud-bg-1.png")}
                  className="cloud-first"
                  alt=""
                />
                <h2 className="headline font-danger">404</h2>
                <img
                  src={require("../../assets/images/cloud-bg-2.png")}
                  className="cloud-second"
                  alt=""
                />
              </div>
              <div className="col-md-8 offset-md-2">
                <p className="sub-content">
                  The page you are attempting to reach is currently not
                  available. This may be because the page does not exist or has
                  been moved.
                </p>
              </div>
              <div className="">
                <a
                  href="/dashboard/default"
                  className="btn btn-danger-gradien btn-lg"
                >
                  BACK TO HOME PAGE
                </a>
              </div>
            </div>
          </div>
          {/*error-400 end*/}
        </div>
        {/*page-wrapper Ends*/}
      </div>
    );
  }
}

export default Error404;
