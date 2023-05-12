import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import { SquareForm } from "./Square/SquareForm";
import "./PaymentMethod.css";

const PaymentModal = ({ isOpen = false, handleClose }) => {
    const [showCloseBtn, setShowCloseBtn] = useState(true);
    const hideCloseBtn = () => {
        console.log("handleClose");
        setShowCloseBtn(false);
    };

    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            centered
            className="payment-model"
            size="md"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="header" closeButton={showCloseBtn}>
                <Modal.Title>
                    <span className="payment-header-text">
                        Enter Card Details
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SquareForm
                    hideCloseBtn={hideCloseBtn}
                    hideModal={handleClose}
                />
            </Modal.Body>
        </Modal>
    );
};

export default PaymentModal;
