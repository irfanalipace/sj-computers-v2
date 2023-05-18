import React, { useState, useEffect } from "react";
import ModelBox from "./ModelBox";
import "./MobileScreenModel.css";
import imges1 from "@images/cart-product/location.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import ModelUserAuth from "./ModelUserAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchStates } from "@store/states/statesThunks";

const MobileScreenModel = () => {
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
            <header>
                <div className="color-card-dev">
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
            {isAuthenticated ? (
                        <div>
                            {showModal && <ModelBox closeModal={closeModal} />}
                        </div>
                    ) : (
                        <div>{showModal && <ModelUserAuth closeModal={closeModal}/>}</div>
                    )}
        </div>
    );
};

export default MobileScreenModel;
