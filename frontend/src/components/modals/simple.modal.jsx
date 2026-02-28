import { useState } from "react";
import { Spinner, Modal, Button, Alert } from "react-bootstrap";

function Simple({ trigger, onSuccess, title, body, buttonCancel = "Cancel", buttonApprove = "Confirm" }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSuccess = async () => {
    setLoading(true);
    await onSuccess();
    setLoading(false);
  };

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
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            {buttonCancel}  
          </Button>
          <Button variant="primary" onClick={handleSuccess} disabled={loading}>
            {loading && <Spinner animation="border" size="sm" className="me-2" />}
            {buttonApprove}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Simple;
