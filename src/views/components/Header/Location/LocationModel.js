import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchStates } from "@store/states/statesThunks";
import img1 from "@images/bottom-arrow.png";
import "./LocationModel.css";
function UpdateStateModel({ isOpen, handleClose }) {
    const states = useSelector((state) => state.states.states);
    const [state, setState] = useState("Ship outside the US");
    const [zipCode, setZipCode] = useState("");
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(fetchStates());
    }, []);

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value.replace(/\D/g, ""));
    };

    const findZipCode = () => {
        setState(states.filter((state) => state.zip_code_start == zipCode)[0]);
    };

    console.log("state: ", state);

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

                {isAuthenticated && (
                    <div className="d-grid justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-primary login-button"
                        >
                            Sign in to see your address
                        </button>
                    </div>
                )}

                <h5
                    className="login-button-box"
                    style={{
                        fontSize: "14px",
                        marginTop: "8px",
                        color: "#333333",
                        bottom: "8px",
                    }}
                >
                    Enter a US zip code
                </h5>
                <div className="row">
                    <div className="col-md-8">
                        <input
                            type="text"
                            onChange={handleZipCodeChange}
                            value={zipCode}
                            placeholder=" Enter zip code"
                            className="button-input"
                        />
                    </div>
                    <div className="col-md-4">
                        <button
                            onClick={findZipCode}
                            type="button"
                            className="button-box"
                        >
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
                        {state?.name || "Select State"}
                        <img src={img1} className="img-arrow" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="menus-sets">
                        {states.map((state) => (
                            <Dropdown.Item
                                onClick={() => setState(state)}
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
