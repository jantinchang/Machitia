import React, { Component } from "react";
import logger from "sabio-debug";

const _logger = logger.extend("Search");

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchbar: false
    };
  }

  handleSearchClick = () => {
    this.setState({
      searchbar: !this.state.searchbar
    });
    _logger(this.state.searchbar);
  };

  render() {
    const SearchIcon = require("../../../assets/images/dashboard/search.png");

    var searchStyle = {};
    if (this.state.searchbar) {
      searchStyle = {
        backgroundImage: "url(" + SearchIcon + ")",
        transform: "translateY(0) scaleY(1)",
        opacity: 1,
        visibility: "visible",
        transition: "all linear .3s"
      };
    } else {
      searchStyle = {
        backgroundImage: "url(" + SearchIcon + ")"
      };
    }

    return (
      <form className="form-inline search-form">
        <div className="form-group">
          <label className="sr-only">Email</label>
          <input
            type="search"
            className="form-control-plaintext"
            placeholder="Search.."
            style={searchStyle}
          />
          <span
            className="d-sm-none mobile-search"
            style={{ backgroundImage: "url(" + SearchIcon + ")" }}
            onClick={() => this.handleSearchClick()}
          />
        </div>
      </form>
    );
  }
}

export default Search;
