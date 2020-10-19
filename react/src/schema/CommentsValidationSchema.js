import * as Yup from "yup";

const commentsValidationSchema = Yup.object().shape({
  subject: Yup.string(),
  text: Yup.string()
    .min(2, "Must be greater than 1 character")
    .required("Required"),
});

export default commentsValidationSchema;
