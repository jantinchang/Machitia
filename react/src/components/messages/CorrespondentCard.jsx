import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";

function CorrespondentCard(props) {
  const onClickHandler = (event) => {
    event.preventDefault();
    props.onClick(props.correspondent);
  };
  return (
    <ListItem button onClick={onClickHandler} selected={props.isSelected}>
      <ListItemAvatar>
        <Avatar src={props.correspondent.avatarUrl} alt=""></Avatar>
      </ListItemAvatar>
      <ListItemText>
        {props.correspondent.firstName} {props.correspondent.lastName}
      </ListItemText>
    </ListItem>
  );
}
CorrespondentCard.propTypes = {
  isSelected: PropTypes.bool,
  correspondent: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }),
  onClick: PropTypes.func,
};
export default CorrespondentCard;
