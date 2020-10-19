import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

let endPoint = `${API_HOST_PREFIX}/api/dashboard`;

const getDashData = () => {
  const config = {
    method: "GET",
    url: `${endPoint}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default getDashData;
