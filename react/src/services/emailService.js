import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

let endPoint = `${API_HOST_PREFIX}/api/email/`;

export const contactUsEmail = (payload) => {
  const config = {
    method: "POST",
    url: endPoint + "contactus",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
