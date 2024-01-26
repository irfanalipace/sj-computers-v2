import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewButton from "./ReviewButton";
// import { QuantityInput } from "@common/QuantityInput/QuantityInput";
import WarrantyBadge from "@components/ShoppingCart/CartItem/WarrantyBadge";

import "./ReviewCheckout.css";

export default function ReviewCheckout({
    toggleAccordion,
    estimatedDelivery,
    handleHeight,
    cartItems,
}) {
    // const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        handleHeight();
    }, []);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleProceed = () => {
        // Update the heading and button text when "Proceed" is clicked
        setDiscountHeading("New Heading");
    };
    const [discountHeading, setDiscountHeading] = useState(
        "Get Discount & Benefits"
    );

    return (
        <div className="review-card">
            <h4>
                Estimated delivery: {estimatedDelivery ? estimatedDelivery : ""}
            </h4>
            <p>Items Shipped from sjcomputer.us</p>

            <div className="row mx-0 mb-3">
                <div className="col-12 ps-0">
                    {cartItems.map((item) => (
                        <div className="item-card" key={item?.id}>
                            <div className="img-wrapper">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                />
                            </div>
                            <div className="item-detail">
                                <h6>{item.product.name}</h6>
                                {/* <WarrantyBadge
                                    durationInYears={
                                        item?.plan?.durationInYears
                                    }
                                /> */}
                                <div className="row">
                                <div className="col-md-6">
                                <h6 className="price">
                                    ${parseFloat(item.price).toFixed(2)}
                                </h6>
                                    </div>
                                    <div className="col-md-3 px-0">
                                 <div className="protection-button-remove-data">
                                 <button>
                                        Remove protection
                                    </button>
                                 </div>
                               </div>
                            <div className="col-md-3">
                                 <div className="checkout-card-protection-lables-warntity">
                                    <p className="checkout-card-dev-sj-computers-sections">SJ Computer </p>
                                    <div>
                                    <p className="checkout-card-protection-name-dev">  Protection</p>
                                    </div>
                                     
                                   
                                    <span>3 Years</span>
                                 </div>
                                </div>
                                    </div>
                               
                                <h6 className="quantity">
                                    Quantity: {item.quantity}
                                </h6>
                                {/* <QuantityInput
                                    value={item.quantity}
                                    onChange={setQuantity}
                                /> */}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-5 col-12">
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

            {isAuthenticated ? (
                <ReviewButton toggleAccordion={toggleAccordion}>
                    Proceed
                </ReviewButton>
            ) : (
                <ReviewButton toggleAccordion={toggleAccordion}>
                    Proceed
                </ReviewButton>
            )}
        </div>
    );
}
