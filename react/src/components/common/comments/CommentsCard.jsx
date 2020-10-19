import React from "react";
import logger from "sabio-debug";

const _logger = logger.extend("CommentsCard");

function CommentsCard(props) {
  _logger(props.currentUser);
  let mapComment = (comment) => {
    const onEditClick = () => {
      props.onCommentClicked(comment);
    };
    const onDeleteCLick = () => {
      props.onDelete(comment);
    };
    const onReplyClick = () => {
      props.onReply(comment);
    };

    return (
      <React.Fragment key={comment.id}>
        <ul>
          <li>
            <div className="align-self-center media">
              {" "}
              <img
                src={comment.createdBy.avatarUrl}
                alt={"User Img"}
                className="align-self-center media"
              />
              <div className="media-body commentBody">
                <div className="row">
                  <div className="col-md-4">
                    <h6 className="mt-0">
                      {comment.createdBy.firstName +
                        " " +
                        comment.createdBy.lastName}
                    </h6>
                  </div>
                  <div className="col-md-8">
                    <ul className="comment-social float-left float-md-right">
                      <React.Fragment>
                        {comment.createdBy.userId === props.currentUser.id &&
                        props.currentUser.isLoggedIn ? (
                          <li className="digits">
                            <span onClick={onEditClick}>
                              <i className="fa fa-pencil-square-o"></i>
                            </span>
                          </li>
                        ) : null}
                        {comment.createdBy.userId === props.currentUser.id &&
                        props.currentUser.isLoggedIn ? (
                          <li className="digits">
                            <span onClick={onDeleteCLick}>
                              <i className="fa fa-times"></i>
                            </span>
                          </li>
                        ) : null}
                        {props.currentUser.isLoggedIn ? (
                          <li className="digits">
                            <span onClick={onReplyClick}>
                              <i className="fa fa-reply"></i>
                            </span>
                          </li>
                        ) : null}
                      </React.Fragment>
                    </ul>
                  </div>
                </div>
                <div>
                  <p>{comment.text}</p>
                </div>
              </div>
            </div>
          </li>
          {comment.replies && (
            <div className="reply">
              <CommentsCard
                myComments={comment.replies}
                onCommentClicked={props.onCommentClicked}
                onDelete={props.onDelete}
                onReply={props.onReply}
                currentUser={props.currentUser}
              />
            </div>
          )}
        </ul>
      </React.Fragment>
    );
  };

  return props.myComments.map(mapComment);
}
export default CommentsCard;
