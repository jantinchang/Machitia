import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import "./index.scss";
import "./services/serviceHelpers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import debug from "sabio-debug";
import { ScrollContext } from "react-router-scroll-4";
import LoadingOverlay from "./components/common/LoadingOverlay";
import appRoutes from "./constants/appRoutes";
import publicRoutes from "./constants/publicRoutes";
import { currentUser } from "./services/userService";
import * as userProfilesService from "./services/userProfileServices";
const App = React.lazy(() => import("./components/App"));
const Landing = React.lazy(() => import("./components/pages/Landing"));
const Error404 = React.lazy(() => import("./components/pages/Error-404"));
const _logger = debug.extend("index.js");
// you should change this user base with great care.
// probably a good idea, to not do so, nor change any logic having to do with this unless you talk to many people
const _userBase = {
  id: 0,
  isLoggedIn: false,
  name: "",
  roles: null,
  tenantId: "Anonymous",
};
const _profileBase = {
  firstName: "",
  lastName: "",
  mi: "",
  avatarUrl: "",
};
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMadeRequest: false,
      currentUser: { ..._userBase },
      currentUserProfile: { ..._profileBase },
      approvedRoutes: [],
      approvedRouteComponents: [],
      publicComponents: [],
    };
    this.state.approvedRoutes = this.filteredRoutes(_userBase);
    this.state.approvedRouteComponents = this.state.approvedRoutes.map(
      (route) =>
        this.mapRoute(
          route,
          this.state.currentUser,
          this.state.currentUserProfile
        )
    );
    this.state.publicComponents = publicRoutes.map((route) =>
      this.mapRoute(
        route,
        this.state.currentUser,
        this.state.currentUserProfile
      )
    );
  }
  componentDidMount() {
    currentUser().then(this.onCurrentUserSuccess).catch(this.onCheckError);
  }
  componentDidUpdate(prevProps, prevState) {
    _logger(prevProps, prevState, "componentDidUpdate ----", this.props);
    const { type } = this.props.location.state ? this.props.location.state : "";
    const { currentUser } = this.props.location.state
      ? this.props.location.state
      : _userBase;
    const { currentUserProfile } = this.props.location.state
      ? this.props.location.state
      : _profileBase;
    if (type) {
      if (type === "LOGIN" && currentUser.id !== this.state.currentUser.id) {
        let approvedRoutes = this.filteredRoutes(currentUser);
        let approvedRouteComponents = appRoutes.map((route) =>
          this.mapRoute(route, currentUser, currentUserProfile)
        );
        _logger(approvedRouteComponents, approvedRoutes);
        const newState = {
          ...prevState,
          currentUser,
          currentUserProfile,
          approvedRoutes,
          approvedRouteComponents,
        };
        this.setState(newState);
      } else if (type === "LOGOUT" && this.state.currentUser.id !== 0) {
        this.setState(this.returnBaseState);
      }
    } else {
      return null;
    }
  }
  onCurrentUserSuccess = (data) => {
    _logger(`Get Current User Success: `, data.item);
    let userBase = data.item;
    userBase.isLoggedIn = true;
    this.setState((prevState) => {
      let newRoutes = this.filteredRoutes(userBase.roles);
      let approvedRouteComponents = newRoutes.map((rd) =>
        this.mapRoute(rd, userBase, prevState.currentUserProfile)
      );
      let publicComponents = publicRoutes.map((rd) =>
        this.mapRoute(rd, userBase, prevState.currentUserProfile)
      );
      const newState = {
        ...prevState,
        currentUser: userBase,
        approvedRoutes: newRoutes,
        approvedRouteComponents,
        publicComponents,
      };
      return newState;
    }, this.getUserProfile(userBase));
  };
  onCheckError = (response) => {
    _logger(`User is NOT Logged In: `, response);
    this.setState(this.returnBaseState);
  };
  returnBaseState = () => {
    return {
      currentUser: _userBase,
      currentUserProfile: _profileBase,
      approvedRoutes: [],
      approvedRouteComponents: [],
    };
  };
  getUserProfile = (userBase) => {
    userProfilesService
      .getByUserId(userBase.id)
      .then(this.onGetUserProfileSuccess)
      .catch(this.onUserProfileError);
  };
  onGetUserProfileSuccess = (response) => {
    _logger("Get Current User Profile Success: ", response.item);
    let profileBase = {
      firstName: response.item.firstName,
      lastName: response.item.lastName,
      mi: response.item.mi,
      avatarUrl: response.item.avatarUrl,
    };
    this.setState((prevState) => {
      let newRoutes = this.filteredRoutes(prevState.currentUser);
      let approvedRouteComponents = newRoutes.map((rd) =>
        this.mapRoute(rd, prevState.currentUser, profileBase)
      );
      let publicComponents = publicRoutes.map((rd) =>
        this.mapRoute(rd, prevState.currentUser, profileBase)
      );
      const newState = {
        ...prevState,
        currentUserProfile: profileBase,
        approvedRoutes: newRoutes,
        approvedRouteComponents,
        publicComponents,
      };
      return newState;
    });
  };
  mapRoute = (route, currentUser, currentUserProfile) => {
    let Component = route.component;
    return (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        render={(props) => (
          <Component
            {...props}
            {...this.props}
            currentUser={currentUser}
            currentUserProfile={currentUserProfile}
          />
        )}
      />
    );
  };
  filteredRoutes = (currentUser) => {
    if (currentUser.isLoggedIn) {
      return appRoutes.filter((route) => {
        return route.roles.some((role) => role.includes(currentUser.roles));
      });
    } else {
      return [];
    }
  };

  onUserProfileError = () => {
    this.props.history.push(`/initial/${this.state.currentUser.id}/setup`, {
      type: "LOGIN",
      currentUser: { ...this.state.currentUser, isLoggedIn: true },
    });
  };
  render() {
    return (
      <ScrollContext>
        <Suspense fallback={<LoadingOverlay {...this.props} />}>
          <Switch location={this.props.location}>
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Landing {...props} currentUser={this.state.currentUser} />
              )}
            />
            {/* public routes */}
            {this.state.publicComponents}
            {this.state.currentUser.isLoggedIn && (
              <App
                {...this.props}
                currentUser={this.state.currentUser}
                currentUserProfile={this.state.currentUserProfile}
              >
                {/* auth routes */}
                <Suspense fallback={<LoadingOverlay {...this.props} />}>
                  {this.state.approvedRouteComponents}
                </Suspense>
              </App>
            )}
            <Route
              render={(props) => (
                <Error404 {...props} currentUser={this.state.currentUser} />
              )}
            />
          </Switch>
        </Suspense>
      </ScrollContext>
    );
  }
}
Root.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      userBase: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        roles: PropTypes.arrayOf(PropTypes.string).isRequired,
        tenantId: PropTypes.string.isRequired,
      }),
      currentUserProfile: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        mi: PropTypes.string,
        avatarUrl: PropTypes.string,
      }),
      type: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
const RouterRoot = withRouter(Root);
ReactDOM.render(
  <BrowserRouter basename={"/"}>
    <RouterRoot />
    <ToastContainer />
  </BrowserRouter>,
  document.getElementById("root")
);
