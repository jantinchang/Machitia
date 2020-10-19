import express from "express";
import web from "sabio-web";
import path from "path";
import { mapRoutes } from "sabio-routing";

const router = express.Router();

const filters = web.Filters;
const routingOptions = {};
const pathToControllers = path.join(__dirname, "/../controllers/");

// set handlers to bind user (usually only one)
routingOptions.userBinders = [filters.bindUser];

// these handlers will be used to authenticate the users (usually only one)
routingOptions.userAuthenticators = [filters.validateUser];

// these handlers will be used to validate the HTTP Body for endpoints that are marked for validation
routingOptions.bodyValidators = [filters.validateBody];

mapRoutes(router, pathToControllers, routingOptions);

module.exports = router;