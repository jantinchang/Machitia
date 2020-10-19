const chalk = require("chalk");
const {
  SCHEMAS,
  routeDebugger,
  routeDebuggerVerbose,
  setMetaData
} = require("../common");

const aaLogger = routeDebugger.extend("allowanonymous");
const aaLoggerVerbose = routeDebuggerVerbose.extend("allowanonymous");

module.exports = function AllowAnonymous() {
  aaLogger(chalk.blue("AllowAnonymous Requested"));
  const isCollection = true;
  return function(target, property, descriptor) {
    aaLoggerVerbose(chalk.green.bold("AllowAnonymous SetUp"), property);
    setMetaData(
      SCHEMAS.ROUTES.ANONYMOUS,
      {
        enpointName: property.toLowerCase(),
        allow: true,
        schema: SCHEMAS.ROUTES.ANONYMOUS
      },
      target,
      isCollection
    );
    return descriptor;
  };
};
