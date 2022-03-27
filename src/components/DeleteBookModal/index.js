import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./delete-book.css";

function DeleteBookModal({show, handleClose, handleBookDelete}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this book?</p>
      </Modal.Body>

      <Modal.Footer>
       <div className="button-div"> 
        <Button variant="danger" onClick={handleBookDelete}>Delete</Button>
      </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteBookModal;
