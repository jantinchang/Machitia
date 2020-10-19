const chalk = require("chalk");
const {
  SCHEMAS,
  routeDebugger,
  routeDebuggerVerbose,
  setMetaData
} = require("../common");

const routeLogger = routeDebugger.extend("route");
const routeLoggerVerbose = routeDebuggerVerbose.extend("route");
const dictMethods = {};
const httpMethods = [
  `get`,
  `post`,
  `put`,
  `head`,
  `delete`,
  `options`,
  `trace`,
  `copy`,
  `lock`,
  `mkcol`,
  `move`,
  `purge`,
  `propfind`,
  `proppatch`,
  `unlock`,
  `report`,
  `mkactivity`,
  `checkout`,
  `merge`,
  `m-search`,
  `notify`,
  `subscribe`,
  `unsubscribe`,
  `patch`,
  `search`,
  `connect`
];

httpMethods.forEach(m => (dictMethods[m] = true));

module.exports = function Route(httpMethod, routePath, requestModel, name) {
  if (!dictMethods[httpMethod.toLowerCase()]) {
    throw new Error(
      chalk.red.bold(
        `Argument Exception. Unrecognized HTTP Method ${httpMethod} ${routePath} ` +
          httpMethod
      )
    );
  }

  // we will allow null to be passed
  routePath = routePath || "";

  if (typeof routePath !== "string" || routePath.startsWith("/")) {
    const err =
      "Argument Exception: Null or invalid routePath. Route Paths should not start with '/' : ";
    const errData = `${httpMethod} > ${routePath}`;
    throw new Error(err + errData);
  }

  const routeParams = { httpMethod, routePath, requestModel, name };
  let debugName = {};
  if (!(requestModel === null || requestModel === undefined)) {
    debugName = requestModel.name;
  }

  routeParams.schema = SCHEMAS.ROUTES.ROUTE;

  routeLogger(chalk.italic("Path Requested"), httpMethod, routePath, debugName);

  return function(target, property, descriptor) {
    routeLoggerVerbose("Route", property);
    // this will capture this function so we can assoociat with model
    setMetaData(SCHEMAS.ROUTES.ROUTE, routeParams, endpointFunciton);
    // ------------------------------------------------------------------------
    //setMetaData(SCHEMAS.ROUTES.ROUTE, endpointFunciton, target, routeParams);

    const originalMethod = descriptor.value;
    endpointFunciton.routePath = routePath;
    descriptor.value = endpointFunciton;
    descriptor.touchedBy = "sabio";

    return descriptor;
    function endpointFunciton(...args) {
      routeDebuggerVerbose(`Endpoint Called with: ${routePath}`);
      return originalMethod.call(this, ...args);
    }
  };
};
