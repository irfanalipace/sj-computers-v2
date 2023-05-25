import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchStates } from "@store/states/statesThunks";
import img1 from "@images/bottom-arrow.png";
import { updateState } from "@store/states/statesThunks";
import { UPDATE_STATE } from "@store/states/statesSlice";
import Loader from "@common/Spinner/Spinner";

import "./LocationModel.css";
function UpdateStateModel({ isOpen = false, handleClose }) {
    const states = useSelector((state) => state.states.states);
    const isLoading = useSelector((state) => state.states.isLoading);
    const [state, setState] = useState("Set Delivery Address");
    const [zipCode, setZipCode] = useState("");
    const [showModal, setShowModal] = useState(isOpen);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // useEffect(() => {
    //     setShowModal(true);

    //     return;
    //     let timer;

    //     const handleModal = () => {
    //       timer = setTimeout(() => {
    //       }, 5000);
    //     };

    //     // Check if it's the first visit
    //     const isFirstVisit = localStorage.getItem('firstVisit') === null;

    //     if (isFirstVisit) {
    //       // Show the modal after 5 seconds
    //       handleModal();

    //       // Set a flag to indicate the first visit
    //       localStorage.setItem('firstVisit', 'true');
    //     }

    //     // Clear the timer when the component unmounts or when the user closes the modal
    //     return () => clearTimeout(timer);
    //   }, []);
    //   console.log(showModal, 'modal')

    useEffect(() => {
        dispatch(fetchStates());
    }, []);

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value.replace(/\D/g, ""));
    };

    const clickHandler = async () => {
        // local state me store
        // console.log(state, "state data");
        if (state?.id) {
            if (isAuthenticated) {
                dispatch(updateState(state, handleClose));
            } else {
                dispatch(UPDATE_STATE(state));
                // saveUserState(state);
                handleClose();
            }
        }
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
            show={showModal}
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
                        <div className="row">
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    onChange={handleZipCodeChange}
                                    value={zipCode}
                                    placeholder=" Enter zip code"
                                    className="button-input-fields-button"
                                />
                            </div>
                            <div className="col-md-4">
                                <button
                                    onClick={findZipCode}
                                    type="button"
                                    className="button-box-locationmodel-button"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="hrozantel-hr-location-model">
                            <h5 className="h5-model-box-loction">or</h5>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                className="dropdown-button-box d-flex justify-content-between align-items-center "
                            >
                                {state?.name || "Select State"}
                                <img src={img1} className="img-arrow" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="">
                                {states.map((state) => (
                                    <Dropdown.Item
                                        className="drop menus-set my-location-dropdown-model-box-buttons"
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
                    <>
                        <div className="row my-3">
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    onChange={handleZipCodeChange}
                                    value={zipCode}
                                    placeholder=" Enter zip code"
                                    className="button-input-fields-button"
                                />
                            </div>
                            <div className="col-md-4">
                                <button
                                    onClick={findZipCode}
                                    type="button"
                                    className="button-box-locationmodel-button"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <Dropdown>
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                className="dropdown-button-box d-flex justify-content-between align-items-center"
                            >
                                {state?.name || "Select State"}
                                <img src={img1} className="img-arrow" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="">
                                {states.map((state) => (
                                    <Dropdown.Item
                                        className="drop menus-set my-location-dropdown-model-box-buttons"
                                        onClick={() => setState(state)}
                                        key={state.id}
                                    >
                                        <h6>{state.name}</h6>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            onClick={clickHandler}
                            className="done-button my-3 px-0 mx-0"
                        >
                            {isLoading ? <Loader /> : "Done"}
                        </Button>
                        <div className="hrozantel-hr-location-model">
                            <h5 className="h5-model-box-loction">or</h5>
                        </div>
                        <Link to={"/login"}>
                            <button className="location-button">
                                Sign in to see your address
                            </button>
                        </Link>
                    </>

                    // </div>
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
