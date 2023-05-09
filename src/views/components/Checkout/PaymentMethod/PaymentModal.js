import { Modal } from "react-bootstrap";

import { SquareForm } from "./Square/SquareForm";
import "./PaymentMethod.css";

const PaymentModal = ({ isOpen = false, handleClose }) => {
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            centered
            className="payment-model"
            size="md"
        >
            <Modal.Header className="header">
                <Modal.Title>
                    <span className="payment-header-text">
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

export default PaymentModal;
