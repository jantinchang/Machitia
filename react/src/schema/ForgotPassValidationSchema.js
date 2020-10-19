import * as Yup from "yup";

const ForgotPassValidationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
});

export default ForgotPassValidationSchema;
