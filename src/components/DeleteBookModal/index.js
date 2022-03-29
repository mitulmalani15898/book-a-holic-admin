/** @author Prit Thakkar (B00890731) */
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./delete-book.css";

/**
 * 
 * @param { show, handleClose, handleBookDelete } for showing, closing and handling the book
 * delete event. 
 * @returns the delete modal for book deletion.
 */
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
