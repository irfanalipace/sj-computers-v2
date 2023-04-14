import React, { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import img1 from '@images/bottom-arrow.png'
import "./LocationModel.css";
function UpdateStateModel() {
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="d-flex align-items-center justify-content-center header-position">
                <Button
                    variant="primary"
                    onClick={handleShow}
                    style={{
                        background: "#00305E",
                        border: "#00305E",
                    }}
                >
                    <p></p>Deliver to <br></br> California
                </Button>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header className="header">
                    <Modal.Title>Choose to your location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted text-p">
                        Delivery option and delivery location may vary for
                        different locations.
                    </p>

                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary login-button"
                        >
                            Sign in to see your address
                        </button>
                    </div>
                    <h5
                        className="login-button-box"
                        style={{
                            fontSize: "14px",
                            marginTop: "8px",
                            color: "#333333",
                            bottom: "8px",
                        }}
                    >
                        or enter a US zip code
                    </h5>
                    <div className="row">
                        <div className="col-md-8">
                            <input
                                type="text"
                                placeholder=" Enter zip code"
                                className="button-input"
                            />
                        </div>
                        <div className="col-md-4">
                            <button type="button" className="button-box">
                                Apply
                            </button>
                        </div>
                    </div>
                    <h5
                        className="h"
                        style={{
                            fontSize: "14px",
                            marginTop: "8px",
                            color: "#333333",
                            bottom: "8px",
                        }}
                    >
                        or
                    </h5>
                    <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic" className="dropdown-button-box">
                        Ship outside the US 
                        <img src={img1} className="img-arrow" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="menus-sets">
                            <Dropdown.Item>
                                <h6
                                    type="checkbox"
                                    name="option1"
                                    value="option1"
                                />{" "}
                                Aus
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <h6
                                    type="checkbox"
                                    name="option2"
                                    value="option2"
                                />{" "}
                                Russia
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <h6
                                    type="checkbox"
                                    name="option3"
                                    value="option3"
                                />{" "}
                                USA
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    <Button  onClick={handleClose} className="done-button">
                      Done
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateStateModel;
