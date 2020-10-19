import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

let endPoint = `${API_HOST_PREFIX}/api/user`;

export const forgotPass = (email) => {
  const config = {
    method: "POST",
    url: endPoint + `/verify?email=${email}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
export const resetPass = (payload) => {
  const config = {
    method: "POST",
    url: endPoint + "/reset",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
