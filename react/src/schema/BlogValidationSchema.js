import * as Yup from "yup";

const blogValidationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  dateCreated: Yup.string(),
  imageurl: Yup.string(),
});

export default blogValidationSchema;
