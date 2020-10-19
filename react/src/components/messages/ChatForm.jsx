import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { IconButton, InputBase, Paper, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
function ChatForm(props) {
  const classes = useStyles();
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    props.onInputChange(name, value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSend();
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        onChange={handleInputChange}
        name="message"
        id="message"
        value={props.message}
        inputProps={{ "aria-label": "search google maps" }}
      />

      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} onClick={handleSubmit}>
        <i className="icofont icofont-ui-text-chat"></i>
      </IconButton>
    </Paper>
  );
}
ChatForm.propTypes = {
  onSend: PropTypes.func,
  onInputChange: PropTypes.func,
  message: PropTypes.string,
};
export default ChatForm;
