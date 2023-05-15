import { useState, useEffect } from "react";
import "./MobileScreenModel.css";

const ModelUserAuth = () => {
    return (
        <div>
            <div className="modal-mobile-screen">
                <div className="modal-content-mobile-screen-box2">
                    <div>
                        <div className="zip-parant">
                            <span className="zip-code-auth-box">
                                Enter US zip code{" "}
                            </span>
                        </div>

                        <hr className="box-text-hr-text"></hr>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your zip code"
                                className="zip-code-text-fields"
                            />
                        </div>
                        <div className="padding">
                            <button className="Apply-button-dilvery-box-auth">
                                Apply
                            </button>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ModelUserAuth;
