const joi = require("@hapi/joi");
const Schema = require("../Schema");

const loginValidator = joi.object({
  email: joi
      .string()
      .email()
      .required(),
  password: joi
    .required(),
});

module.exports = new Schema(loginValidator);
