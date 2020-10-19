import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_NODE_HOST_PREFIX,
} from "./serviceHelpers";

const planUrl = `${API_NODE_HOST_PREFIX}/api/plans/`;

let add = (payload) => {
  const config = {
    method: "POST",
    url: planUrl,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let deleteById = (id) => {
  const config = {
    method: "DELETE",
    url: planUrl + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let update = (payload) => {
  const config = {
    method: "PUT",
    url: planUrl,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let paginatedGeneral = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: planUrl + "paginate?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let paginateCreatedBy = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: planUrl + "createdby?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let getById = (id) => {
  const config = {
    method: "GET",
    url: planUrl + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let search = (query, pageIndex, pageSize) => {
  //This is a complete pagination call. It calls for a list of organizations that were created by a specific user.

  const config = {
    method: "GET",
    url: `${planUrl}search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export {
  add,
  deleteById,
  update,
  paginatedGeneral,
  paginateCreatedBy,
  getById,
  search,
};
