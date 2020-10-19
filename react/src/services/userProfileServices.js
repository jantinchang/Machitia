import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
  API_NODE_HOST_PREFIX,
} from "./serviceHelpers";

let endPoint = `${API_HOST_PREFIX}/api/userprofiles/`;
let nodeEndPoint = `${API_NODE_HOST_PREFIX}/api/auth/`;
const add = (payload) => {
  const config = {
    method: "POST",
    url: endPoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addBothUserOrganization = (payload) => {
  const config = {
    method: "POST",
    url: `${nodeEndPoint}initial/setup`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const update = (payload) => {
  const config = {
    method: "PUT",
    url: endPoint + payload.id,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getPagList = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: endPoint + `paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/son" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const search = (query, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url:
      endPoint +
      `search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/son" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: endPoint + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getByUserId = (userId) => {
  const config = {
    method: "GET",
    url: `${nodeEndPoint}profileby/${userId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
export {
  add,
  update,
  getPagList,
  search,
  getById,
  getByUserId,
  addBothUserOrganization,
};
