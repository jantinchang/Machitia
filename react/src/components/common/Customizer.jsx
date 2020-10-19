import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

class Customizer extends Component {
  constructor(props) {
    super(props);

    this.firsttoggle = this.firsttoggle.bind(this);
    this.secondtoggle = this.secondtoggle.bind(this);
    this.handleBoxedLayout = this.handleBoxedLayout.bind(this);
    this.handleRTL = this.handleRTL.bind(this);

    this.state = {
      firstTab: "1",
      secondTab: "1",
      sidebar: [
        { id: 1, value: "banana", isChecked: false },
        { id: 2, value: "apple", isChecked: false },
        { id: 3, value: "mango", isChecked: false },
        { id: 4, value: "grap", isChecked: false },
      ],
      boxChecked: false,
      rtlChecked: false,
    };
  }

  toggleCustomize = () => {
    document
      .querySelector(".floated-customizer-panel")
      .classList.toggle("active");
  };

  firsttoggle(tab) {
    if (this.state.firstTab !== tab) {
      this.setState({
        firstTab: tab,
      });
    }
  }
  secondtoggle(tab) {
    if (this.state.secondTab !== tab) {
      this.setState({
        secondTab: tab,
      });
    }
  }

  changeMainTheme = (e) => {
    var mainThemeLayout = e.target.getAttribute("theme-layout");
    document
      .querySelector(".main-header-left")
      .setAttribute("semilight-bg-color", "");
    document
      .querySelector(".main-header-right")
      .setAttribute("header-bg-color", "");
    document.body.setAttribute("main-theme-layout", mainThemeLayout);
  };

  handleLayout = (e) => {
    var menuLayout = e.target.value;

    if (menuLayout === "menu-layout-collapsed") {
      document
        .querySelector(".page-body-wrapper")
        .classList.add("sidebar-close");
    } else {
      document
        .querySelector(".page-body-wrapper")
        .classList.remove("sidebar-close");
    }
  };

  handleHeaderColor = (headerValue) => {
    document
      .querySelector(".main-header-left")
      .setAttribute("semilight-bg-color", headerValue);
    document
      .querySelector(".main-header-right")
      .setAttribute("header-bg-color", headerValue);
  };

  handleSemiColor = (semiValue) => {
    document
      .querySelector(".main-header-left")
      .setAttribute("semilight-bg-color", semiValue);
    document
      .querySelector(".main-header-right")
      .setAttribute("header-bg-color", "");
  };

  handleNavColor = (navValue) => {
    document
      .querySelector(".main-header-right")
      .setAttribute("header-bg-color", navValue);
    document
      .querySelector(".main-header-left")
      .setAttribute("semilight-bg-color", "");
  };

  closeCustomizer() {
    document
      .querySelector(".floated-customizer-panel")
      .classList.remove("active");
  }

  handleBoxedLayout = () => {
    this.setState({ boxChecked: !this.state.boxChecked });
    if (this.state.boxChecked)
      document.querySelector(".page-wrapper").classList.remove("box-layout");
    else document.querySelector(".page-wrapper").classList.add("box-layout");
  };

  handleRTL = () => {
    this.setState({ rtlChecked: !this.state.rtlChecked });
    if (this.state.rtlChecked) {
      document.getElementsByTagName("html")[0].setAttribute("dir", "");
      document.body.classList.remove("rtl");
    } else {
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      document.body.classList.add("rtl");
    }
  };

  handleSidebarNav = () => {
    var naviagation = document.querySelectorAll(
      "input[name=naviagation-layout-checkbox]:checked"
    );

    naviagation.forEach((edhi) => {
      var navLayoutC = edhi.value;

      document.querySelector(".page-sidebar").classList.add(navLayoutC);

      if (
        document
          .querySelector(".page-sidebar")
          .classList.contains("native-scroll")
      ) {
        document
          .querySelector(".page-sidebar")
          .classList.remove("custom-scrollbar");
      }
      if (
        document
          .querySelector(".page-sidebar")
          .classList.contains("native-image-bg")
      ) {
        var square = document.getElementsByClassName("native-image-bg");
        const background = require("../../assets/images/sidebar-bg.jpg");
        square[0].style.backgroundImage = "url(" + background + ")";
      }

      if (navLayoutC === "native-default") {
        document.getElementById("navigation_bordered_check").checked = false;
        document.getElementById("navigation_rightside_check").checked = false;
        document.getElementById("navigation_scroll_check").checked = false;
        document.getElementById("navigation_back_image_check").checked = false;
      }
    });

    var notCheckedNav = document.querySelectorAll(
      "input[name=naviagation-layout-checkbox]:not(:checked)"
    );
    notCheckedNav.forEach((item) => {
      var nav = item.value;
      document.querySelector(".page-sidebar").classList.remove(nav);
      if (nav === "native-image-bg") {
        document.querySelector(".page-sidebar").style.backgroundImage = "";
      }
      if (nav === "native-scroll") {
        document
          .querySelector(".page-sidebar")
          .classList.add("custom-scrollbar");
      }
    });
  };

