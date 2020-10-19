const validateUser = require("./validate.user");
const validateBody = require("./validate.body");
const bindUser = require("./bindUser");

const Filters = {
  validateUser,
  validateBody,
  bindUser
};

module.exports = Filters;
