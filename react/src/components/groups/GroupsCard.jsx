import React from "react";
import { Card } from "reactstrap";
import "../../assets/css/groups.css";
import PropTypes from "prop-types";

const GroupsCard = ({
  group,
  handleEdit,
  likedGroups,
  handleFollow,
  handleRemove,
  handleDetails,
  userInfo,
}) => {
  const onEditClick = () => {
    handleEdit(group);
  };
  function onCardClicked() {
    handleDetails(group);
  }
  const slicedDescription = () => {
    var text = group.description;
    var slicedText = text.slice(0, 27);
    return slicedText;
  };

  const isLiked = likedGroups.includes(group.id);

  return (
    <React.Fragment>
      <Card className="groupCard" key={group.id}>
        <div onClick={onCardClicked}>
          <img src={group.imageUrl} alt="" className="groupImg" />
        </div>
        <div className="card-body groupCardBody">
          <h5>{group.name}</h5>
          <p className="groupText">{slicedDescription()}</p>
          {userInfo.currentUser.roles[0] === "Organization" &&
          userInfo.currentUser.id === group.createdBy ? (
            <i className="fa fa-edit float-left" onClick={onEditClick}></i>
          ) : null}

          <button
            type="button"
            className={`btn  btn-sm ${
              isLiked ? "unfollowButton btn-light" : "joinButton btn-primary"
            }`}
            onClick={() =>
              isLiked ? handleRemove(group.id) : handleFollow(group.id)
            }
          >
            {isLiked ? "UnFollow" : "Follow"}
          </button>
        </div>
      </Card>
    </React.Fragment>
  );
};

GroupsCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    isActive: PropTypes.bool,
    isPrivate: PropTypes.bool,
    createdBy: PropTypes.number,
  }).isRequired,

  handleEdit: PropTypes.func,
  handleFollow: PropTypes.func,
  handleRemove: PropTypes.func,
  likedGroups: PropTypes.arrayOf(PropTypes.number),
  handleDetails: PropTypes.func,
  toggleModal: PropTypes.func,
  isOpen: PropTypes.bool,
  userInfo: PropTypes.shape({
    currentUser: PropTypes.shape({
      id: PropTypes.number,
      isLoggedIn: PropTypes.bool,
      name: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};
export default GroupsCard;
