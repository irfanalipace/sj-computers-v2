import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import imges from "@images/bottom-arrow.png";


export const CartOverLay = () => {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    return (
        <div>
            <button onClick={() => setSmShow(true)} className="me-2">
            onClick
            </button>

            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                className="box-cart"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        <h5>Delivery & Fee Details</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mein-text">
                    <div>
                        Price
                    </div>
                    <div>
                        $550
                    </div>
                    </div>
                    <div className="mein-text-dilvery">
                    <div>
                      Delivery Tax
                    </div>
                    <div>
                        $50
                    </div>
                    </div>
                    <hr></hr>
                    <div className="mein-text-dilvery">
                    <div>
                     Total
                    </div>
                    <div>
                        $600
                    </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Body>...</Modal.Body>
            </Modal>
        </div>
    );
};
