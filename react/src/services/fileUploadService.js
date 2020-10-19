import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_NODE_HOST_PREFIX,
} from "./serviceHelpers";

const add = (payload) => {
  const config = {
    method: "POST",
    url: `${API_NODE_HOST_PREFIX}/api/FileUpload/`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { add };
