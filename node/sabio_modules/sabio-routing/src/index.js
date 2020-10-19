const mapRoutes = require("./routing");

const RoutePrefix = require("./descriptors/RoutePrefix");
const Route = require("./descriptors/Route");
const AllowAnonymous = require("./descriptors/AllowAnonymous");
const Authorize = require("./descriptors/Authorize");

const Routing = {
  mapRoutes,
  RoutePrefix,
  Route,
  AllowAnonymous,
  Authorize
};
module.exports = Routing;
