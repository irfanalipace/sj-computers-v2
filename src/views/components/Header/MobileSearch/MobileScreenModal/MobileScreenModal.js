import React, { useState, useEffect } from "react";
import ModalBox from "./ModalBox";
import "./MobileScreenModal.css";
import imges1 from "@images/cart-product/location.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import ModalUserAuth from "./ModalUserAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchStates } from "@store/states/statesThunks";

const MobileScreenModal = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(fetchStates());
    }, []);
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            {showModal && (
                <div
                    className="sidebarOverlaymobile"
                    onClick={closeModal}
                ></div>
            )}
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
            <div>
                {isAuthenticated ? (
                    <div>
                        <div>
                            {showModal && (
                                <ModalUserAuth closeModal={closeModal} />
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        {" "}
                        {showModal && <ModalBox closeModal={closeModal} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileScreenModal;
