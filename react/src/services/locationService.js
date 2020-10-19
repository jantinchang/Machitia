import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

let endPoint = `${API_HOST_PREFIX}/api/locations/`;

export const addLocation = (payload) => {
  const config = {
    method: "POST",
    url: endPoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export const updateLocation = (payload) => {
  const config = {
    method: "PUT",
    url: endPoint + payload.id,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let paginate = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: endPoint + `paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/son" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let getById = (payload) => {
  const config = {
    method: "GET",
    url: endPoint + payload.id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/son" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let remove = (id) => {
  const config = {
    method: "DELETE",
    url: endPoint + `${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/son" },
  };

  return axios(config)
    .then(() => id)
    .catch(onGlobalError);
};

let getLocationStateName = (payload) => {
  const config = {
    method: "GET",
    url: endPoint + payload,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/son" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { paginate, getById, remove, getLocationStateName };
