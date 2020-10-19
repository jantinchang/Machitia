import React from "react";
import _logger from "sabio-debug";
import PropTypes from "prop-types"; //Needs to be imported before you can use it.
var path = require("path");

const FeedCard = ({ feed, handleDelete, handleButton }) => {
  _logger(handleDelete);

  const onDeleteClick = () => {
    handleDelete(feed);
  };

  return (
    <React.Fragment>
      <div className="align-self-center media">
        <img
          src={feed.avatarUrl}
          alt={"User Img"}
          className="align-self-center media"
        />
      </div>
      <p className="text-center">{feed.content}</p>
      <div>
        <img src={feed.url} alt={path.extname(feed.url)} />
        <br />
        <a href={feed.url} download>
          Click to download {path.extname(feed.url)}
        </a>
      </div>
      <div>
        {handleButton(feed) && (
          <button
            type="button"
            className="btn btn-sm-pill btn-danger float-right"
            onClick={onDeleteClick}
          >
            Delete
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

FeedCard.propTypes = {
  feed: PropTypes.shape({
    content: PropTypes.string,
    avatarUrl: PropTypes.string,
    url: PropTypes.string,
    feedStatusId: PropTypes.number,
    createdBy: PropTypes.number,
  }),
  handleDelete: PropTypes.func,
  handleButton: PropTypes.func,
};

export default FeedCard;
