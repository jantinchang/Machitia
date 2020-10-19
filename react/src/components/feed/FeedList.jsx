import React from "react";
import FeedCard from "./FeedCard";
import { Card, Form, FormGroup, Label } from "reactstrap";
import Comments from "./../common/comments/Comments";
import { PropTypes } from "prop-types";
import logger from "sabio-debug";
import "rc-pagination/assets/index.css";
import { Formik, Field } from "formik";
import {
  getFeed,
  insert,
  getById,
  remove,
} from "./../../services/feedServices";
import feedValidationSchema from "./../../schema/FeedValidationSchema";
import { toast } from "react-toastify";
import FileUpload from "./../fileUpload/FileUploadForm";

const _logger = logger.extend("Feed"); //anywhere in the app.

class FeedsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      mappedFeeds: [],
      formData: {
        content: "",
        url: "",
        feedStatusId: 1,
      },
    };
  }

  componentDidMount() {
    getFeed().then(this.onFeedSuccess).catch(this.handleError);
    logger(this.state.createdBy);
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
  onFeedSuccess = (response) => {
    const feeds = response.item;
    this.setState((prevState) => {
      return {
        ...prevState,
        feeds,
        mappedFeeds: feeds.map(this.mapFeed),
        createdBy: feeds.createdBy,
      };
    });
  };
  handleError = (error) => {
    _logger(error);
  };
  mapFeed = (feed) => (
    <Card>
      <div className="custom-card">
        <div className="text-center">
          <div className="comment-box">
            <FeedCard
              feed={feed}
              key={feed.id}
              handleDelete={this.handleDelete}
              handleButton={this.handleButton}
            />
          </div>
        </div>
        <Comments
          currentUser={this.props.currentUser}
          entityId={feed.id}
          entityTypeId={6}
        />
      </div>
    </Card>
  );
  handleDelete = (feed) => {
    remove(feed).then(this.onDeleteSuccess(feed)).catch(this.onDeleteError);
  };
  onDeleteSuccess = (data) => {
    toast.success("Delete Successful!", {
      closeOnClick: true,
      position: "top-center",
    });
    return data;
  };
  onDeleteError = () => {
    toast.error("Delete Failed!", {
      closeOnClick: true,
      position: "top-center",
    });
    _logger("Delete Failed!");
  };

  setFormData = (formData) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData,
      };
    }, this.stateChanged);
  };
  onGetByIdError = (error) => {
    _logger(error);
  };
  handleSubmit = (values) => {
    _logger(values);
    insert(values).then(this.onAddSuccess).catch(this.onAddError);
  };
  onAddSuccess = (response) => {
    _logger(response);
    toast.success("Feed Published!");
  };
  onAddError = (response) => {
    return Promise.reject(response);
  };

  handleButton = (feed) => {
    if (this.props.currentUser.id === feed.createdBy) {
      logger("yes");
      const showButton = true;
      return showButton;
    } else {
      logger("no");
      const showButton = false;
      return showButton;
    }
  };

  handleFileChange = (response, setFieldValue) => {
    _logger(response, setFieldValue);
    setFieldValue("url", response[0]);
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={feedValidationSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              setFieldValue,
              handleSubmit,
            } = props;
            return (
              <Form className={"col-md-6 pt-4"} onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Content</Label>
                  <Field
                    name="content"
                    component="textarea"
                    rows="5"
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
                  <Label>File Upload</Label>
                  <FileUpload
                    isMultiple={false}
                    mimeString=""
                    onUploadSuccess={(response) =>
                      this.handleFileChange(response, setFieldValue)
                    }
                  />
                  {errors.url && touched.url && (
                    <span className="input-feedback">{errors.url}</span>
                  )}
                </FormGroup>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
        <div className="container cardList">{this.state.mappedFeeds}</div>;
      </React.Fragment>
    );
  }
}
FeedsList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
  location: PropTypes.shape({ state: PropTypes.func }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default FeedsList;
