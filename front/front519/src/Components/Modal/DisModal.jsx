import { Modal } from "flowbite-react";
import { useState } from "react";

function DismissableModal(props) {
  return (
    <div>
      <Modal
        dismissible
        show={props.openShowModal}
        onClose={props.setCloseModal}
      >
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
    </div>
  );
}

export default DismissableModal;
