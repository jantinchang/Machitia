import React from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { Formik, Field } from "formik";
import ContactUsValidationSchema from "../../schema/ContactUsValidationSchema";
import { toast } from "react-toastify";
import logger from "sabio-debug";
import { contactUsEmail } from "../../services/emailService";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import AboutCard from "../aboutUs/AboutCard";
const googleMapApiKey = process.env.REACT_APP_GOOGLE_APIKEY;

const _logger = logger.extend("ContactUsForm");

const containerStyle = {
  width: "450px",
  height: "480px",
};
const center = {
  lat: 40.7649462,
  lng: -111.8485461,
};

class ContactUsForm extends React.Component {
  state = {
    formData: {
      from: "",
      name: "",
      subject: "",
      message: "",
    },
  };
  handleSubmit = (values, { resetForm }) => {
    _logger(values);

    contactUsEmail(values).then(this.onSendSuccess).catch(this.onSendError);

    resetForm(this.state.formData);
  };

  onSendSuccess = (values) => {
    _logger(values);
    toast.success("Your message has been sent. Someone will reach out shortly");
  };

  onSendError = (values) => {
    _logger(values);

    toast.error("Oops, something went wrong.");
  };

  render() {
    return (
      <React.Fragment>
        <AboutCard />
        <Formik
          enableReinitialize={true}
          validationSchema={ContactUsValidationSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting,
            } = props;
            return (
              <div className="container">
                <div className="row">
                  <div className="col pt-5">
                    <div className="lg-white shadow-lg">
                      <div className="row no-gutters">
                        <Form
                          onSubmit={handleSubmit}
                          className={"col-lg-7 p-4 p-lg-6"}
                        >
                          <h2 className="h3">Get In Touch</h2>

                          <FormGroup>
                            <Field
                              name="from"
                              type="text"
                              values={values.from}
                              placeholder="Email"
                              autoComplete="off"
                              className={
                                errors.from && touched.from
                                  ? "form-control"
                                  : "form-control"
                              }
                            />
                            {errors.from && touched.from && (
                              <span className="input-feedback">
                                {errors.from}
                              </span>
                            )}
                          </FormGroup>
                          <FormGroup>
                            <Field
                              name="name"
                              type="text"
                              values={values.name}
                              placeholder="Name"
                              autoComplete="off"
                              className={
                                errors.name && touched.name
                                  ? "form-control"
                                  : "form-control"
                              }
                            />
                            {errors.name && touched.name && (
                              <span className="input-feedback">
                                {errors.name}
                              </span>
                            )}
                          </FormGroup>

                          <FormGroup>
                            <Field
                              name="subject"
                              type="text"
                              values={values.subject}
                              placeholder="Subject"
                              autoComplete="off"
                              className={
                                errors.subject && touched.subject
                                  ? "form-control"
                                  : "form-control"
                              }
                            />
                            {errors.subject && touched.subject && (
                              <span className="input-feedback">
                                {errors.subject}
                              </span>
                            )}
                          </FormGroup>

                          <FormGroup>
                            <Field
                              name="message"
                              type="text"
                              component="textarea"
                              values={values.message}
                              placeholder="Message"
                              autoComplete="off"
                              rows={7}
                              className={
                                errors.message && touched.message
                                  ? "form-control"
                                  : "form-control"
                              }
                            />
                            {errors.message && touched.message && (
                              <span className="input-feedback">
                                {errors.message}
                              </span>
                            )}
                          </FormGroup>

                          <div className="col-3 px-2 mb-3">
                            <Button
                              type="submit"
                              className="btn btn-sm btn-secondary d-inline-flex align-items-center"
                              disabled={!isValid || isSubmitting}
                            >
                              {" "}
                              Send
                              <svg
                                width={16}
                                height={16}
                                className="ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M23.612.225a1.045,1.045,0,0,0-1.138-.1L.827,11.646a1.547,1.547,0,0,0,.125,2.8l3.254,1.38a.719.719,0,0,0,.043.245l2.5,6.746A1.817,1.817,0,0,0,8.463,24a1.846,1.846,0,0,0,1.219-.474c.039-.035,2.79-3.078,3.4-3.754a.249.249,0,0,1,.283-.062l3.157,1.339a1.591,1.591,0,0,0,1.3-.027,1.563,1.563,0,0,0,.835-.983L23.961,1.3A1.014,1.014,0,0,0,23.612.225ZM5.838,16.046,15.53,7.983A.226.226,0,0,1,15.867,8a.219.219,0,0,1,.019.332L8.648,17.187a.728.728,0,0,0-.157.351l-.633,3.95Z" />
                              </svg>
                            </Button>
                          </div>
                        </Form>
                        <div className="col-lg-5 position-relative bg-white z-index-1">
                          <LoadScript googleMapsApiKey={googleMapApiKey}>
                            <GoogleMap
                              mapContainerStyle={containerStyle}
                              center={center}
                              zoom={10}
                            ></GoogleMap>
                          </LoadScript>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

export default ContactUsForm;
