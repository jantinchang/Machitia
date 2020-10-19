import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const GroupModal = ({ group, toggleModal, isOpen }) => {
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{group.name}</ModalHeader>
        <ModalBody>
          <div className="centerModal">
            {" "}
            {<img className="modalImg" alt="404" src={group.imageUrl} />}
          </div>
          <div> {group.description}</div>
        </ModalBody>
        <ModalFooter>
          <Button
            // className="unfollowButton"
            color="primary"
            onClick={toggleModal}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
// Validation
GroupModal.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    isActive: PropTypes.bool,
    isPrivate: PropTypes.bool,
    CreatedBy: PropTypes.number,
  }).isRequired,
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default GroupModal;
