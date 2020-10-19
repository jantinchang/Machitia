const joi = require("@hapi/joi");
const Schema = require("../Schema");

const addMessageValidator = joi.object({
  message: joi
    .string()
    .min(1)
    .max(1000)
    .required(),
  recipientId: joi
    .number()
    .integer()
    .min(1)
    .required(),
});

module.exports = new Schema(addMessageValidator, "id");