import { Modal } from "react-bootstrap";

import { SquareForm } from "./SquareForm";
import "./SquareForm.css";

const SquareModal = ({ isOpen = false, handleClose }) => {
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            centered
            className="location-model"
        >
            <Modal.Header className="header">
                <Modal.Title>
                    <span className="location-header-text">
                        {" "}
                        Enter Card Details
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SquareForm />
            </Modal.Body>
        </Modal>
    );
};

export default SquareModal;
