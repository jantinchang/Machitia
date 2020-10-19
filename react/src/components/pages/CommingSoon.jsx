import React, { Component } from "react";
import Countdown from "react-countdown-now";

class ComingSoon extends Component {
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

    const Completionist = () => <span>You are good to go!</span>;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return (
          <div className="countdown">
            <ul>
              <li>
                <span id="days" className="time digits">
                  {days}
                </span>
                <span className="title">days</span>
              </li>
              <li>
                <span id="hours" className="time digits">
                  {hours}
                </span>
                <span className="title">Hours</span>
              </li>
              <li>
                <span id="minutes" className="time digits">
                  {minutes}
                </span>
                <span className="title">Minutes</span>
              </li>
              <li>
                <span id="seconds" className="time digits">
                  {seconds}
                </span>
                <span className="title">Seconds</span>
              </li>
            </ul>
          </div>
        );
      }
    };

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var coundown = new Date(year, month, day + 10).getTime();

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
          <div className="container-fluid p-0">
            <div className="comingsoon auth-bg-video">
              <video
                poster={require("../../assets/images/auth-bg.jpg")}
                className="bgvideo-comingsoon"
                id="bgvid"
                autoPlay
                muted
                loop
              >
                <source
                  src={require("../../assets/video/auth-bg.mp4")}
                  type="video/mp4"
                />
              </video>
              <div className="comingsoon-inner text-center">
                <img
                  src={require("../../assets/images/coming-soon-Logo.png")}
                  alt=""
                />
                <h5>WE ARE COMING SOON</h5>

                <Countdown date={coundown} renderer={renderer} />

                <div className="coming-soon-bottom-link">
                  <button className="force-link-button ">
                    www.Universal.com
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*page-wrapper Ends*/}
      </div>
    );
  }
}

export default ComingSoon;
