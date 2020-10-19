import React from "react";
import { paginate, pagedType } from "./../../services/blogServices";
import logger from "sabio-debug";
import BlogCard from "./BlogCard";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";
import "../../assets/css/blogs.css";
import "rc-pagination/assets/index.css";

import getType from "../../services/lookUpService";
import { withRouter } from "react-router-dom";

const _logger = logger.extend("BlogList");

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 8,
      totalCount: 10,
      blogs: [],
      mappedBlogs: [], // React Elements
      blogTypes: [],
      mappedBlogTypes: [],
    };
  }

  //showing the blog list
  componentDidMount() {
    _logger("componentDidMount");
    getType("BlogTypes")
      .then(this.onGetBlogTypeSuccess)
      .catch(this.onGetBlogTypeError);
  }

  //BlogType functions
  onGetBlogTypeSuccess = (response) => {
    const blogTypes = response.items;
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          blogTypes,
          mappedBlogTypes: blogTypes.map(this.mapBlogType),
        };
      },
      () => this.getPaginate(this.state.currentPage - 1, this.state.pageSize)
    );
  };
  onGetBlogTypeError = (response) => {
    _logger(response);
  };

  //selecting by blogtype
  onTypeChange = (event) => {
    const blogType = event.target.value;
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: 1,
          blogType,
        };
      },
      () => this.returnSearchCondition(blogType)
    );
  };

  returnSearchCondition = (blogType) => {
    blogType > 0
      ? pagedType(this.state.currentPage - 1, this.state.pageSize, blogType)
          .then(this.onGetSuccess)
          .catch(this.onBlogFilterError)
      : paginate(this.state.currentPage - 1, this.state.pageSize)
          .then(this.onGetSuccess)
          .catch(this.onGetError);
  };

  //Error on filtering specific blogs
  onBlogFilterError = (config) => {
    _logger(config);

    this.setState((prevState) => {
      return {
        ...prevState,
        blogs: [],
        mappedBlogs: [],
        currentPage: 1,
        totalCount: 10,
      };
    });
  };

  //pagination
  onChange = (page) => {
    this.setState({ currentPage: page }, () =>
      this.returnSearchCondition(this.state.blogType)
    );
  };

  //------------------------------------

  getPaginate = (pageIndex, pageSize) => {
    paginate(pageIndex, pageSize)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };

  onGetSuccess = (response) => {
    this.setState(() => {
      const blogs = response.item.pagedItems;
      let totalCount = response.item.totalCount;
      const obj = {
        mappedBlogs: blogs.map(this.mapBlog),
        blogs,
        totalCount,
      };
      return obj;
    });
  };

  onGetError = (response) => {
    return Promise.reject(response);
  };

  //Editing a blog
  handleEdit = (blog) => {
    this.props.history.push(`/blog/${blog.id}/edit`, blog);
  };

  //Adding a new blog
  handleAdd = () => {
    this.props.history.push("/blog/create");
  };

  //Reading a blog
  handleRead = (blog) => {
    this.props.history.push(`/blogs/${blog.id}/details`);
  };

  mapBlog = (blog) => (
    <BlogCard
      blog={blog}
      key={`blog_${blog.id}${+3}`}
      handleEdit={this.handleEdit}
      handleRead={this.handleRead}
    />
  );
  mapBlogType = (type) => (
    <option value={type.id} name={type.name}>
      {type.name}
    </option>
  );

  changePagePize = (e) => {
    const pageSize = parseInt(e.target.value);
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          pageSize,
          currentPage: 1,
          searchTerm: "",
        };
      },
      () => this.returnSearchCondition()
    );
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="blogHeader">Blogs</h1>
        <div className="container-fluid">
          <div className="row col-md-12 pt-4">
            <div className="col-md-3 row">
              <div className="col-md-4 pl-0">
                <button
                  type="button"
                  className=" 
                            btn btn-secondary 
                            btn-air-secondary 
                            btn-lg"
                  onClick={this.handleAdd}
                >
                  New
                </button>
              </div>

              <select
                className="form-control col-md-8"
                onChange={this.onTypeChange}
              >
                <option value="0"> Please select a type</option>
                {this.state.mappedBlogTypes}
              </select>
            </div>

            <Pagination
              onChange={this.onChange}
              current={this.state.currentPage}
              total={this.state.totalCount}
              pageSize={this.state.pageSize}
              className="col-md-7 text-center"
            />

            <select
              name="pageSize"
              className="col-md-2 form-control"
              onChange={this.changePagePize}
            >
              <option value="8"> Default Size 8</option>
              <option value="16"> 16 </option>
              <option value="32"> 32</option>
              <option value="50"> 50 </option>
              <option value="100"> 100 </option>
            </select>
          </div>
        </div>
        <div>
          <div className="row pt-4">{this.state.mappedBlogs}</div>
        </div>
      </React.Fragment>
    );
  }
}

BlogList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(BlogList);
