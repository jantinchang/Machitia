const joi = require("@hapi/joi");
const Schema = require("../Schema");

const fileUploadValidator = joi.object({
  url: joi
    .string()
    .alphanum()
    .min(3)
    .max(255)
    .required(),
  fileTypeId: joi
    .string()
    .alphanum()
    .min(3)
    .max(2000)
    .required()
});

module.exports = new Schema(fileUploadValidator);