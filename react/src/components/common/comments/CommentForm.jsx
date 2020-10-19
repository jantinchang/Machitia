import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Formik, Field, Form } from "formik";
import PropTypes from "prop-types";
import commentsValidationSchema from "./../../../schema/CommentsValidationSchema";

const CommentForm = (props) => {
  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        validationSchema={commentsValidationSchema}
        initialValues={props.formData}
        onSubmit={props.handleSubmit}
      >
        {(formikProps) => {
          const {
            values,
            touched,
            errors,
            isValid,
            isSubmitting,
          } = formikProps;
          return (
            <Form className={"col-md-6 pt-4"}>
              <FormGroup>
                <Label>Text</Label>
                <Field
                  component="textarea"
                  rows="5"
                  name="text"
                  type="text"
                  values={values.text}
                  placeholder="text"
                  autoComplete="off"
                  className={
                    errors.text && touched.text
                      ? "form-control"
                      : "form-control"
                  }
                />
                {errors.text && touched.text && (
                  <span className="input-feedback">{errors.text}</span>
                )}
              </FormGroup>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                {values.id ? "Update" : "Insert"}
              </button>
              <button
                onClick={props.onCancel}
                type="button"
                className="btn btn-light"
              >
                Cancel
              </button>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
// Validation
CommentForm.propTypes = {
  formData: PropTypes.shape({
    subject: "",
    text: "",
    id: "",
  }),
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};
export default CommentForm;
