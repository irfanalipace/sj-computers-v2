import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchStates } from "@store/states/statesThunks";
import img1 from "@images/bottom-arrow.png";
import "./LocationModel.css";
function UpdateStateModel({ isOpen, handleClose }) {
    const states = useSelector((state) => state.states.states);
    const [state, setState] = useState("Ship outside the US");
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("modal showing");
        dispatch(fetchStates());
    }, []);

    return (
        <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header className="header">
                <Modal.Title>Choose to your location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-muted text-p">
                    Delivery option and delivery location may vary for different
                    locations.
                </p>

                <div className="d-grid justify-content-center">
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
                    <Dropdown.Toggle
                        id="dropdown-basic"
                        className="dropdown-button-box d-flex justify-content-between align-items-center"
                    >
                        {state}
                        <img src={img1} className="img-arrow" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="menus-sets">
                        {states.map((state) => (
                            <Dropdown.Item
                                onClick={() => setState(state.name)}
                                key={state.id}
                            >
                                <h6>{state.name}</h6>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} className="done-button">
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateStateModel;
