import { useState } from "react";
import { useSelector } from "react-redux";

import Button from "@common/Button/Button";
import imges from "@images/bottom-arrow.png";
import imges1 from "@images/cart-product/location.png";
import LocationModel from "@components/Header/Location/LocationModel";
import { QuantityInput } from "@common/QuantityInput/QuantityInput";

import "./CheckOutCard.css";

export const CheckOutCard = () => {
    const currentState = useSelector((state) => state.states.currentState);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    return (
        <div>
            <div className="card-section-left">
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
                <QuantityInput onChange={setQuantity} />

                <div className="button-cart-sell">
                    <Button className="button1">
                        <span className="button-text-button">Add to Cart</span>
                    </Button>
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
