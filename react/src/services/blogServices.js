import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

let endPoint = `${API_HOST_PREFIX}/api/blogs/`;

const create = (payload) => {
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

const pagedType = (pageIndex, pageSize, blogTypeId) => {
  const config = {
    method: "GET",
    url:
      endPoint +
      `byType?pageIndex=${pageIndex}&pageSize=${pageSize}&blogTypeId=${blogTypeId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const paginate = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: endPoint + `paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

const edit = (blog) => {
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

//publishStatus pass id and status
const unpublish = (id) => {
  const config = {
    method: "PUT",
    url: endPoint + `${id}/status/0`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { create, paginate, edit, remove, getById, unpublish, pagedType };
