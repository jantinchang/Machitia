import * as Yup from "yup";

const feedValidationSchema = Yup.object().shape({
  content: Yup.string().required("Required"),
  fileId: Yup.number(),
  feedStatusId: Yup.number().required("Required"),
});

export default feedValidationSchema;
