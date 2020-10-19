import * as Yup from "yup";

const planValidationSchema = Yup.object().shape({
    title: Yup.string().required(),
    planTypeId: Yup.number().integer().min(1).required(),
    subject: Yup.string().required(),
    duration: Yup.string().required(),
    overview: Yup.string().required(),
    coverImageUrl: Yup.string().required(),
    concepts: Yup.string().required(),
    ableTo: Yup.string().required(),
    vocabulary: Yup.string().required(),
    standardTypeId: Yup.number().integer().min(1).required(),
    prerequisites: Yup.string().required(),
    materials: Yup.string().required(),
    prep: Yup.string().required(),
    toDo: Yup.string().required(),
    agendas: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.string().required(),
            agendaTypeId: Yup.number().integer().min(1).required(),
            tips: Yup.string().required(),
            educatorDoes: Yup.string().required(),
            learnerDoes: Yup.string().required(),
        })
    ),
})

export default planValidationSchema;