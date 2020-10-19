import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

//ADD ORGANIZATION

let ORG_ENDPOINT = `${API_HOST_PREFIX}/api/organizations/`;

let addOrganization = (payload) => {
  const config = {
    method: "Post",
    url: ORG_ENDPOINT,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

//UPDATE

let update = (payload) => {
  const config = {
    method: "PUT",
    url: ORG_ENDPOINT + payload.id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// PAGINATED GENERAL

let paginatedOrganizationsGeneral = (pageIndex, payload) => {
  //This is a complete pagination call. It calls for everyone, without any specification attached.

  const config = {
    method: "GET",
    url: ORG_ENDPOINT + `paginate?pageIndex=${pageIndex}&pageSize=9`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let paginatedList = (pageIndex, pageSize) => {
  //This is a complete pagination call. It calls for a list of organizations that were created by a specific user.
  const config = {
    method: "GET",
    url: ORG_ENDPOINT + `paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let search = (query, pageIndex, pageSize) => {
  //This is a complete pagination call. It calls for a list of organizations that were created by a specific user.

  const config = {
    method: "GET",
    url:
      ORG_ENDPOINT +
      `search?query=${query}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// GET SINGLE ORGANIZATION

let getOrganization = (payload) => {
  const config = {
    method: "GET",
    url: ORG_ENDPOINT + payload.id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getOrgDetails = (payload) => {
  const config = {
    method: "GET",
    url: ORG_ENDPOINT + `details/` + payload.id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

// Organization Dashboard info call
let ORGDASH_ENDPOINT = `${API_HOST_PREFIX}/api/OrgDashBoard/`;

let getDashboardData = () => {
  const config = {
    method: "GET",
    url: ORGDASH_ENDPOINT,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export {
  addOrganization,
  update,
  paginatedOrganizationsGeneral,
  paginatedList,
  getOrganization,
  search,
  getDashboardData,
  getOrgDetails,
};
