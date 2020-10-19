import axios from "axios";
import {
    onGlobalError,
    onGlobalSuccess,
    API_NODE_HOST_PREFIX
} from "./serviceHelpers";

const messageUrl = `${API_NODE_HOST_PREFIX}/api/messages/`;

let add = (payload) => {
    const config = {
        method: "POST",
        url: messageUrl,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let deleteById = (payload) => {
    const config = {
        method: "DELETE",
        url: messageUrl + payload.id,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let update = (payload) => {
    const config = {
        method: "PUT",
        url: messageUrl + payload.id,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let paginatedGeneral = (pageIndex, payload) => {
    const config = {
        method: "GET",
        url: messageUrl + `paginate?pageIndex=${pageIndex}&pageSize=50`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/son" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let paginatedCreatedBy = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: messageUrl + `createdby?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/son" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let getAllCorrespondents = () => {
    const config = {
        method: "GET",
        url: messageUrl + `correspondents`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/son" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let searchAllCorrespondents = (query) => {
    const config = {
        method: "GET",
        url: messageUrl + `searchcorrespondents?query=${query}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/son" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let getConversation = (correspondentId) => {
    const config = {
        method: "GET",
        url: messageUrl + `conversation/` + correspondentId,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/son" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let get = (payload) => {
    const config = {
        method: "GET",
        url: messageUrl + payload.id,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/son" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
export {
    add,
    deleteById,
    update,
    paginatedGeneral,
    paginatedCreatedBy,
    get,
    getAllCorrespondents,
    searchAllCorrespondents,
    getConversation,
};
