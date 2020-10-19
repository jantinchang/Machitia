import React from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/css/groups.css";
import { Formik, Field, Form } from "formik";
import { FormGroup, Label } from "reactstrap";
import PropTypes from "prop-types";
import groupsValidationSchema from "../../schema/GroupValidationSchema";
import { add, getById, update, remove } from "../../services/groupService";
import debug from "sabio-debug";
import FileUpload from "./../fileUpload/FileUploadForm";
const _logger = debug.extend("App");

class GroupForm extends React.Component {
  state = {
    groupData: {
      name: "",
      description: "",
      imageUrl: "",
      isActive: true,
      isPrivate: false,
      CreatedBy: 2,
      dateCreated: "",
      totalCount: "",
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
        getById(id)
          .then((response) => this.setFormData(response.item))
          .catch(this.onGetByIdError);
      }
    }
  }
  setFormData = (groupData) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        groupData,
      };
    });
  };
  // Handle submit
  handleSubmit = (values) => {
    if (values.id) {
      update(values).then(this.onUpdateSuccess).catch(this.onUpdateFailure);
    } else {
      add(values).then(this.onAddSuccess).catch(this.onAddFailure);
    }
  };
  onUpdateSuccess = () => {
    toast.success("Group Updated Successfully!", {
      closeOnClick: true,
      position: "top-center",
    });
    this.moveToGroups();
  };
  onUpdateFailure = () => {
    toast.error("Group Update Failed!", {
      closeOnClick: true,
      position: "top-center",
    });
  };
  onAddSuccess = () => {
    toast.success("Group Added Successfully!", {
      closeOnClick: true,
      position: "top-center",
    });
    this.moveToGroups();
  };
  onAddFailure = () => {
    toast.error("Group Insert Failed!", {
      closeOnClick: true,
      position: "top-center",
    });
  };
  onGetByIdError = (response) => {
    _logger(response);
  };

  // Handle Delete
  handleDelete = () => {
    remove(this.state.groupData)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteFailure);
  };
  onDeleteSuccess = () => {
    toast.success("Group Deleted Successfully!", {
      closeOnClick: true,
      position: "top-center",
    });
    this.moveToGroups();
  };
  onDeleteFailure = () => {
    toast.error("Group Delete Failed!", {
      closeOnClick: true,
      position: "top-center",
    });
  };
  //
  moveToGroups = () => {
    this.props.history.push(`/groups`);
  };
  handleFileChange = (response, setFieldValue) => {
    _logger(response, setFieldValue);
    setFieldValue("imageUrl", response[0]);
  };

  render() {
    return (
      <React.Fragment>
        <div className="groupForm">
          <Formik
            enableReinitialize={true}
            validationSchema={groupsValidationSchema}
            initialValues={this.state.groupData}
            onSubmit={this.handleSubmit}
          >
            {(props) => {
              const { values, touched, errors, setFieldValue } = props;
              return (
                <Form className={"col-md-6 card pt-4"}>
                  <FormGroup>
                    <Label>Group Name</Label>
                    <Field
                      name="name"
                      type="text"
                      values={values.name}
                      placeholder="Group Name"
                      autoComplete="off"
                      className={"form-control"}
                    />
                    {errors.name && touched.name && (
                      <span className="input-feedback">{errors.name}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>Image Url</Label>
                    <FileUpload
                      isMultiple={false}
                      onUploadSuccess={(response) =>
                        this.handleFileChange(response, setFieldValue)
                      }
                    />
                    <div className="col-4">
                      {values.imageUrl && (
                        <img
                          className="img-100"
                          alt="404"
                          src={values.imageUrl}
                        />
                      )}
                    </div>
                    {errors.imageUrl && touched.imageUrl && (
                      <span className="input-feedback">{errors.imageUrl}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>Description</Label>
                    <Field
                      component="textarea"
                      rows="3"
                      name="description"
                      type="text"
                      values={values.description}
                      placeholder="text"
                      autoComplete="off"
                      className={"form-control"}
                    />
                    {errors.description && touched.description && (
                      <span className="input-feedback">
                        {errors.description}
                      </span>
                    )}
                  </FormGroup>
                  <div className="btn-group groupFormButtons">
                    <button
                      onClick={this.moveToGroups}
                      type="button"
                      className="btn btn-light groupAddButton"
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary groupAddButton"
                      type="submit"
                    >
                      {this.state.groupData.id ? "Update" : "Create"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </React.Fragment>
    );
  }
}
// Validation
GroupForm.propTypes = {
  list: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    isActive: PropTypes.bool,
    isPrivate: PropTypes.bool,
    CreatedBy: PropTypes.number,
  }),
  handleSubmit: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.number }) }),
  location: PropTypes.shape({ state: PropTypes.func }),
};
export default withRouter(GroupForm);
