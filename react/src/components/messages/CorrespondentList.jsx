import React from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import CorrespondentCard from "./CorrespondentCard";
function CorrespondentList(props) {
  const onSelect = (correspondent) => {
    props.correspondentCallback(correspondent);
  };
  const onClickHandler = () => {
    props.createCallback();
  };
  const handleSearch = (event) => {
    const target = event.target;
    const value = target.value;
    props.handleSearch(value);
  };
  return (
    <div className="col call-chat-sidebar">
      <div className="card">
        <div className="card-body chat-body">
          <div className="chat-box">
            <div className="chat-left-aside">
              <TextField
                id="search-input"
                value={props.searchTerm}
                name="query"
                size="small"
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="icofont icofont-ui-search"></i>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <List className="people-list">
                {props.searchTerm.length === 0 ? (
                  <ListItem button onClick={onClickHandler}>
                    <ListItemIcon>
                      <i className="icofont icofont-ui-add"></i>
                    </ListItemIcon>
                    <ListItemText primary="Start Conversation"></ListItemText>
                  </ListItem>
                ) : (
                  <div></div>
                )}

                {props.correspondents.length > 0 ? (
                  props.correspondents.map((correspondent) => {
                    return (
                      <CorrespondentCard
                        correspondent={correspondent}
                        key={correspondent.userId}
                        onClick={onSelect}
                        isSelected={props.activeId === correspondent.userId}
                      ></CorrespondentCard>
                    );
                  })
                ) : (
                  <div>No Results for that search...</div>
                )}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
CorrespondentList.propTypes = {
  handleSearch: PropTypes.func,
  searchTerm: PropTypes.string,
  activeId: PropTypes.number,
  correspondentCallback: PropTypes.func,
  createCallback: PropTypes.func,
  correspondents: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    })
  ),
};
export default CorrespondentList;
