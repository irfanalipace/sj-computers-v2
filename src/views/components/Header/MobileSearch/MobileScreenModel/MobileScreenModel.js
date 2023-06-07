import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStates, updateState } from "@store/states/statesThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ModelBox from "./ModelBox";
import ModelUserAuth from "./ModelUserAuth";
import Loader from "@common/Spinner/Spinner";
import imges1 from "@images/cart-product/location.png";
import "./MobileScreenModel.css";

const MobileScreenModel = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(fetchStates());
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [zipCode, setZipCode] = useState("");
    const states = useSelector((state) => state.states.states);
    const isLoading = useSelector((state) => state.states.isLoading);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value.replace(/\D/g, ""));
    };

    const clickHandler = async () => {
        let state = states.find(
            (state) =>
                state.zip_code_start <= zipCode && state.zip_code_end >= zipCode
        );

        if (state?.id) dispatch(updateState(state, closeModal));
    };

    return (
        <div>
            <header>
                <div className="color-card-dev mobile-enter-sub-button-screen">
                    <button
                        className="mobile-zip-code-box-image-dilvery-box"
                        onClick={handleButtonClick}
                    >
                        <FontAwesomeIcon
                            icon={faMapMarker}
                            style={{ marginRight: "0.5em" }}
                        />
                        <span style={{ color: "white" }}>
                            Enter US zip code
                        </span>
                    </button>
                </div>
            </header>

            <div className="modal-mobile-screen">
                <div className="modal-content-mobile-screen">
                <div>
                {/* {isOpen && (
                <div className="sidebarOverlay" onClick={toggleSidebar}></div>
            )} */}
                {!isAuthenticated ? (
                        <div>
                            {showModal && (
                                <div>
                                    <h5 className="box-text-dilver-location">
                                        Choose your location
                                    </h5>
                                    <p className="box-text-dilver-location-text-p">
                                        Delivery options and delivery speed may
                                        vary for different locations{" "}
                                    </p>
                                    <div className="padding-bottom-text-mobile-screen">
                                        <Link
                                            to="/login"
                                            className="done-dilvery-button text-decoration-none"
                                        >
                                            Sign to see your addresss
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {/* {showModal && ( */}
                                <div>
                                    <div className="zip-parant">
                                        <span className="zip-code-auth-box">
                                            Enter US zip code
                                        </span>
                                    </div>
                                    <hr className="box-text-hr-text" />
                                    <div>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Enter your zip code"
                                            className="zip-code-text-fields"
                                            onChange={handleZipCodeChange}
                                            value={zipCode}
                                        />
                                    </div>
                                    <div className="padding">
                                        <button
                                            className="Apply-button-dilvery-box-auth"
                                            onClick={clickHandler}
                                        >
                                            {isLoading ? <Loader /> : "Apply"}
                                        </button>
                                        <button
                                            className="close-button-done"
                                            onClick={closeModal}
                                        >
                                            <span className="box-button-text-mobile-screen">
                                                Done
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            {/* )} */}
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
};

export default MobileScreenModel;
