import * as Yup from "yup";

const userProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  mi: Yup.string(),
  avatarUrl: Yup.string().required("Required"),
});

export default userProfileValidationSchema;
