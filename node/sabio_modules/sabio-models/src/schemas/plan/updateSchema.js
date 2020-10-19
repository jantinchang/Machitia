const joi = require("@hapi/joi");
const Schema = require("../Schema");
const addSchema = require("./addSchema");


const updateSchema = addSchema.validator.keys({
    id: joi
        .number()
        .integer()
        .required()
        .min(1)
});
module.exports = new Schema(updateSchema);