import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const groupsUrl = `${API_HOST_PREFIX}/api/groups/`;

// Add Group
const add = (payload) => {
  const config = {
    method: "Post",
    url: groupsUrl,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Delete Group by Id
const remove = (payload) => {
  const config = {
    method: "DELETE",
    url: `${groupsUrl}${payload.id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Update Group
const update = (payload) => {
  const config = {
    method: "PUT",
    url: `${groupsUrl}${payload.id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Get Group by Id
const getById = (id) => {
  const config = {
    method: "GET",
    url: `${groupsUrl}${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Get All
const getAll = () => {
  const config = {
    method: "GET",
    url: groupsUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Get Group Paginated
const getPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${groupsUrl}paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Search
const search = (pageIndex, pageSize, text) => {
  const config = {
    method: "GET",
    url: `${groupsUrl}search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${text}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Add a Follow
const followedUrl = `${API_HOST_PREFIX}/api/followers/groups/`;

const addFollow = (groupId) => {
  const config = {
    method: "Post",
    url: `${followedUrl}${groupId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Remove a Follow

const removeFollow = (groupId) => {
  const config = {
    method: "Delete",
    url: `${followedUrl}${groupId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Get All Groups Liked by User

const getAllUserFollowed = () => {
  const config = {
    method: "GET",
    url: followedUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

//
let endPoint = `${API_HOST_PREFIX}/api/userprofiles/`;

const getByIdUser = (id) => {
  const config = {
    method: "GET",
    url: endPoint + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export {
  add,
  update,
  getById,
  remove,
  getPaginated,
  getAll,
  search,
  addFollow,
  removeFollow,
  getAllUserFollowed,
  getByIdUser,
};
