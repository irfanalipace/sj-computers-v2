import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchStates } from "@store/states/statesThunks";
import img1 from "@images/bottom-arrow.png";
import { updateState } from "@store/states/statesThunks";
import Loader from "@common/Spinner/Spinner";

import "./LocationModel.css";
function UpdateStateModel({ isOpen = false, handleClose }) {
    const states = useSelector((state) => state.states.states);
    const isLoading = useSelector((state) => state.states.isLoading);
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

    const clickHandler = async () => {
        dispatch(updateState(state, handleClose));
    };

    const findZipCode = () => {
        setState(
            states.filter(
                (state) =>
                    state.zip_code_start <= zipCode &&
                    state.zip_code_end >= zipCode
            )[0]
        );
    };

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
                        Choose to your location
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className=" text-p">
                    Delivery option and delivery location may vary for different
                    locations.
                </span>

                {isAuthenticated ? (
                    <>
                        <h5 className="login-button-box">
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
                    </>
                ) : (
                    <div className="d-grid justify-content-center">
                        <Link to={"/login"}>
                            <button className="location-button">
                                Sign in to see your address
                            </button>
                        </Link>
                    </div>
                )}
            </Modal.Body>
            {isAuthenticated && (
                <Modal.Footer>
                    <Button onClick={clickHandler} className="done-button">
                        {isLoading ? <Loader /> : "Done"}
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default UpdateStateModel;
