import React, { Component } from "react";
import { Link } from "react-router-dom";

// Import custom components
import UserMenu from "./UserMenu";

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      sidebar: true,
      navMenus: false,
    };
  }

  goFull = () => {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  openCloseSidebar = () => {
    if (this.state.sidebar) {
      this.setState({ sidebar: false });
      document
        .querySelector(".page-body-wrapper")
        .classList.add("sidebar-close");
    } else {
      this.setState({ sidebar: true });
      document
        .querySelector(".page-body-wrapper")
        .classList.remove("sidebar-close");
    }
  };

  toggle() {
    this.setState((prevState) => ({
      navMenus: !prevState.navMenus,
    }));
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    var contentwidth = window.innerWidth;
    if (contentwidth <= 991) {
      this.setState({ sidebar: false });
    }
  }

  componentDidMount() {
    var contentwidth = window.innerWidth;
    if (contentwidth <= 991) {
      document
        .querySelector(".page-body-wrapper")
        .classList.add("sidebar-close");
    }
  }

  render() {
    return (
      <div className="page-main-header">
        <div className="main-header-left">
          <div className="logo-wrapper">
            <Link to="/">
              <img
                src={require("../../../assets/images/machitia_logo.png")}
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="main-header-right row">
          <div className="mobile-sidebar">
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <input
                  type="checkbox"
                  id="sidebar-toggle"
                  defaultChecked={this.state.sidebar}
                  onClick={this.openCloseSidebar}
                />
                <span className="switch-state" />
              </label>
            </div>
          </div>
          <div className="nav-right col">
            <ul className={"nav-menus " + (this.state.navMenus ? "open" : "")}>
              <UserMenu {...this.props} />
            </ul>
            <div
              className="d-lg-none mobile-toggle"
              onClick={() => this.toggle()}
            >
              <i className="icon-more" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
