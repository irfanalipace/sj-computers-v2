import React, { useState, useEffect } from "react";
import "./MobileScreenModel.css";
import { updateState } from "@store/states/statesThunks";
import Loader from "@common/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchStates } from "@store/states/statesThunks";

const ModelUserAuth = ({ closeModal, isOpen = false, handleClose }) => {
  const states = useSelector((state) => state.states.states);
 const isLoading = useSelector((state) => state.states.isLoading);
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
    let state = states.find(
      (state) =>
        state.zip_code_start <= zipCode && state.zip_code_end >= zipCode
    );

    if (state?.id) {
      dispatch(updateState(state, handleClose));
    }

  };

  return (
    <div>
      <div className="modal-mobile-screen" show={isOpen}>
        <div className="modal-content-mobile-screen-box2">
          <div>
            <div className="zip-parant">
              <span className="zip-code-auth-box">Enter US zip code</span>
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
            </div>

            <div>
              <button className="close-button-done" onClick={closeModal}>
                <span className="box-button-text-mobile-screen">Done</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelUserAuth;
