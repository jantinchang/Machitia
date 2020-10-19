import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MENUITEMS } from "../../../constants/menu";
import PropTypes from "prop-types";
import logger from "sabio-debug";
import UserPanel from "./UserPanel";

const _logger = logger.extend("Sidebar");

// This theme imported code needs to be refactored

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPath: "1",
      mainmenu: [],
    };
    let filteredMenu = this.filteredMenuItems(MENUITEMS);
    _logger(filteredMenu, "filteredMenu");

    this.state.mainmenu = filteredMenu;
  }
  onItemSelection = (arg) => {
    this.setState({ selectedPath: arg.path });
  };

  // eslint-disable-next-line camelcase
  // UNSAFE_componentWillMount() {
  //   this.setState({
  //     mainmenu: this.filteredMenuItems(MENUITEMS),
  //   });
  // }
  componentDidMount() {
    _logger("sidebar", this.props, this.state.mainmenu);

    var currentUrl = window.location.pathname;

    this.state.mainmenu.filter((items) => {
      if (!items.children) {
        if (items.path === currentUrl) {
          this.setNavActive(items);
        }
        return false;
      }

      items.children.filter((subItems) => {
        if (subItems.path === currentUrl) {
          this.setNavActive(subItems);
        }
        if (!subItems.children) {
          return false;
        }
        subItems.children.filter((subSubItems) => {
          if (subSubItems.path === currentUrl) {
            this.setNavActive(subSubItems);
          }

          return false;
        });

        return false;
      });

      return false;
    });
  }

  setNavActive(item) {
    this.setState((prevState) => {
      prevState.mainmenu.forEach((menuItem) => {
        if (menuItem !== item) {
          menuItem.active = false;
        }
        if (menuItem.children && menuItem.children.includes(item)) {
          menuItem.active = true;
        }
        if (menuItem.children) {
          menuItem.children.forEach((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              menuItem.active = true;
            }
            if (submenuItems !== item) {
              submenuItems.active = false;
            }
          });
        }
      });
      item.active = !item.active;

      return { mainmenu: prevState.mainmenu };
    });
  }
  componentDidUpdate(prevProps) {
    //
    if (prevProps.currentUser.roles === this.props.currentUser.roles) {
      return true;
    } else {
      this.setState((prevState) => {
        let filteredMenu = this.filteredMenuItems(MENUITEMS);

        return { ...prevState, mainmenu: filteredMenu };
      });
    }
  }

  filteredMenuItems = (items) => {
    return items.filter((item) => {
      return item.roles.some((role) =>
        role.includes(this.props.currentUser.roles)
      );
    });
  };

  handleDashRedirect = () => {
    if (this.props.currentUser.roles.includes("SystemAdmin")) {
      this.props.history.push(`/dashboard`, {
        type: "LOGIN",
        currentUser: { ...this.props.currentUser, isLoggedIn: true },
      });
    } else if (this.props.currentUser.roles.includes("Organization")) {
      this.props.history.push(
        `/organization/${this.props.currentUser.id}/dashboard`,
        {
          type: "LOGIN",
          currentUser: {
            ...this.props.currentUser,
            isLoggedIn: true,
          },
        }
      );
    } else {
      this.props.history.push(
        `/independent/${this.props.currentUser.id}/dashboard`,
        {
          type: "LOGIN",
          currentUser: {
            ...this.props.currentUser,
            isLoggedIn: true,
          },
        }
      );
    }
  };

  render() {
    const mainmenu = this.state.mainmenu.map((menuItem, i) => (
      <li className={`${menuItem.active ? "active" : ""}`} key={i}>
        {menuItem.sidebartitle ? (
          <div className="sidebar-title">{menuItem.sidebartitle}</div>
        ) : (
          ""
        )}
        {menuItem.type === "sub" ? (
          <button
            className="sidebar-header force-link-button "
            onClick={() => this.setNavActive(menuItem)}
          >
            <i className={`icon-${menuItem.icon}`} />
            <span>{menuItem.title}</span>
            <i className="fa fa-angle-right pull-right" />
          </button>
        ) : (
          ""
        )}
        {menuItem.type === "link" ? (
          <Link
            to={`${process.env.PUBLIC_URL}${menuItem.path}`}
            className={`sidebar-header ${menuItem.active ? "Active" : ""}`}
            onClick={() => this.setNavActive(menuItem)}
          >
            <i className={`icon-${menuItem.icon}`} />
            <span>{menuItem.title}</span>
            {menuItem.children ? (
              <i className="fa fa-angle-right pull-right" />
            ) : (
              ""
            )}
          </Link>
        ) : (
          ""
        )}
        {menuItem.children ? (
          <ul
            className={`sidebar-submenu ${menuItem.active ? "menu-open" : ""}`}
            style={
              menuItem.active
                ? { opacity: 1, transition: "opacity 500ms ease-in" }
                : {}
            }
          >
            {menuItem.children.map((childrenItem, index) => (
              <li
                key={index}
                className={
                  childrenItem.children
                    ? childrenItem.active
                      ? "active"
                      : ""
                    : ""
                }
              >
                {childrenItem.type === "sub" ? (
                  <button
                    className="force-link-button"
                    onClick={() => this.setNavActive(childrenItem)}
                  >
                    <i className="fa fa-angle-right" />
                    {childrenItem.title}
                  </button>
                ) : (
                  ""
                )}

                {childrenItem.type === "link" ? (
                  <Link
                    to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                    className={childrenItem.active ? "active" : ""}
                    onClick={() => this.setNavActive(childrenItem)}
                  >
                    <i className="fa fa-angle-right" />
                    {childrenItem.title}{" "}
                  </Link>
                ) : (
                  ""
                )}
                {childrenItem.children ? (
                  <ul
                    className={`sidebar-submenu ${
                      childrenItem.active ? "menu-open" : ""
                    }`}
                  >
                    {childrenItem.children.map((childrenSubItem, key) => (
                      <li
                        className={childrenSubItem.active ? "active" : ""}
                        key={key}
                      >
                        {childrenSubItem.type === "link" ? (
                          <Link
                            to={`${process.env.PUBLIC_URL}${childrenSubItem.path}`}
                            className={childrenSubItem.active ? "active" : ""}
                          >
                            <i className="fa fa-angle-right" />
                            {childrenSubItem.title}
                          </Link>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </li>
    ));
    _logger(this.state.mainmenu, "render");

    return (
      <div className="page-sidebar custom-scrollbar page-sidebar-open">
        <UserPanel currentUserProfile={this.props.currentUserProfile} />
        <ul className="sidebar-menu">
          <button
            type="button"
            className="button"
            onClick={this.handleDashRedirect}
          >
            Dashboard
          </button>
          {mainmenu}
        </ul>
        <div className="sidebar-widget text-center">
          <div className="sidebar-widget-top">
            <h6 className="mb-2 fs-14">Need Help</h6>
            <i className="icon-bell" />
          </div>
          <div className="sidebar-widget-bottom p-20 m-20">
            <p>
              help@sabio.la{" "}
              <a
                href="https://sabionation.slack.com/messages"
                // eslint-disable-next-line react/jsx-no-target-blank
                target="_blank"
              >
                Visit FAQ
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
Sidebar.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  currentUserProfile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  history: PropTypes.shape({ push: PropTypes.func }),
};

export default Sidebar;
