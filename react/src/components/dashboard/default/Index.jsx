import React, { Component } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import DonutChart from "react-donut-chart";

import Slider from "react-slick";
// Import custom components
import Breadcrumb from "../../common/BreadCrumb";
import BoxRowOne from "./BoxRowOne";

import CanvasJSReact from "../../../assets/canvas/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Default extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "grouped",
      legendPosition: "top-left",
      interpolate: "linear",
      xLabel: "M",
      yLabel: "GGGGGGGGGG",
      hidePoints: false,
      hideLines: false,
      yMin: null,
      yMax: null,
      xMax: null,
      xMin: null
    };
  }

  // onGroupedHover(point) {
  //     const formatted = d3.time.format("%b %d")(d3.time.format("%Y-%m-%d").parse(point.x));
  //     return `<b>Date: </b>${formatted}<br /><b>Value: </b>${point.y}`;
  // }
  onScatterHover(point) {
    return `<b>Date: </b>${point.x}<br /><b>Value: </b>${point.y}`;
  }

  render() {
    const settings = {
      className: "center",
      centerMode: true,
      dots: false,
      infinite: true,
      speed: 500,
      centerPadding: "5px",
      slidesToShow: 1,
      slidesToScroll: 1
    };
    CanvasJS.addColorSet("greenShades", [
      //colorSet Array

      "#00c292",
      "#26c6da",
      "#ab8ce4"
    ]);

    const options = {
      animationEnabled: false,
      axisX: {},
      axisY: {
        prefix: "$",
        includeZero: false
      },
      theme: "light2",
      colorSet: "greenShades",
      height: 497,
      data: [
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "Electronics",
          type: "spline",
          dataPoints: [
            { x: 0, y: 10 },
            { x: 10, y: 20 },
            { x: 20, y: 40 },
            { x: 30, y: 30 },
            { x: 40, y: 5 },
            { x: 50, y: 20 },
            { x: 60, y: 10 },
            { x: 70, y: 30 },
            { x: 80, y: 10 }
          ]
        },
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "Clothes",
          type: "spline",
          dataPoints: [
            { x: 0, y: 20 },
            { x: 10, y: 40 },
            { x: 20, y: 10 },
            { x: 30, y: 20 },
            { x: 40, y: 40 },
            { x: 50, y: 30 },
            { x: 60, y: 40 },
            { x: 70, y: 10 },
            { x: 80, y: 20 }
          ]
        },
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "Toys",
          type: "spline",
          dataPoints: [
            { x: 0, y: 10 },
            { x: 10, y: 60 },
            { x: 20, y: 10 },
            { x: 30, y: 40 },
            { x: 40, y: 30 },
            { x: 50, y: 80 },
            { x: 60, y: 30 },
            { x: 70, y: 20 },
            { x: 80, y: 90 }
          ]
        }
      ]
    };

    return (
      <div>
        {/*Container-fluid starts*/}
        <Breadcrumb title="Default" parent="Dashboard" />
        {/*Container-fluid Ends*/}

        {/*Container-fluid starts*/}
        <div className="container-fluid">
          <BoxRowOne />
          <div className="row">
            <div className="col-xl-8 col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h5>Sales Overview</h5>
                  <span>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text.
                  </span>
                </div>
                <div className="card-body">
                  <div className="dashboard-chart-container sales-overview-chart">
                    <Sparklines
                      data={[
                        24,
                        27,
                        8,
                        18,
                        12,
                        8,
                        40,
                        33,
                        37,
                        25,
                        22,
                        18,
                        25,
                        2,
                        4,
                        15,
                        10,
                        11,
                        15,
                        14,
                        6,
                        8,
                        6,
                        8,
                        30,
                        25
                      ]}
                    >
                      <SparklinesLine color="#bca0ee" />
                    </Sparklines>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card default-widget-count">
                <div className="card-body">
                  <div className="media">
                    <div className="mr-3 left b-primary">
                      <div className="bg bg-primary" />
                      <i className="icon-user" />
                    </div>
                    <div className="media-body align-self-center">
                      <h4 className="mt-0 counter">2560146</h4>
                      <span>Happy Clients </span>
                      <i className="icon-user icon-bg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card default-widget-count">
                <div className="card-body">
                  <div className="media">
                    <div className="mr-3 left b-secondary">
                      <div className="bg bg-secondary" />
                      <i className="icon-package" />
                    </div>
                    <div className="media-body align-self-center">
                      <h4 className="mt-0 counter">95314</h4>
                      <span>Order Complate </span>
                      <i className="icon-package icon-bg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card default-widget-count">
                <div className="card-body">
                  <div className="media">
                    <div className="mr-3 left b-success">
                      <div className="bg bg-success" />
                      <i className="icon-money" />
                    </div>
                    <div className="media-body align-self-center">
                      <h4 className="mt-0 counter">1035976</h4>
                      <span>Early income </span>
                      <i className="icon-money icon-bg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Monthly Visiter</h5>
                </div>
                <div className="card-body donut-chart donut-chart-default">
                  <DonutChart
                    className="flot-chart-placeholder"
                    data={[
                      {
                        value: 30,
                        label: "USA"
                      },
                      {
                        value: 50,
                        label: "India"
                      },
                      {
                        value: 10,
                        label: "Canada"
                      },
                      {
                        value: 10,
                        label: "UK"
                      }
                    ]}
                    colors={["#c1ddfd", "#ffc1cc", "#e1d5f7", "#afeef5"]}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Daily Visiter</h5>
                </div>
                <div className="card-body donut-chart donut-chart-default">
                  <DonutChart
                    className="flot-chart-placeholder"
                    data={[
                      {
                        value: 80,
                        label: "India"
                      },
                      {
                        value: 5,
                        label: "USA"
                      },
                      {
                        value: 5,
                        label: "Canada"
                      },
                      {
                        value: 5,
                        label: "UK"
                      }
                    ]}
                    colors={["#c1ddfd", "#ffc1cc", "#e1d5f7", "#afeef5"]}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-lg-12 col-md-5">
                  <div className="card">
                    <div className="card-body">
                      <div className="row social-media-counter">
                        <div className="col text-center">
                          <i className="icofont icofont-social-facebook font-primary" />
                          <h4 className="font-primary mt-2">
                            <span className="counter">25</span>K
                          </h4>
                        </div>
                        <div className="col text-center">
                          <i className="icofont icofont-social-twitter font-secondary" />
                          <h4 className="font-secondary mt-2">
                            <span className="counter">456</span>K
                          </h4>
                        </div>
                        <div className="col text-center">
                          <i className="icofont icofont-social-instagram font-success" />
                          <h4 className="font-success mt-2">
                            <span className="counter">22</span>K
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-7">
                  <div className="card">
                    <div className="card-body default-slider">
                      <Slider {...settings}>
                        <div className="cloned">
                          <div className="slide--item">
                            <div>
                              <p className="text-center">
                                I must explain to you how all this mistaken idea
                                of denouncing pleasure and praising pain was
                                born and I will give you a complete account of
                                the system,Lorem Ipsum is simply dummy text of
                                the printing and typesetting industry. Lorem
                                Ipsum has been the industry&#39; s text ever
                                since the 1500s.
                              </p>
                              <div className="text-center">
                                <div className="media d-inline-flex">
                                  <img
                                    className="mr-3 img-60"
                                    src={require("../../../assets/images/dashboard/boy-1.png")}
                                    alt="Generic placeholder "
                                  />
                                  <div className="align-self-center">
                                    <div className="media-body">
                                      <h6 className="mt-2 text-uppercase f-w-700">
                                        Mark Jecno
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cloned">
                          <div className="slide--item">
                            <div>
                              <p className="text-center">
                                I must explain to you how all this mistaken idea
                                of denouncing pleasure and praising pain was
                                born and I will give you a complete account of
                                the system,Lorem Ipsum is simply dummy text of
                                the printing and typesetting industry. Lorem
                                Ipsum has been the industry&#39;s standard dummy
                                text ever since the 1500s.
                              </p>
                              <div className="text-center">
                                <div className="media d-inline-flex">
                                  <img
                                    className="mr-3 img-60"
                                    src={require("../../../assets/images/dashboard/boy-1.png")}
                                    alt="Generic placeholder"
                                  />
                                  <div className="align-self-center">
                                    <div className="media-body">
                                      <h6 className="mt-2 text-uppercase f-w-700">
                                        Mark Jecno
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cloned">
                          <div className="slide--item">
                            <div>
                              <p className="text-center">
                                I must explain to you how all this mistaken idea
                                of denouncing pleasure and praising pain was
                                born and I will give you a complete account of
                                the system,Lorem Ipsum is simply dummy text of
                                the printing and typesetting industry. Lorem
                                Ipsum has been the industry&#39;s standard dummy
                                text ever since the 1500s.
                              </p>
                              <div className="text-center">
                                <div className="media d-inline-flex">
                                  <img
                                    className="mr-3 img-60"
                                    src={require("../../../assets/images/dashboard/boy-1.png")}
                                    alt="Generic placeholder "
                                  />
                                  <div className="align-self-center">
                                    <div className="media-body">
                                      <h6 className="mt-2 text-uppercase f-w-700">
                                        Mark Jecno
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cloned">
                          <div className="slide--item">
                            <div>
                              <p className="text-center">
                                I must explain to you how all this mistaken idea
                                of denouncing pleasure and praising pain was
                                born and I will give you a complete account of
                                the system,Lorem Ipsum is simply dummy text of
                                the printing and typesetting industry. Lorem
                                Ipsum has been the industry&#39;s standard dummy
                                text ever since the 1500s.
                              </p>
                              <div className="text-center">
                                <div className="media d-inline-flex">
                                  <img
                                    className="mr-3 img-60"
                                    src={require("../../../assets/images/dashboard/boy-1.png")}
                                    alt="Generic placeholder "
                                  />
                                  <div className="align-self-center">
                                    <div className="media-body">
                                      <h6 className="mt-2 text-uppercase f-w-700">
                                        Mark Jecno
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h5>Top Sale</h5>
                </div>
                <div className="card-body">
                  <div className="top-sale-chart">
                    <CanvasJSChart
                      options={options}
                      /* onRef={ref => this.chart = ref} */
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card custom-card default-user-card">
                <div className="card-header">
                  <img
                    src={require("../../../assets/images/user-card/1.jpg")}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="card-profile">
                  <img
                    src={require("../../../assets/images/avtar/3.jpg")}
                    className="rounded-circle"
                    alt=""
                  />
                </div>
                <ul className="card-social">
                  <li>
                    <button className="force-link-button">
                      <i className="fa fa-facebook" />
                    </button>
                  </li>
                  <li>
                    <button className="force-link-button">
                      <i className="fa fa-google-plus" />
                    </button>
                  </li>
                  <li>
                    <button className="force-link-button">
                      <i className="fa fa-twitter" />
                    </button>
                  </li>
                  <li>
                    <button className="force-link-button">
                      <i className="fa fa-instagram" />
                    </button>
                  </li>
                  <li>
                    <button className="force-link-button">
                      <i className="fa fa-rss" />
                    </button>
                  </li>
                </ul>
                <div className="text-center profile-details">
                  <h4 className="m-b-15 m-t-5">Mark Jecno</h4>
                  <h6 className="m-t-15">Manager</h6>
                </div>
                <div className="card-footer row">
                  <div className="col-4 col-sm-4">
                    <h6 className="dashboard-card">Follower</h6>
                    <h3 className="counter">9564</h3>
                  </div>
                  <div className="col-4 col-sm-4">
                    <h6 className="dashboard-card">Follows</h6>
                    <h3>
                      <span className="counter">49</span>K
                    </h3>
                  </div>
                  <div className="col-4 col-sm-4">
                    <h6 className="dashboard-card">Total</h6>
                    <h3>
                      <span className="counter">96</span>M
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="card height-equal equal-height-lg">
                <div className="card-header">
                  <h5>PRODUCT CART</h5>
                </div>
                <div className="card-body">
                  <div className="user-status height-scroll custom-scrollbar">
                    <table className="table table-bordernone">
                      <thead>
                        <tr>
                          <th scope="col" className="pt-0">
                            Details
                          </th>
                          <th scope="col" className="pt-0">
                            Quantity
                          </th>
                          <th scope="col" className="pt-0">
                            Status
                          </th>
                          <th scope="col" className="pt-0">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Simply dummy text of the printing</td>
                          <td className="digits">1</td>
                          <td className="font-secondary">Pending</td>
                          <td className="digits">$6523</td>
                        </tr>
                        <tr>
                          <td>Long established</td>
                          <td className="digits">5</td>
                          <td className="font-danger">Cancle</td>
                          <td className="digits">$6523</td>
                        </tr>
                        <tr>
                          <td>sometimes by accident</td>
                          <td className="digits">10</td>
                          <td className="font-danger">Cancle</td>
                          <td className="digits">$6523</td>
                        </tr>
                        <tr>
                          <td>Classical Latin literature</td>
                          <td className="digits">9</td>
                          <td className="font-info">Return</td>
                          <td className="digits">$6523</td>
                        </tr>
                        <tr>
                          <td>keep the site on the Internet</td>
                          <td className="digits">8</td>
                          <td className="font-secondary">Pending</td>
                          <td className="digits">$6523</td>
                        </tr>
                        <tr>
                          <td>Molestiae consequatur</td>
                          <td className="digits">3</td>
                          <td className="font-danger">Cancle</td>
                          <td className="digits">$6523</td>
                        </tr>
                        <tr>
                          <td>Classical Latin literature</td>
                          <td className="digits">9</td>
                          <td className="font-info">Return</td>
                          <td className="digits">$6523</td>
                        </tr>
                        <tr>
                          <td>Long established</td>
                          <td className="digits">5</td>
                          <td className="font-danger">Cancle</td>
                          <td className="digits">$6523</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="card height-equal equal-height-lg">
                <div className="card-header">
                  <h5>Support ticket</h5>
                </div>
                <div className="card-body">
                  <div className="support-ticket">
                    <div className="row table-responsive-sm">
                      <table className="table table-bordernone">
                        <tbody>
                          <tr>
                            <td className="pt-0">
                              <div className="bg-primary left">A</div>
                            </td>
                            <td className="pt-0">
                              <span>Aredo jeko </span>
                              <h6>25 july 2019</h6>
                            </td>
                            <td className="pt-0">
                              <p>
                                Mistaken idea of denouncing pleasure and
                                praising pain was born and I will give you a
                                complete account of the system, Lorem Ipsum is
                                simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="bg-secondary left">C</div>
                            </td>
                            <td>
                              <span>Aredo jeko </span>
                              <h6>25 july 2019</h6>
                            </td>
                            <td>
                              <p>
                                Mistaken idea of denouncing pleasure and
                                praising pain was born and I will give you a
                                complete account of the system, Lorem Ipsum is
                                simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td className="pb-0">
                              <div className="bg-success left">H</div>
                            </td>
                            <td className="pb-0">
                              <span>Aredo jeko </span>
                              <h6>25 july 2019</h6>
                            </td>
                            <td className="pb-0">
                              <p>
                                Mistaken idea of denouncing pleasure and
                                praising pain was born and I will give you a
                                complete account of the system, Lorem Ipsum is
                                simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Container-fluid Ends*/}
      </div>
    );
  }
}

export default Default;
