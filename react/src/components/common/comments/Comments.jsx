import React from "react";
import CommentsCard from "./CommentsCard";
import {
  add,
  update,
  remove,
  getByEntity,
} from "../../../services/commentsServices";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("Commments");

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      formData: {
        subject: "",
        text: "",
        parentId: 0,
        entityTypeId: 0,
        entityId: 0,
        isDeleted: false,
      },
      showCommentForm: false,
    };
  }
  //-----------------------------
  componentDidMount() {
    // In the future it will be required -->
    const { entityId, entityTypeId } = this.props;
    this.getByEntityOnLoad(entityId, entityTypeId);
  }

  getByEntityOnLoad = (entityId, entityTypeId) => {
    getByEntity(entityId, entityTypeId)
      .then(this.onLaunchListSuccess)
      .then(this.updateCommentsList)
      .catch(this.onLaunchListFailure);
  };
  onLaunchListSuccess = (config) => {
    _logger(config.items);
    return config.items;
  };
  updateCommentsList = (comments) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        comments,
        formData: {
          entityTypeId: this.props.entityTypeId,
          entityId: this.props.entityId,
        },
      };
    }, this.stateChanged);
    _logger("List Loaded Successfully!", this.state.comments);
    return comments;
  };
  onLaunchListFailure = (config) => {
    _logger(config);
  };
  // Handle Submit
  handleSubmit = (values, { resetForm }) => {
    _logger(values, "");
    if (this.state.formData.id) {
      update(values)
        .then(() => this.onUpdateSuccess(values))
        .then(this.updateCommentInList)
        .catch(this.onUpdateError);
    } else {
      add(values)
        .then(() => this.onSubmitSuccess(values))
        .then(this.addToList)
        .catch(this.onSubmitError);
    }
    resetForm(this.state.formData);
  };

  onUpdateSuccess = (values) => {
    toast.success("Update Successful!", {
      closeOnClick: true,
      position: "top-center",
    });
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          subject: "",
          text: "",
          parentId: 0,
          entityTypeId: this.props.entityTypeId,
          entityId: this.props.entityId,
          isDeleted: false,
        },
        showCommentForm: false,
      };
    });
    return values;
  };
  updateCommentInList = () => {
    this.getByEntityOnLoad(this.props.entityId, this.props.entityTypeId);
  };
  onUpdateError = () => {
    toast.error("Update Failed!", {
      closeOnClick: true,
      position: "top-center",
    });
    _logger("Update Failed!");
  };
  onSubmitSuccess = (values) => {
    toast.success("Submit Successful!", {
      closeOnClick: true,
      position: "top-center",
    });
    this.toggleForm();
    _logger("Submit Successful!");
    return values;
  };
  addToList = () => {
    this.getByEntityOnLoad(this.props.entityId, this.props.entityTypeId);
  };
  onSubmitError = () => {
    toast.error("Submit Failed!", {
      closeOnClick: true,
      position: "top-center",
    });
    _logger("Submit Failed!");
  };
  // Handle Delete
  handleDelete = (comment) => {
    remove(comment)
      .then(() => this.onDeleteSuccess(comment))
      .then(this.deleteFromList)
      .catch(this.onDeleteError);
  };
  onDeleteSuccess = (data) => {
    toast.success("Delete Successful!", {
      closeOnClick: true,
      position: "top-center",
    });
    return data;
  };
  deleteFromList = () => {
    this.getByEntityOnLoad(this.props.entityId, this.props.entityTypeId);
  };
  onDeleteError = () => {
    toast.error("Delete Failed!", {
      closeOnClick: true,
      position: "top-center",
    });
    _logger("Delete Failed!");
  };
  //------------------------------
  toggleForm = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          subject: "",
          text: "",
          parentId: 0,
          entityTypeId: this.props.entityTypeId,
          entityId: this.props.entityId,
          isDeleted: false,
        },
        showCommentForm: !prevState.showCommentForm,
      };
    });
  };
  onEditClicked = (formData) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData,
        showCommentForm: true,
      };
    });
  };
  // Handle Reply
  handleReply = (values) => {
    _logger(values);
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          subject: "",
          text: "",
          parentId: values.id,
          entityTypeId: this.props.entityTypeId,
          entityId: this.props.entityId,
          isDeleted: false,
        },
        showCommentForm: true,
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <h4>Comment</h4>
          </div>
          <div className="col-md-6 ">
            {!this.state.showCommentForm && this.props.currentUser.isLoggedIn && (
              <button
                className="btn btn-primary float-right"
                onClick={this.toggleForm}
              >
                Add Comment
              </button>
            )}
          </div>

          {this.state.showCommentForm && (
            <CommentForm
              onCancel={this.toggleForm}
              formData={this.state.formData}
              handleSubmit={this.handleSubmit}
            />
          )}
          <section className="comment-box">
            <CommentsCard
              myComments={this.state.comments}
              onCommentClicked={this.onEditClicked}
              onDelete={this.handleDelete}
              onReply={this.handleReply}
              currentUser={this.props.currentUser}
            />
          </section>
        </div>
      </React.Fragment>
    );
  }
}

Comments.propTypes = {
  entityId: PropTypes.number,
  entityTypeId: PropTypes.number,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
  }),
};
export default Comments;
