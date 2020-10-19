import axios from "axios";
import "./serviceHelpers";
import logger from "sabio-debug";
const _logger = logger.extend("autoLogin");

let {
  REACT_APP_API_HOST_PREFIX: API,
  REACT_APP_API_NODE_HOST_PREFIX: NODE_API,
  REACT_APP_TEMP_USER_ID: userId,
  REACT_APP_TEMP_USER_NAME: userName,
  REACT_APP_TEMP_USER_ROLE: userRole,
  REACT_APP_VERBOSE: isVerbose,
  REACT_APP_DOT_NET_ENABLED: isDotNetEnabled,
  REACT_APP_NODE_ENABLED: isNodeEnabled,
} = process.env;

_logger(" parameters used by auto login service", {
  API,
  NODE_API,
  userId,
  userName,
  userRole,
  isVerbose,
  isDotNetEnabled,
  isNodeEnabled,
});

if (isVerbose) {
  _logger(`
  
  Use the .env.development variables to customize the credentials this script uses to log you in automatically. 
  You can also shut this message off by setting isVerbose=false;
  
  `);
}

class SiteTester {
  constructor(host) {
    this.host = host;
  }

  run = (onDone) => {
    _logger(
      `Tests for ${this.host}. You can disable this test if you follow this message to the originating file.`
    );

    // return this.getCurrent()
    //   .then(() => this.getCurrent("POST"))
    //   .then(() => {
    //     if (onDone) {
    //       onDone();
    //     }
    //   });

    return this.logIn()
      .then(this.getCurrent)
      .then(() => this.getCurrent("POST"))
      .then(() => {
        if (onDone) {
          onDone();
        }
      });
  };

  logIn = (httpMethod) => {
    const config = {
      method: httpMethod || "GET",
      url: this.host + `/api/temp/auth/login/${userId}/${userName}/${userRole}`,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(this.onLogInSuccess).catch(this.onErrorResponse);
  };

  getCurrent = (httpMethod) => {
    //
    const config = {
      method: httpMethod || "GET",
      url: this.host + "/api/temp/auth/current",
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(this.onLogInSuccess).catch(this.onErrorResponse);
  };

  onLogInSuccess = (response) => {
    if (isVerbose) {
      _logger("Success for", {
        url: response.config.url,
        method: response.config.method,
      });
    }
  };

  onErrorResponse = (response) => {
    _logger("Error Response for", {
      url: response.config.url,
      method: response.config.method,
    });
  };
}

if (isDotNetEnabled) {
  new SiteTester(API).run();
}

if (isNodeEnabled) {
  new SiteTester(NODE_API).run();
}
