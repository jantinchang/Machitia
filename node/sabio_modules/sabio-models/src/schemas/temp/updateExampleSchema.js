const joi = require("@hapi/joi");
const Schema = require("../Schema");

const loginTempValidator = joi.object({
  userName: joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  id: joi
    .number()
    .required()
    .min(1)
    .max(2147483647),
  roles: joi
    .array()
    .min(1)
    .unique()
    .required(),
});

module.exports = new Schema(loginTempValidator, "id");
