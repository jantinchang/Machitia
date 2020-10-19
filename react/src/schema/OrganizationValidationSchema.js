import * as Yup from "yup";

const OrganizationValidationSchema = {
  OrganizationTypeId: Yup.number().required("Required"),
  name: Yup.string().required("Required"),
  headline: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  logo: Yup.string().required("Required"),
  locationId: Yup.number().required("Required"),
  phone: Yup.string().required("Required"),
  SiteUrl: Yup.string().required("Required"),
};

export default OrganizationValidationSchema;
