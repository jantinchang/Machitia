const Responses = require("sabio-web-models").Responses;
const { logger } = require("./common");
const chalk = require("chalk");

const _debug = logger.extend("validate.body");

function arrayContainsArray(userRoles, requiredRoles) {
  let result = null;
  if (requiredRoles.length === 0 || userRoles.length < requiredRoles.length) {
    return false;
  }
  result = requiredRoles.every(function(value) {
    const hasIndex = userRoles.indexOf(value) < 0;
    return !hasIndex;
  });

  _debug(result);
  return result;
}

function validateUser(roles) {
  // we will use roles later to Authorize any given endpoint
  return (req, res, next) => {
    let responseCode = 200;
    let authenticated = false;
    let authorized = false;
    //req.user

    if (req.user) {
      authenticated = true;
      if (roles && roles.length > 0) {
        authorized = arrayContainsArray(roles, req.user.roles);
      } else {
        authorized = true;
      }
    }

    if (authenticated && authorized) {
      _debug(chalk.green("found user"));

      next();
    } else {
      if (!authenticated) {
        responseCode = 401;
      } else {
        responseCode = 403;
      }

      _debug(chalk.red.bold("user NOT Found"));
      const response = new Responses.ErrorResponse(
        "Authentication/Authorization Fail: User"
      );
      res.status(responseCode).json(response);
    }
  };
}

module.exports = validateUser;
