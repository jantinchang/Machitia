import React from "react";
import PropTypes from "prop-types";

function MessageCard(props) {
  var time = "";
  if (props.time === "Now") {
    time = props.time;
  } else {
    const date = new Date(props.time);
    time = date.toLocaleTimeString();
  }
  return (
    <li className="clearfix">
      <div
        className={
          props.isDifferentUser
            ? "message other-message float-right"
            : "message my-message mb-0"
        }
      >
        <img
          src="../assets/images/user/12.png"
          className={
            props.isDifferentUser
              ? "rounded-circle float-right chat-user-img img-30"
              : "rounded-circle float-left chat-user-img img-30"
          }
          alt=""
        />
        <div className="message-data">
          <span className="message-data-time">{time}</span>
        </div>
        {props.message}
      </div>
    </li>
  );
}
MessageCard.propTypes = {
  message: PropTypes.string.isRequired,
  isDifferentUser: PropTypes.bool.isRequired,
  time: PropTypes.string,
};
export default MessageCard;
