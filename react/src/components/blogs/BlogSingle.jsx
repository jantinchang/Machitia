import React from "react";
import { getById } from "../../services/blogServices";
import logger from "sabio-debug";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Comments from "./../common/comments/Comments";
import "../../assets/css/blogs.css";

class BlogSingle extends React.Component {
  state = {
    blog: {
      title: "",
      subject: "",
      content: "",
      imageUrl: "",
      datePublish: null,
      author: "",
    },
  };

  //rendering the single blog to read
  componentDidMount() {
    //prop
    getById(this.props.match.params.id)
      .then(this.onBlogGetSuccess)
      .catch(this.onBlogGetError);
  }

  //set state here
  onBlogGetSuccess = (response) => {
    logger("Blog retrieved");
    this.setState(() => {
      const blog = response.item;
      const obj = {
        blog,
      };
      return obj;
    });
    this.isPublishedQuery();
  };

  isPublishedQuery = () => {
    // {this.state.blog.isPublished ? this.setDatePublish : null}

    if (this.state.blog.isPublished) {
      this.setDatePublish();
    } else {
      return null;
    }
  };

  setDatePublish = (datePublished) => {
    return new Date(datePublished).toLocaleDateString();
  };

  onBlogGetError = (response) => {
    logger("Blog Failure");
    return Promise.reject(response);
  };

  handleReroute = () => {
    this.props.history.push(`/blogs`);
  };

  render() {
    return (
      <div className="blog-box blog-details">
        <div>
          <button
            type="button"
            className="reroute 
                        btn btn-secondary 
                        btn-air-secondary 
                        btn-md"
            onClick={this.handleReroute}
          >
            Return to list
          </button>
        </div>
        <img
          src={this.state.blog.imageUrl}
          className="singleImage"
          alt="blog-main"
        />
        <div className="blog-details">
          <ul className="blog-social">
            <li className="digits">
              {this.state.blog.datePublish
                ? this.setDatePublish(this.state.blog.datePublish)
                : null}
            </li>
            <li>
              <i className="icofont icofont-user" />
              {this.state.blog.author.firstName}
            </li>
            <li className="digits">
              <i className="icofont icofont-book-alt" />
              {this.state.blog.subject}
            </li>
            <li className="digits">
              <i className="icofont icofont-ui-chat" />4 Comments
            </li>
          </ul>
          <div className="single-blog-content-top">
            {this.state.blog.content}
          </div>

          {this.state.blog.id > 0 ? (
            <Comments
              className="mt-5"
              currentUser={this.props.currentUser}
              entityId={this.state.blog.id}
              entityTypeId={1}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

BlogSingle.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
  location: PropTypes.shape({ state: PropTypes.func }),
  currentUser: PropTypes.element,
};

export default withRouter(BlogSingle);
