import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export default function updateBtn() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="updateBtn" onClick={handleShow}>
        <FiEdit2 />
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete this post?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Update</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
