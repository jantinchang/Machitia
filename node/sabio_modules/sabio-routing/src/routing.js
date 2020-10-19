const chalk = require("chalk");
const { routeDebugger, routeDebuggerVerbose } = require("./common");
const metaData = require("./metaDataStore");

const uniqueRoutes = {};

/**
 * @param {object} the application router
 * @param {string} pathToControllers is the path to the folde that will be recursively searched for controllers
 * @param {object} opts are the global options to use for all endpoints
 */
module.exports = function mapRoutes(router, pathToControllers, opts) {
  routeDebugger(
    chalk.red.bold(`
Mapping Routes`)
  );

  let authHandlers = [];
  let bodyValidators = [];
  let userBinders = [];
  const defaultHandlers = [];

  if (opts.userBinders) {
    routeDebuggerVerbose(chalk.red("Using User Binders"));
    userBinders = userBinders.concat(opts.userBinders);
  }

  if (opts.userAuthenticators) {
    routeDebuggerVerbose(chalk.red("Using userAuthenticator"));
    authHandlers = authHandlers.concat(opts.userAuthenticators);
  }

  if (opts.bodyValidators) {
    routeDebuggerVerbose(chalk.red("Using bodyValidator"));
    bodyValidators = bodyValidators.concat(opts.bodyValidators);
  }

  const routesToAdd = metaData.extractRoutesFromMetaData(pathToControllers);

  let routesFound = 0;
  for (let idx = 0; idx < routesToAdd.length; idx++) {
    const currentRoute = routesToAdd[idx];

    //#region Validate this is a unique route before we continue
    const routeKey =
      currentRoute.httpMethod.toLowerCase() + currentRoute.path.toLowerCase();

    if (uniqueRoutes[routeKey]) {
      throw new Error(
        `Duplicate Route encountered ${currentRoute.httpMethod.toUpperCase()} ${currentRoute.path.toLowerCase()}`
      );
    }
    uniqueRoutes[routeKey] = true;
    //#endregion

    let theseHandlers = null;

    //#region ADDING HANDLERS - User Binders
    /*

      The first middlerware handlers we want to touch the request will bind our user
      We do this by default as our current logic may end up copying two empty arrays if there are no
      user binders.
    */
    theseHandlers = [...defaultHandlers, ...userBinders];

    //#endregion

    //#region ADDING HANDLERS - Authentication
    /*

      The first middlerware handlers we want to touch the request will bind our user
      and then validate
    */
    theseHandlers = [...defaultHandlers, ...userBinders];

    if (!currentRoute.allowAnonymous === true) {
      // Each Authorze handler needs to have the authRoles passed to it
      theseHandlers = theseHandlers.concat(
        authHandlers.map(aHandler => aHandler(currentRoute.authRoles))
      );
    }

    //#endregion

    //#region ADDING HANDLERS - Body Validators
    /*
      The Body Validators will go in last as there may be no need to validate a body until late in the request
    */
    if (currentRoute.reqSchema) {
      if (!bodyValidators || bodyValidators.length === 0) {
        const errMsg = chalk.red.bold(
          `Endpoint configured for Model Validation but no Body Validators where provided`
        );
        routeDebugger(errMsg);

        throw new Error(errMsg);
      }

      // Each Body validators will be passed the schema
      theseHandlers = theseHandlers.concat(
        bodyValidators.map(cb => cb(currentRoute.reqSchema))
      );
    }

    //#endregion

    // ADDING HANDLERS - Actual Endpoint
    theseHandlers = [...theseHandlers, currentRoute.endPoint];

    router[currentRoute.httpMethod.toLowerCase()](
      currentRoute.path,
      theseHandlers
    );

    routesFound++;
  }

  routeDebugger(
    chalk.red(`
Mapping Routes found ${routesFound} routes`)
  );
};
