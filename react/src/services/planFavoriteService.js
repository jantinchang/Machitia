import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

//ADD ORGANIZATION

let PLANFAV_ENDPOINT = `${API_HOST_PREFIX}/api/PlanFavorite/`; //THERE IS A SLASH AT THE END OF THIS ENDPOINT.

export let planFavoriteAdd = (plan) => {
  const config = {
    method: "Post",
    url: PLANFAV_ENDPOINT + `plan/${plan}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export let planFavoriteDelete = (plan) => {
  const config = {
    method: "DELETE",
    url: PLANFAV_ENDPOINT + `plan/${plan}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(() => plan)
    .catch(onGlobalError);
};

export let planByCurrent = () => {
  const config = {
    method: "Get",
    url: PLANFAV_ENDPOINT + `bycurrent`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
