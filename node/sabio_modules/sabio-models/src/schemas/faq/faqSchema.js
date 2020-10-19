const joi = require("@hapi/joi");
const Schema = require("../Schema");

const faqValidator = joi.object({
  question: joi
    .string()
    .alphanum()
    .min(3)
    .max(255)
    .required(),
  answer: joi
    .string()
    .alphanum()
    .min(3)
    .max(2000)
    .required(),
  categoryId: joi
    .number()
    .required()
    .min(1)
    .max(2147483647),
  sortOrder: joi
    .number()
    .required()
    .min(1)
    .max(2147483647),
});

module.exports = new Schema(faqValidator);