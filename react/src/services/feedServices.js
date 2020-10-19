import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_NODE_HOST_PREFIX,
} from "./serviceHelpers";

let endPoint = `${API_NODE_HOST_PREFIX}/api/Feed/`;

const insert = (payload) => {
  const config = {
    method: "POST",
    url: endPoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const createdByPaginate = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: endPoint + `createdBy?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getFeed = () => {
  const config = {
    method: "GET",
    url: endPoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
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

const update = (blog) => {
  const config = {
    method: "PUT",
    url: endPoint + blog.id,
    withCredentials: true,
    crossdomain: true,
    data: blog,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const remove = (payload) => {
  const config = {
    method: "DELETE",
    url: endPoint + payload.id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { insert, createdByPaginate, update, remove, getById, getFeed };
