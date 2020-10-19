/* eslint-disable no-console */
const express = require("express");
var fs = require("fs");
const { json, urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const helmet = require("helmet");
const routes = require("./routes");
const Responses = require("sabio-web-models").Responses;
const app = express();
var createError = require("http-errors");
var cors = require("cors");
const http = require("http").Server(app);
const https = require("https");
// for socket io you have to pick between http and https
// eslint-disable-next-line no-unused-vars
const io = (module.exports.io = require("socket.io")(http));

var debugRoute;
var debugRoutes = [];
const debugRouteInfo = [];
var configSuffix =
  (process.env.NODE_ENV || "").toLocaleLowerCase() !== "production"
    ? `.${process.env.NODE_ENV}`
    : "";
const parseConfigVars = config(`.env${configSuffix}`);

console.log({ parseConfigVars });

const port = process.env.PORT || 8080; // DO NOT REMOVE THIS LINE!!!
const envType = process.env.ENV_TYPE;

const showRoutes = (process.env.SHOW_ROUTES || "").trim();
const _isDebugEnv = showRoutes === "true";
console.log("server port", port);
console.log("server process.env.SHOW_ROUTES ", process.env.SHOW_ROUTES);
console.log("server _isDebugEnv", _isDebugEnv);

app.use(cors({ credentials: true, origin: true }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

let apiPrefix = process.env.API_PREFIX || "node-api";
let launchHttpServer = process.env.LAUNCH_HTTP || false;
const launchSecureServer = getSetting(process.env.LAUNCH_HTTPS);

launchHttpServer = getSetting(launchHttpServer);

console.log("apiPrefix", apiPrefix);
console.log("launchHttpServer", launchHttpServer);
console.log("launchSecureServer", launchSecureServer);
debugRouteInfo.push("server apiPrefix:", apiPrefix);

app.use("/" + apiPrefix, routes);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res /*next*/) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  let errorArr = [
    err.name + "[" + apiPrefix || "null" + "]",
    err.message,
    err.stack,
  ];

  if (_isDebugEnv) {
    errorArr = errorArr.concat(debugRouteInfo);
  }

  const errResponse = new Responses.ErrorResponse(errorArr);
  res.status(err.status || 500);
  res.json(errResponse);
});

if (typeof apiPrefix === "string") {
  if (apiPrefix.length > 0) {
    apiPrefix = `/${apiPrefix}/`;
  } else {
    apiPrefix = `/`;
  }
}
let _httpsServer = null;

if (launchSecureServer === true) {
  _httpsServer = https.createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  );
}

if (launchHttpServer) {
  let publicPort = port;

  if (envType === "local") {
    publicPort += 1;
  }

  app._server = http.listen(publicPort, () => {
    const url = `listening on http://localhost:${publicPort}${apiPrefix}`;
    console.log(url);
  });
}

if (launchSecureServer === true && _httpsServer) {
  const securePort = port;
  app._secureServer = _httpsServer.listen(securePort, () => {
    const url = `listening on https://localhost:${securePort}${apiPrefix}`;
    console.log(url);
  });
}

try {
  app._router.stack.forEach(function(middleware) {
    if (middleware.route) {
      // routes registered directly on the app
      debugRoutes.push(middleware.route);
    } else if (middleware.name === "router") {
      // router middleware
      middleware.handle.stack.forEach(function(handler) {
        debugRoute = handler.route;
        debugRoute && debugRoutes.push(debugRoute);
      });
    }
  });

  debugRoutes.forEach(function(temp) {
    var methods = "";
    for (var method in temp.methods) {
      methods += method + ", ";
    }
    debugRouteInfo.push(temp.path + ": " + methods);
  });
} catch (error) {
  console.error("Error with debug routes extraction", error);
}

module.exports = app;
function getSetting(setting) {
  if (setting === "true") {
    return true;
  } else {
    return false;
  }
}
