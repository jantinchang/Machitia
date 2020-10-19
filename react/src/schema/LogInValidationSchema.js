import * as Yup from "yup";

const logInValidationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default logInValidationSchema;
