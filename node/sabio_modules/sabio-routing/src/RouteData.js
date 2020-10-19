module.exports = class RouteData {
  constructor(
    endPoint,
    path,
    httpMethod,
    reqSchema,
    allowAnonymous,
    authRoles,
    controller
  ) {
    this.path = path;
    this.controller = controller;
    this.endPoint = endPoint;
    this.reqSchema = reqSchema;
    this.httpMethod = httpMethod;
    this.authRoles = authRoles;
    this.allowAnonymous = allowAnonymous;
  }
};
