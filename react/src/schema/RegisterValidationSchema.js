import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .max(100, "You are over the 100 character limit")
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
      "Minimum 4 Characters: 1 Upper, 1 Lower, 1 Number and 1 Special"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
  role: Yup.number().min(2).max(3).required("Required"),
});

export default registerValidationSchema;
