import { useState, cloneElement } from "react";
import { Modal, Button } from "react-bootstrap";

function FormModal({ trigger, title, body }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {trigger ? (
        <div onClick={handleShow}>{trigger}</div>
      ) : (
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cloneElement(body, { onClose: handleClose, onReset: handleClose })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormModal;
