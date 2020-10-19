import * as Yup from "yup";

const locationsValidationSchema = Yup.object().shape({
  locationTypeId: Yup.string().required("Required"),
  lineOne: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
  stateId: Yup.string().required("Required"),
});

export default locationsValidationSchema;
