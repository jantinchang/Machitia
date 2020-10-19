import * as Yup from "yup";

const ResetPassValidationSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().required("Required"),
});

export default ResetPassValidationSchema;
