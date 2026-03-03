import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * onClose - function to close the modal, passed from SimpleModal
 * onLogout - function to perform logout action, passed from parent component
 */
const LogoutModal = ({ onClose, onLogout }) => {
    const [loading, setLoading] = useState(false);

    const handleLogoutClick = async () => {
        setLoading(true);
        await onLogout();
        setLoading(false);
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout?</Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleLogoutClick} disabled={loading}>
                    {loading ? "Logging out..." : "Logout"}
                </Button>
            </Modal.Footer>
        </>
    );
}

export default LogoutModal;