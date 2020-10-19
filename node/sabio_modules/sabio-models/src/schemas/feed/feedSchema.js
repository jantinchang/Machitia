const joi = require("@hapi/joi");
const Schema = require("../Schema");

const feedValidator = joi.object({
  content: joi
    .string()
    .alphanum()
    .min(3)
    .max(4000)
    .required(),
  url: joi
    .string()
    .alphanum()
    .min(3)
    .max(4000)
    .required(),
  fileTypeId: joi
    .number()
    .min(1)
    .max(2147483647),
  feedStatusId: joi
    .number()
    .required()
    .min(1)
    .max(2147483647)
});

module.exports = new Schema(feedValidator);