import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_NODE_HOST_PREFIX,
} from "./serviceHelpers";

let targetURL = `${API_NODE_HOST_PREFIX}/api/auth/`;

let logIn = (payload) => {
  const config = {
    method: "POST",
    url: targetURL + "login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let register = (payload) => {
  const config = {
    method: "POST",
    url: targetURL,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

var currentUser = () => {
  const config = {
    method: "GET",
    url: targetURL + "current",
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

var logOutUser = () => {
  const config = {
    method: "GET",
    url: targetURL + "logout",
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

var checkProfileStatus = () => {
  const config = {
    method: "GET",
    url: targetURL + "profilestatus",
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

var activateUser = (userToken) => {
  const config = {
    method: "PUT",
    url: targetURL + userToken,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export {
  logIn,
  register,
  currentUser,
  logOutUser,
  checkProfileStatus,
  activateUser,
};
