import React, { Component } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import CountUp from "react-countup";

class BoxRowOne extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-dashboard">
                <div className="media">
                  <img
                    className="mr-3"
                    src={require("../../../assets/images/dashboard-icons/document.png")}
                    alt="Generic placeholder "
                  />
                  <div className="media-body text-right">
                    <h4 className="mt-0">
                      <CountUp className="font-primary" end={2569} />
                    </h4>
                    <span>New projects</span>
                  </div>
                </div>
                <div className="dashboard-chart-container-small">
                  <Sparklines
                    data={[
                      25,
                      50,
                      30,
                      40,
                      60,
                      21,
                      20,
                      10,
                      4,
                      13,
                      0,
                      10,
                      30,
                      40,
                      10,
                      15,
                      20
                    ]}
                  >
                    <SparklinesLine color="#bca0ee" />
                  </Sparklines>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-dashboard">
                <div className="media">
                  <img
                    className="mr-3"
                    src={require("../../../assets/images/dashboard-icons/operator.png")}
                    alt="Generic placeholder "
                  />
                  <div className="media-body text-right">
                    <h4 className="mt-0 ">
                      <CountUp className="font-secondary" end={346} />
                    </h4>
                    <span>New Clients</span>
                  </div>
                </div>
                <div className="dashboard-chart-container-small">
                  <Sparklines
                    data={[
                      5,
                      10,
                      20,
                      14,
                      17,
                      21,
                      20,
                      10,
                      4,
                      13,
                      0,
                      10,
                      30,
                      40,
                      10,
                      15,
                      20
                    ]}
                  >
                    <SparklinesLine color="#38d3e7" />
                  </Sparklines>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-dashboard">
                <div className="media">
                  <img
                    className="mr-3"
                    src={require("../../../assets/images/dashboard-icons/chat.png")}
                    alt="Generic placeholder "
                  />
                  <div className="media-body text-right">
                    <h4 className="mt-0 counter font-success">
                      <CountUp className="font-success" end={46} />
                    </h4>
                    <span>Message</span>
                  </div>
                </div>
                <div className="dashboard-chart-container-small">
                  <Sparklines
                    data={[
                      25,
                      50,
                      30,
                      40,
                      60,
                      21,
                      20,
                      10,
                      4,
                      13,
                      0,
                      10,
                      30,
                      40,
                      10,
                      15,
                      20
                    ]}
                  >
                    <SparklinesLine color="#00c292" />
                  </Sparklines>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-dashboard">
                <div className="media">
                  <img
                    className="mr-3"
                    src={require("../../../assets/images/dashboard-icons/like.png")}
                    alt="Generic placeholder "
                  />
                  <div className="media-body text-right">
                    <h4 className="mt-0">
                      <CountUp className="font-info" end={9563} />
                    </h4>
                    <span>New Likes</span>
                  </div>
                </div>
                <div className="dashboard-chart-container-small">
                  <Sparklines
                    data={[
                      5,
                      10,
                      20,
                      14,
                      17,
                      21,
                      20,
                      10,
                      4,
                      13,
                      0,
                      10,
                      30,
                      40,
                      10,
                      15,
                      20
                    ]}
                  >
                    <SparklinesLine color="#59a6fe" />
                  </Sparklines>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoxRowOne;
