import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Alert } from "reactstrap";
import MessageCard from "./MessageCard";

function MessageIndex(props) {
  const el = useRef(null);

  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });

  const addDates = (messages) => {
    let list = [];
    let lastDateTag = "";
    let i;
    for (i = 0; i < messages.length; i++) {
      let newTag = checkDateTag(lastDateTag, messages[i].dateSent);
      if (newTag) {
        lastDateTag = newTag;
        list.push({ dateTag: newTag });
      }
      list.push(messages[i]);
    }
    return list;
  };

  const checkDateTag = (lastTag, dateTime2) => {
    if (dateTime2) {
      let newDate = new Date(dateTime2);
      let newTag = newDate.toLocaleDateString();
      if (lastTag === newTag) {
        return false;
      } else return newTag;
    } else {
      if (lastTag === "Now") {
        return false;
      } else {
        return "Now";
      }
    }
  };

  return (
    <div className="call-chat-body">
      <div className="card">
        <div className="card-body">
          <div className="row chat-box">
            <div className="col chat-right-aside">
              <div className="chat">
                <Grid container>
                  <Grid item xs={12}>
                    <div className="chat-header clearfix">
                      <img
                        src={props.correspondent.avatarUrl}
                        className="rounded-circle"
                        alt=""
                      />
                      <div className="about">
                        <div className="name">
                          {props.correspondent.firstName}{" "}
                          {props.correspondent.lastName}
                          <span className="font-primary f-12"></span>
                        </div>
                        <div className="status digits"></div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="chat-history chat-msg-box custom-scrollbar">
                      <ul>
                        {addDates(props.messages).map((item, index) => {
                          if (item.dateTag) {
                            return (
                              <li className="clearfix" key={"alert" + index}>
                                <Alert color="dark">{item.dateTag}</Alert>
                              </li>
                            );
                          } else {
                            return (
                              <MessageCard
                                key={item.dateSent + index}
                                message={item.message}
                                time={item.dateSent || "Now"}
                                isDifferentUser={
                                  item.recipientId ===
                                  props.correspondent.userId
                                    ? true
                                    : false
                                }
                              ></MessageCard>
                            );
                          }
                        })}
                        <div id={"el"} ref={el}></div>
                      </ul>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MessageIndex.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      message: PropTypes.string.isRequired,
      time: PropTypes.string,
      recipientId: PropTypes.number.isRequired,
      senderId: PropTypes.number.isRequired,
    })
  ),
  correspondent: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
};
export default MessageIndex;
