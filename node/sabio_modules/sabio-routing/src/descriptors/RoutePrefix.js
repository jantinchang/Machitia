const chalk = require("chalk");
const {
  SCHEMAS,
  routeDebugger,
  routeDebuggerVerbose,
  setMetaData
} = require("../common");

// #region loggers
const prefixLogger = routeDebugger.extend("prefix");
const prefixLoggerVerbose = routeDebuggerVerbose.extend("prefix");
// #endregion loggers

module.exports = function RoutePrefix(prefix) {
  if (prefix) {
    prefixLogger(chalk.green.bold("RoutePrefix Requested"), prefix);
  }

  if (!prefix || prefix.endsWith("/")) {
    throw new Error(
      "Argument Exception: Null or invalid prefix. Route prefix should not end with '/' : " +
        prefix
    );
  }
  if (!prefix.startsWith("/")) {
    throw new Error(
      "Argument Exception: Invalid prefix. Route prefix should start with '/' : " +
        prefix
    );
  }

  return function(ctrTarget) {
    prefixLoggerVerbose("RoutePrefix", ctrTarget);

    const val = { prefix };
    val.schema = SCHEMAS.ROUTES.PREFIX;
    setMetaData(SCHEMAS.ROUTES.PREFIX, val, ctrTarget.prototype);

    prefixLogger("RoutePrefix Controller Target", ctrTarget.prototype);
  };
};