  render() {
    return (
      <div>
        <div
          className="floated-customizer-btn third-floated-btn"
          onClick={this.toggleCustomize}
        >
          <div className="icon-w">
            {" "}
            <i className="fa fa-cog fa-spin" />{" "}
          </div>
          <span>Customizer</span>
        </div>
        <div className="floated-customizer-panel">
          <div className="fcp-content">
            <div
              className="close-customizer-btn"
              onClick={this.closeCustomizer}
            >
              <i className="icon-close" />
            </div>
            <div className="customizer-title">
              <h5>Template Customizer</h5>
              <p className="mb-0">Customize & Preview in Real Time</p>
            </div>
            <div className="fcp-group">
              <div className="fcp-group-contents">
                <div className="main-option">
                  <div className="row">
                    <div className="col">
                      <div className="main-theme-layout-container">
                        <a
                          href="#"
                          className="main-theme-layout"
                          title="Light Layout"
                          onClick={(e) => this.changeMainTheme(e)}
                        >
                          <img
                            src={require("../../assets/images/customizer/light.png")}
                            alt="Light Layout"
                            theme-layout="main-theme-layout-5"
                          />
                        </a>
                        <a
                          href="#"
                          className="main-theme-layout"
                          title="Dark Sidebar"
                          onClick={(e) => this.changeMainTheme(e)}
                        >
                          <img
                            src={require("../../assets/images/customizer/sidebar-dark.png")}
                            alt="Dark Sidebar"
                            theme-layout="main-theme-layout-1"
                          />
                        </a>
                        <a
                          href="#"
                          className="main-theme-layout"
                          title="Dark Page-body"
                          onClick={(e) => this.changeMainTheme(e)}
                        >
                          <img
                            src={require("../../assets/images/customizer/page-bosy-dark.png")}
                            alt="Dark Page-body"
                            theme-layout="main-theme-layout-2"
                          />
                        </a>
                        <a
                          href="#"
                          className="main-theme-layout"
                          title="Dark Page-body & Sidebar"
                          onClick={(e) => this.changeMainTheme(e)}
                        >
                          <img
                            src={require("../../assets/images/customizer/page-body-sidebar.png")}
                            alt="Dark Page-body & Sidebar"
                            theme-layout="main-theme-layout-3"
                          />
                        </a>
                        <a
                          href="#"
                          className="main-theme-layout"
                          title="Dark Layout"
                          onClick={(e) => this.changeMainTheme(e)}
                        >
                          <img
                            src={require("../../assets/images/customizer/dark.png")}
                            alt="Dark Layout"
                            theme-layout="main-theme-layout-4"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fcp-options">
              <div className="fcp-group">
                <div className="fcp-group-contents">
                  <div className="layout-option">
                    <Nav tabs className="nav-material nav-primary">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.firstTab === "1",
                          })}
                          onClick={() => {
                            this.firsttoggle("1");
                          }}
                        >
                          Layouts
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.firstTab === "2",
                          })}
                          onClick={() => {
                            this.firsttoggle("2");
                          }}
                        >
                          Sidebar
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.firstTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <div className="form-group mb-0">
                              <div className="radio radio-primary m-t-5 m-b-5">
                                <input
                                  type="radio"
                                  name="menu-layouts"
                                  id="default_menu"
                                  value="menu-layout-default"
                                  defaultChecked="true"
                                  onChange={(e) => this.handleLayout(e)}
                                />
                                <label htmlFor="default_menu">Default</label>
                              </div>
                              <div className="radio radio-primary">
                                <input
                                  type="radio"
                                  name="menu-layouts"
                                  id="collapsed_menu"
                                  value="menu-layout-collapsed"
                                  onChange={(e) => this.handleLayout(e)}
                                />
                                <label htmlFor="collapsed_menu">
                                  Collapsed Menu
                                </label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <div className="form-group mb-0">
                              <div className="checkbox checkbox-primary m-squar">
                                <input
                                  id="navigation_scroll_check"
                                  type="checkbox"
                                  onChange={(e) => this.handleSidebarNav(e)}
                                  name="naviagation-layout-checkbox"
                                  value="native-scroll"
                                />
                                <label
                                  htmlFor="navigation_scroll_check"
                                  className="mt-0"
                                >
                                  Nativ Scroll
                                </label>
                              </div>
                              <div className="checkbox checkbox-primary m-squar">
                                <input
                                  id="navigation_bordered_check"
                                  type="checkbox"
                                  onChange={(e) => this.handleSidebarNav(e)}
                                  name="naviagation-layout-checkbox"
                                  value="navigation-bordered"
                                />
                                <label htmlFor="navigation_bordered_check">
                                  Bordered Navigation
                                </label>
                              </div>
                              <div className="checkbox checkbox-primary m-squar">
                                <input
                                  id="navigation_rightside_check"
                                  type="checkbox"
                                  onChange={(e) => this.handleSidebarNav(e)}
                                  name="naviagation-layout-checkbox"
                                  value="navigation-rightside"
                                />
                                <label htmlFor="navigation_rightside_check">
                                  Right Side Icons
                                </label>
                              </div>
                              <div className="checkbox checkbox-primary m-squar">
                                <input
                                  id="navigation_back_image_check"
                                  type="checkbox"
                                  onChange={(e) => this.handleSidebarNav(e)}
                                  name="naviagation-layout-checkbox"
                                  value="native-image-bg"
                                />
                                <label htmlFor="navigation_back_image_check">
                                  Background Image
                                </label>
                              </div>
                              <div className="checkbox checkbox-primary m-squar">
                                <input
                                  id="navigation_default_check"
                                  type="checkbox"
                                  onChange={(e) => this.handleSidebarNav(e)}
                                  name="naviagation-layout-checkbox"
                                  value="native-default"
                                />
                                <label htmlFor="navigation_default_check">
                                  Default Navigation
                                </label>
                                <p className="mb-0">
                                  <b>Note : </b>For trying other option need to
                                  please uncheck all option
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </div>
              <div className="fcp-group">
                <div className="fcp-group-header">Header Color Options</div>
                <div className="fcp-group-contents">
                  <div className="navigation-color-option">
                    <Nav tabs className="nav-material nav-primary">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.secondTab === "1",
                          })}
                          onClick={() => {
                            this.secondtoggle("1");
                          }}
                        >
                          Header
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.secondTab === "2",
                          })}
                          onClick={() => {
                            this.secondtoggle("2");
                          }}
                        >
                          Brand
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.secondTab === "3",
                          })}
                          onClick={() => {
                            this.secondtoggle("3");
                          }}
                        >
                          Only nav
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.secondTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <div className="fcp-group-header-sub">
                              Light Version
                            </div>
                            <div className="form-group">
                              <div className="radio radio-default">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_default"
                                  value="bg-default"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_default" />
                              </div>
                              <div className="radio radio-primary">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_primary"
                                  value="bg-primary"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_primary" />
                              </div>
                              <div className="radio radio-secondary">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_secondary"
                                  value="bg-secondary"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_secondary" />
                              </div>
                              <div className="radio radio-danger">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_danger"
                                  value="bg-danger"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_danger" />
                              </div>
                              <div className="radio radio-success">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_success"
                                  value="bg-success"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_success" />
                              </div>
                              <div className="radio radio-info">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_info"
                                  value="bg-info"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_info" />
                              </div>
                            </div>
                          </Col>
                          <Col sm="12">
                            <div className="fcp-group-header-sub">
                              Dark Version
                            </div>
                            <div className="form-group">
                              <div className="radio radio-default">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_default_light_color"
                                  value="bg-default-light-colo"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_default_light_color" />
                              </div>
                              <div className="radio radio-primary">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_primary_light_color"
                                  value="bg-primary-light-color"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_primary_light_color" />
                              </div>
                              <div className="radio radio-secondary">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_secondary_light_color"
                                  value="bg-secondary-light-color"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_secondary_light_color" />
                              </div>
                              <div className="radio radio-danger">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_danger_light_color"
                                  value="bg-danger-light-color"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_danger_light_color" />
                              </div>
                              <div className="radio radio-success">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_success_light_color"
                                  value="bg-success-light-color"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_success_light_color" />
                              </div>
                              <div className="radio radio-info">
                                <input
                                  type="radio"
                                  name="navu-light"
                                  id="nav_light_info_light_color"
                                  value="bg-info-light-color"
                                  onChange={(e) =>
                                    this.handleHeaderColor(e.target.value)
                                  }
                                />
                                <label htmlFor="nav_light_info_light_color" />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <div className="form-group">
                              <div className="fcp-group-header-sub">
                                Light Version
                              </div>
                              <div className="radio radio-default">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_default"
                                  value="bg-default"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_default" />
                              </div>
                              <div className="radio radio-primary">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_primary"
                                  value="bg-primary"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_primary" />
                              </div>
                              <div className="radio radio-secondary">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_secondary"
                                  value="bg-secondary"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_secondary" />
                              </div>
                              <div className="radio radio-danger">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_danger"
                                  value="bg-danger"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_danger" />
                              </div>
                              <div className="radio radio-success">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_success"
                                  value="bg-success"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_success" />
                              </div>
                              <div className="radio radio-info">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_info"
                                  value="bg-info"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_info" />
                              </div>
                              <div className="radio radio-light">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_light"
                                  value="bg-light"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_light" />
                              </div>
                            </div>
                          </Col>
                          <Col sm="12">
                            <div>
                              <div className="fcp-group-header-sub">
                                Dark Version
                              </div>
                              <div className="radio radio-default">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_default_light"
                                  value="bg-default-light-color"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_default_light" />
                              </div>
                              <div className="radio radio-primary">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_primary_light"
                                  value="bg-primary-light-color"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_primary_light" />
                              </div>
                              <div className="radio radio-secondary">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_secondary_light"
                                  value="bg-secondary-light-color"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_secondary_light" />
                              </div>
                              <div className="radio radio-danger">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_danger_light"
                                  value="bg-danger-light-color"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_danger_light" />
                              </div>
                              <div className="radio radio-success">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_success_light"
                                  value="bg-success-light-color"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_success_light" />
                              </div>
                              <div className="radio radio-info">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_info_light"
                                  value="bg-info-light-color"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_info_light" />
                              </div>
                              <div className="radio radio-light">
                                <input
                                  type="radio"
                                  name="semi-light"
                                  id="semi_light_light_light"
                                  value="bg-light-light-color"
                                  onChange={(e) =>
                                    this.handleSemiColor(e.target.value)
                                  }
                                />
                                <label htmlFor="semi_light_light_light" />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">
                            <div className="form-group">
                              <div className="fcp-group-header-sub">
                                Light Version
                              </div>
                              <div className="radio radio-default">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_default"
                                  value="bg-default"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_default" />
                              </div>
                              <div className="radio radio-primary">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_primary"
                                  value="bg-primary"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_primary" />
                              </div>
                              <div className="radio radio-secondary">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_secondary"
                                  value="bg-secondary"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_secondary" />
                              </div>
                              <div className="radio radio-danger">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_danger"
                                  value="bg-danger"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_danger" />
                              </div>
                              <div className="radio radio-success">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_success"
                                  value="bg-success"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_success" />
                              </div>
                              <div className="radio radio-info">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_info"
                                  value="bg-info"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_info" />
                              </div>
                            </div>
                          </Col>
                          <Col sm="12">
                            <div className="form-group">
                              <div className="fcp-group-header-sub">
                                Dark Version
                              </div>
                              <div className="radio radio-default">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_default_light"
                                  value="bg-default-light-colo] "
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_default_light" />
                              </div>
                              <div className="radio radio-primary">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_primary_light"
                                  value="bg-primary-light-color"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_primary_light" />
                              </div>
                              <div className="radio radio-secondary">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_secondary_light"
                                  value="bg-secondary-light-color"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_secondary_light" />
                              </div>
                              <div className="radio radio-danger">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_danger_light"
                                  value="bg-danger-light-color"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_danger_light" />
                              </div>
                              <div className="radio radio-success">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_success_light"
                                  value="bg-success-light-color"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_success_light" />
                              </div>
                              <div className="radio radio-info">
                                <input
                                  type="radio"
                                  name="header-light"
                                  id="header_light_info_light"
                                  value="bg-info-light-color"
                                  onChange={(e) =>
                                    this.handleNavColor(e.target.value)
                                  }
                                />
                                <label htmlFor="header_light_info_light" />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </div>

              <div className="fcp-group">
                <div className="fcp-group-contents">
                  <div className="layout-option">
                    <div className="form-group mb-0">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          name="layout-checkbox"
                          id="Boxed_layout"
                          value="menu-layout-default"
                          defaultChecked={this.state.boxChecked}
                          onChange={this.handleBoxedLayout}
                        />
                        <label htmlFor="Boxed_layout">Boxed</label>
                      </div>
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          name="layout-checkbox"
                          id="rtl_layout"
                          value="menu-layout-collapsed"
                          onChange={this.handleRTL}
                        />
                        <label htmlFor="rtl_layout">RTL</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Customizer;
