import React from "react";
import _logger from "sabio-debug";
import PropTypes from "prop-types";
import "../../assets/css/blogs.css";

const BlogCard = ({ blog, handleEdit, handleRead }) => {
  _logger(handleEdit);

  const onEditClick = () => {
    handleEdit(blog);
  };

  const onReadClick = () => {
    handleRead(blog);
  };
  const dummyImgUrl =
    "https://i.pinimg.com/236x/c6/8e/bc/c68ebcd8dbb77ef644be75f235bd0695--the-obsession-david-bowie.jpg";

  return (
    <React.Fragment>
      <div className="col-md-6 col-xl-3">
        <div className="card">
          <div className="blog-box blog-grid text-center">
            <img
              className="blogImg"
              src={blog.imageUrl || dummyImgUrl}
              alt="blogphoto"
            />
            <div className="blog-details-main">
              <ul className="blog-social">
                <li className="digits">{blog.datePublished}</li>
                <li className="digits">{blog.subject}</li>
                <li className="digits">60 Hits</li>
              </ul>
              <hr />
              <h6 className="blog-bottom-details">{blog.title}</h6>
              <button
                type="button"
                className="btn-pill btn btn-warning btn-sm float-left"
                onClick={onEditClick}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                type="button"
                className="btn-pill btn btn-secondary btn-sm float-right"
                onClick={onReadClick}
              >
                <i className="fa fa-info"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    subject: PropTypes.string,
    datePublished: PropTypes.instanceOf(Date),
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    blogTypeId: PropTypes.number,
  }),
  onDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleRead: PropTypes.func,
};

export default BlogCard;
