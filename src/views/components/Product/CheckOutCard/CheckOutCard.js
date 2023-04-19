import React from "react";
import "./CheckOutCard.css";
import imges from "@images/bottom-arrow.png";
import imges1 from "@images/cart-product/location.png";
import LocationModel from "@components/Header/Location/LocationModel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export const CheckOutCard = () => {
    const currentState = useSelector((state) => state.states.currentState);
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const location = useLocation();
    return (
        <div>
            <div class="card-section-left">
                <div className="row">
                    <div className="col-md-12 color-text">
                        <sup className="$-color">$</sup> 550<sup>99</sup>
                    </div>
                </div>
                <div className="head">
                    <div className="">
                        <p className="cart-text">
                            Lorem Ipsum is simply dummy text of the printing.
                            <button className="buttion-details">
                                Details
                                <img src={imges} />
                            </button>
                        </p>
                    </div>
                </div>
                <div>
                    <button className="color-card" onClick={handleShow}>
                        <img src={imges1} /> Deliver to John - USA,12345
                        {currentState ? currentState : ""}
                    </button>
                </div>
                {show && (
                    <LocationModel
                        isOpen={show}
                        handleClose={() => setShow(false)}
                    />
                )}

                <span className="color-card">In Stoke</span>
                <div>
                    <select className="selectpicker selectbutton-option-button">
                        <option>Qty: 1</option>
                        <option>Ketchup</option>
                        <option>Relish</option>
                    </select>
                </div>

                <div className="button-cart-sell">
                    <button className="button1">
                        <span className="button-text-button">Add to Cart</span>
                    </button>
                </div>
                <div className="button-cart-sell">
                    <button className="button2">
                        <span className="button-text-button">Buy Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
