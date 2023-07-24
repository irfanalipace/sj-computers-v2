import React from "react";
import { Link } from "react-router-dom";

export const CheckoutBox = ({toggleSidebar}) => {
console.log('hello toogle', toggleSidebar)
    return (
        <div>
           
                    <div className="modal-content">
                        <form>
                            <div className="dve-heading-data-login-checkout">
                                <h4 className="login-h3">
                                    Sign in to checkout
                                </h4>
                            </div>
                           
                            <div className="d-flex justify-content-center w-100">
                                <Link
                                    className="text-decoration-none"
                                    to={"/login"}
                                    onClick={toggleSidebar}
                                >
                                    {" "}
                                    <button 
                                   
                                    >
                                         Sign in
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <p className="small-text-paragrap">
                                    <Link
                                        to="/login"
                                        className="text-decoration-none"
                                    >
                                        Don't have account? <span>Sign Up</span>
                                    </Link>
                                </p>
                            </div>
                            <div className="or-dev-section-overlay-checkout">
                                <span
                                    style={{
                                        color: "black",
                                    }}
                                >
                                    OR
                                </span>
                            </div>

                            <div className="after-the-or-dev-sction-leve-model-checkout">
                                <Link
                                 onClick={toggleSidebar}
                                    className="text-decoration-none"
                                    to={"/checkout"}
                                >
                                    <button> Continue as a Guest</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
           
    );
};
