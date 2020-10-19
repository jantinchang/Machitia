const debug = require("sabio-debug");

const logger = debug.extend("app:controllers");

const Common = { logger };

module.exports = Common;
