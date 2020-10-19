import * as Yup from "yup";

const groupsValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  imageUrl: Yup.string(),
  description: Yup.string()
    .min(2, "Must be greater than 1 character")
    .required("Required"),
});

export default groupsValidationSchema;
