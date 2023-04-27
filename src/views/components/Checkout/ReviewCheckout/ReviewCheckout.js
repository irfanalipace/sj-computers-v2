import { useState } from "react";

import laptop from "@images/common/laptop-img.png";
import ReviewButton from "./ReviewButton";
import { QuantityInput } from "@common/QuantityInput/QuantityInput";

import "./ReviewCheckout.css";

export default function ReviewCheckout({ handleClick }) {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="review-card">
            <h4>Estimated delivery: 14 April 2023 - 02 May 2023</h4>
            <p>Item Shippied from sjcomputer.us</p>
            <div className="row mx-0 mb-3">
                <div className="col-7 ps-0">
                    <div className="item-card">
                        <div className="img-wrapper">
                            <img src={laptop} alt="laptop" />
                        </div>
                        <div className="item-detail">
                            <h6>HP Laptop Dual Sense Wireless Controller</h6>
                            <h6 className="price">$490.00</h6>
                            <QuantityInput onChange={setQuantity} />
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    {/* <div>
                        <h6>Choose Delivery Options:</h6>
                        <div className="delivery-options">
                            <div className="delivery-option">
                                <input
                                    type="radio"
                                    id="option1"
                                    name="selectedAddress"
                                    value="Address 1"
                                />
                                <div>
                                    <label htmlFor="option1">
                                        Monday April 14 - Tuesday May 02 <br />
                                        <span>
                                            $10 sjcomputers priority shipping
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="delivery-option">
                                <input
                                    type="radio"
                                    id="option2"
                                    name="selectedAddress"
                                    value="Address 2"
                                />
                                <div>
                                    <label htmlFor="option2">
                                        Sunday April 13 - Friday May 05 <br />
                                        <span>
                                            $10 sjcomputers priority shipping
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <ReviewButton handleClick={handleClick} />
        </div>
    );
}
