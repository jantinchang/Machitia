const chalk = require("chalk");
const {
  SCHEMAS,
  routeDebugger,
  routeDebuggerVerbose,
  setMetaData
} = require("../common");

const aaLogger = routeDebugger.extend("athorize");
const aaLoggerVerbose = routeDebuggerVerbose.extend("athorize");

module.exports = function Athorize(roles) {
  aaLogger(chalk.blue("Athorize Requested:") + JSON.parse(roles));
  const isCollection = true;

  return function(target, property, descriptor) {
    aaLoggerVerbose(chalk.green.bold("Athorize SetUp"), property);
    setMetaData(
      SCHEMAS.ROUTES.ROLEAUTHORIZATION,
      {
        enpointName: property.toLowerCase(),
        roles: roles,
        schema: SCHEMAS.ROUTES.ROLEAUTHORIZATION
      },
      target,
      isCollection
    );
    return descriptor;
  };
};
