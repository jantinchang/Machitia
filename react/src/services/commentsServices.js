import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const placeHolder = `${API_HOST_PREFIX}/api/comments/`;

// Add Comment
const add = (payload) => {
  const config = {
    method: "Post",
    url: placeHolder,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Delete Comment by Id
const remove = (payload) => {
  const config = {
    method: "DELETE",
    url: `${placeHolder}${payload.id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Update Comment
const update = (payload) => {
  const config = {
    method: "PUT",
    url: `${placeHolder}${payload.id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Get Comment by Id
const getById = (id) => {
  const config = {
    method: "GET",
    url: `${placeHolder}${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Get Comment Paginated
const getByEntity = (entityId, entityTypeId) => {
  const config = {
    method: "GET",
    url: `${placeHolder}byentity/${entityId}/${entityTypeId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { add, update, getById, remove, getByEntity };
