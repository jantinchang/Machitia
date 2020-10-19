import * as Yup from "yup";

const initialUserProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    mi: Yup.string().required("Required")
});

export default initialUserProfileSchema;
