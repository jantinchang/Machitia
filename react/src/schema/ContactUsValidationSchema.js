import * as Yup from "yup";

const ContactUsValidationSchema = Yup.object().shape({
  from: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  subject: Yup.string(),
  message: Yup.string().required("Required"),
});

export default ContactUsValidationSchema;
