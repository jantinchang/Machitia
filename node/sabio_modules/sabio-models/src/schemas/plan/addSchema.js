const joi = require("@hapi/joi");
const Schema = require("../Schema");

const addPlanValidator = joi.object({
    title: joi
        .string()
        .max(50)
        .required(),
    subject: joi
        .string()
        .max(50)
        .required(),
    overview: joi
        .string()
        .max(200)
        .required(),
    duration: joi
        .string()
        .max(50),
    planTypeId: joi
        .number()
        .integer()
        .required(),
    coverImageUrl: joi
        .string()
        .uri()
        .max(500),
    concepts: joi
        .string()
        .max(400),
    ableTo: joi
        .string()
        .max(400),
    vocabulary: joi
        .string()
        .max(400),
    standardTypeId: joi
        .number()
        .integer()
        .min(1),
    prerequisites: joi
        .string()
        .max(1000),
    prep: joi
        .string()
        .max(1000),
    materials: joi
        .string()
        .max(1000),
    toDo: joi
        .string()
        .max(400),
    agendas: joi.array().items(joi.object({
        agendaTypeId: joi
            .number()
            .integer(),
        title: joi
            .string()
            .min(0)
            .max(1000),
        duration: joi
            .string()
            .min(0)
            .max(1000),
        tips: joi
            .string()
            .min(0)
            .max(1000),
        educatorDoes: joi
            .string()
            .min(0)
            .max(1000),
        learnerDoes: joi
            .string()
            .min(0)
            .max(1000),
        
    }))

});

module.exports = new Schema(addPlanValidator);
