import React from "react";
import { Form, FormGroup, Label } from "reactstrap";
import { Formik, Field } from "formik";
import logger from "sabio-debug";
import { withRouter } from "react-router-dom";
import {
  create,
  edit,
  getById,
  unpublish,
} from "./../../services/blogServices";
import blogValidationSchema from "./../../schema/BlogValidationSchema";
import getType from "./../../services/lookUpService";
import PropTypes from "prop-types"; //Needs to be imported before you can use it.
import { toast } from "react-toastify";
import FileUpload from "./../fileUpload/FileUploadForm";
import "../../assets/css/blogs.css";

const _logger = logger.extend("BlogForm");

class BlogForm extends React.Component {
  state = {
    formData: {
      title: "",
      subject: "",
      content: "",
      blogTypeId: "",
      isPublished: "",
      imageUrl:
        "https://i.pinimg.com/236x/c6/8e/bc/c68ebcd8dbb77ef644be75f235bd0695--the-obsession-david-bowie.jpg",
    },
    blogTypes: [],
    mappedBlogTypes: [],
  };

  componentDidMount() {
    getType("BlogTypes")
      .then(this.onBlogTypeGetSuccess)
      .catch(this.onBlogTypeGetError);

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

  onBlogTypeGetSuccess = (response) => {
    _logger(response.items);
    //set state
    const blogTypes = response.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        blogTypes,
        mappedBlogTypes: blogTypes.map(this.mapBlogType),
      };
    });
  };

  onBlogTypeGetError = (response) => {
    _logger(response);
  };

  handleFileChange = (response, setFieldValue) => {
    _logger(response, setFieldValue);
    setFieldValue("imageUrl", response[0]);
  };

  mapBlogType = (type) => <option value={type.id}>{type.name}</option>;

  handleSubmit = (values) => {
    _logger(values);

    values.blogTypeId = parseInt(values.blogTypeId);

    if (values.id) {
      edit(values).then(this.onEditSuccess).catch(this.onEditError);
    } else {
      create(values).then(this.onAddSuccess).catch(this.onAddError);
    }
  };

  onAddSuccess = (response) => {
    _logger(response);
    toast.success("Blog Published!");
    this.sendToBlogsRoute();
  };

  onAddError = (response) => {
    return Promise.reject(response);
  };

  onEditSuccess = (response) => {
    _logger(response);
    this.sendToBlogsRoute();
  };

  onEditError = (response) => {
    return Promise.reject(response);
  };

  sendToBlogsRoute = () => {
    this.props.history.push("/blogs");
  };

  handleUnpublish = () => {
    if (this.props.match.params && this.props.match.params.id) {
      unpublish(this.props.match.params.id)
        .then(this.onUnpublishSucccess)
        .catch(this.onUnpublishError);
    }
    this.sendToBlogsRoute();
  };

  onUnpublishSucccess = (config) => {
    _logger(config);
    this.setState({ isPublished: false });
  };
  onUnpublishError = (config) => {
    _logger(config);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <Formik
            enableReinitialize={true}
            validationSchema={blogValidationSchema}
            initialValues={this.state.formData}
            onSubmit={this.handleSubmit}
          >
            {(formikProps) => {
              const {
                values,
                touched,
                errors,
                setFieldValue,
                handleSubmit,
              } = formikProps;
              return (
                <React.Fragment>
                  <Form className={"col-md-6 card"} onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label>Blog Title</Label>
                      <Field
                        name="title"
                        type="text"
                        values={values.Title}
                        placeholder="Blog Title"
                        autoComplete="off"
                        className={
                          errors.Title && touched.Title
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      {errors.Title && touched.Title && (
                        <span className="input-feedback">{errors.Title}</span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Subject</Label>
                      <Field
                        name="subject"
                        type="text"
                        values={values.Subject}
                        placeholder="Subject"
                        autoComplete="off"
                        className={
                          errors.Subject && touched.Subject
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      {errors.Subject && touched.Subject && (
                        <span className="input-feedback">{errors.Subject}</span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Content</Label>
                      <Field
                        name="content"
                        component="textarea"
                        rows="25"
                        values={values.Content}
                        placeholder="Content"
                        className={
                          errors.Content && touched.Content
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      {errors.Content && touched.Content && (
                        <span className="input-feedback">{errors.Content}</span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Image</Label>
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
                        <span className="input-feedback">
                          {errors.imageUrl}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Subject</Label>
                      <Field
                        name="blogTypeId"
                        component="select"
                        values={values.blogTypeId}
                        className={
                          errors.blogTypeId && touched.blogTypeId
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        as="select"
                      >
                        <option value="">Select</option>
                        {this.state.mappedBlogTypes}
                      </Field>
                      {errors.blogTypeId && touched.blogTypeId && (
                        <span className="input-feedback">
                          {errors.blogTypeId}
                        </span>
                      )}
                    </FormGroup>
                    <div>
                      <label>
                        <Field
                          name="isPublished"
                          value={false}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="checkbox"
                              checked={values.isPublished}
                              value="false"
                            />
                          )}
                        />
                        <span className="ml-3"></span> Publish
                      </label>
                    </div>
                    <div className="submission">
                      <button type="submit" className="btn btn-success">
                        Submit
                      </button>
                    </div>
                  </Form>
                  <div className="col-md-6 card">
                    <div className="card">
                      <div className="blog-box blog-list row">
                        <div className="col-sm-5">
                          <img
                            src={values.imageUrl}
                            alt="alt"
                            className="img-fluid sm-100-w media"
                          />
                        </div>
                        <div className="col-sm-7">
                          <div className="blog-details">
                            <h6>{values.title}</h6>
                            <div className="blog-bottom-content">
                              <ul className="blog-social">
                                <li className="digits">{values.subject}</li>
                              </ul>
                              <hr />
                              <p className="mt-0">{values.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            }}
          </Formik>
        </div>
      </React.Fragment>
    );
  }
}
BlogForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
  location: PropTypes.shape({ state: PropTypes.func }),
};

export default withRouter(BlogForm);
