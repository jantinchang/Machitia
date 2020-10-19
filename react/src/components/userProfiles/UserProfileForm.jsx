import React from "react";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { Formik, Field } from "formik";
import logger from "sabio-debug";
import { add, update, getByUserId } from "../../services/userProfileServices";
import userProfileValidationSchema from "./../../schema/UserProfileValidationSchema";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import FileUpload from "./../fileUpload/FileUploadForm";
import "./../../assets/css/userProfile.css";

const _logger = logger.extend("NewUserProfile");

class UserProfileForm extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      mi: "",
      avatarUrl: "",
    },
  };
  componentDidMount() {
    _logger(this.props);
    const { id } = this.props.match.params;
    if (id) {
      const { state } = this.props.location;
      if (state) {
        this.setFormData(state);
      } else {
        getByUserId(id)
          .then((response) => this.setFormData(response.item))
          .catch(this.onGetByIdError);
      }
    }
  }
  setFormData = (formData) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData,
      };
    });
  };
  onGetByIdError = (error) => {
    _logger(error);
  };

  handleFileChange = (response, setFieldValue) => {
    setFieldValue("avatarUrl", response[0]);
  };

  handleSubmit = (values, { resetForm }) => {
    _logger(values);
    // send as payload to your axios call

    if (values.id) {
      update(values).then(this.onActionSuccess).catch(this.onActionError);
    } else {
      add(values).then(this.onAddSuccess).catch(this.onActionError);
    }
    //if you want to reset form you can use Formik's own method but you need to pass the object to reset the form to
    resetForm(this.state.formData);
  };

  onActionSuccess = (values) => {
    _logger(values);

    toast.success("You have successfully updated!");

    ///toast
    this.handleRedirect();
  };
  handleFileChange = (response, setFieldValue) => {
    setFieldValue("avatarUrl", response[0]);
  };

  onAddSuccess = (values) => {
    _logger(values);

    toast.success("You have successfully added a new User Profile!");

    this.handleRedirect();
  };
  handleRedirect = () => {
    this.props.history.push("/dashboard");
  };
  onActionError = (values) => {
    _logger(values);

    toast.error("Opps, something went wrong.");
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={userProfileValidationSchema}
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
              setFieldValue,
            } = props;
            return (
              <div className="row">
                <div className="col-md-6 card pt-4">
                  {" "}
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label>First Name</Label>
                      <Field
                        name="firstName"
                        type="text"
                        values={values.firstName}
                        placeholder="First Name"
                        autoComplete="off"
                        className={
                          errors.firstName && touched.firstName
                            ? "form-control"
                            : "form-control"
                        }
                      />
                      {errors.firstName && touched.firstName && (
                        <span className="input-feedback">
                          {errors.firstName}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Field
                        name="lastName"
                        type="text"
                        values={values.lastName}
                        placeholder="Last Name"
                        autoComplete="off"
                        className={
                          errors.lastName && touched.lastName
                            ? "form-control"
                            : "form-control"
                        }
                      />
                      {errors.lastName && touched.lastName && (
                        <span className="input-feedback">
                          {errors.lastName}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Middle Initial</Label>
                      <Field
                        name="mi"
                        type="text"
                        values={values.mi}
                        placeholder="MI"
                        autoComplete="off"
                        className={
                          errors.mi && touched.mi
                            ? "form-control"
                            : "form-control"
                        }
                      />
                      {errors.mi && touched.mi && (
                        <span className="input-feedback">{errors.mi}</span>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Avatar Url</Label>
                      <FileUpload
                        isMultiple={false}
                        onUploadSuccess={(response) =>
                          this.handleFileChange(response, setFieldValue)
                        }
                      />
                      {errors.avatarUrl && touched.avatarUrl && (
                        <span className="input-feedback">
                          {errors.avatarUrl}
                        </span>
                      )}
                      <div className="card-footer text-left">
                        <Button
                          type="submit"
                          disabled={!isValid || isSubmitting}
                        >
                          {values.id ? "Update" : "Submit"}
                        </Button>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
                <div className="col-md-6">
                  <div
                    className="card card-curved-body card-hover border-0 box-shadow mx-auto"
                    style={{ maxWidth: "21rem" }}
                  >
                    <div className="card-img-top card-img-gradient">
                      <img src={values.avatarUrl} alt="Sarah Cole" />
                    </div>
                    <div className="card-body text-center">
                      <h3 className="h6 card-title mb-2">
                        {values.firstName} {values.mi} {values.lastName}
                      </h3>
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
UserProfileForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.number }) }),
  location: PropTypes.shape({ state: PropTypes.func }),
  currentUser: PropTypes.shape({
    roles: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  id: PropTypes.number,
};

export default withRouter(UserProfileForm);
