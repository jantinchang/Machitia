const debug = require("sabio-debug");

// export as a const in this manner so we can import { logger }
const logger = debug.extend("services");

const Common = { logger };

module.exports = Common;
