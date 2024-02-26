import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewButton from "./ReviewButton";
// import { QuantityInput } from "@common/QuantityInput/QuantityInput";
import WarrantyBadge from "@components/ShoppingCart/CartItem/WarrantyBadge";
import { ArrowDownward } from "@material-ui/icons";
import "./ReviewCheckout.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
export default function MobileReviewCheckout({
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
        "Get Discount & Benefits",
    );

    const [itemsToShow, setItemsToShow] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get("id");

    const items = () => {
        if (id) {
            const oneItem = cartItems?.find((item) => item.id === parseInt(id));
            setItemsToShow([oneItem]);
        } else {
            setItemsToShow(cartItems);
        }
    };

    useEffect(() => {
        items();
    }, [cartItems]);

    return (
        <div className="review-card">
            <h4>
                Estimated delivery: {estimatedDelivery ? estimatedDelivery : ""}
            </h4>
            <p>Items Shipped from sjcomputer.us</p>

            <div className="row mx-0 mb-3">
                {itemsToShow?.map((item) => (
                    <div className="item-card" key={item?.id}>
                        <div className="col-4 ps-0">
                            <div className="img-wrapper">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                />
                            </div>
                        </div>
                        <div className="col-8 ps-0">
                            <div className="item-detail">
                                <h6>{item.product.name}</h6>
                                {/* <WarrantyBadge
                                    durationInYears={
                                        item?.plan?.durationInYears
                                    }
                                /> */}
                                <div className="row">
                                    <div></div>
                                    <div className="col-md-6">
                                        <h6
                                            className="price"
                                            style={{ color: "#B12704" }}
                                        >
                                            ${parseFloat(item.price).toFixed(2)}
                                        </h6>
                                        <div>
                                            {" "}
                                            <h6 className="quantity quantitiy-data-images">
                                                Qty: {item.quantity}{" "}
                                                <FontAwesomeIcon
                                                    icon={faAngleDown}
                                                />
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-md-3 px-0">
                                        <div className="protection-button-remove-data">
                                            {/* <button>Remove protection</button> */}
                                        </div>
                                    </div>
                                    {item?.plan?.value && (
                                        <div className="col-md-3">
                                            {/* <p className="checkout-card-dev-sj-computers-sections">
                                                    SJ Computer{" "}
                                                </p>
                                                <div>
                                                    <p className="overlay-protecions-checkout-card-protection-name-dev">
                                                        {" "}
                                                        Protection
                                                    </p>
                                                </div>

                                                <span>
                                                    {item?.plan?.durationInYears
                                                        ? item?.plan
                                                              ?.durationInYears +
                                                          " years"
                                                        : "Tech Unlimited"}
                                                </span> */}

                                            <WarrantyBadge
                                                durationInYears={
                                                    item?.plan?.durationInYears
                                                        ? item?.plan
                                                              ?.durationInYears +
                                                          " years"
                                                        : "Tech Unlimited"
                                                }
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* <QuantityInput
                                    value={item.quantity}
                                    onChange={setQuantity}
                                /> */}
                            </div>
                        </div>
                    </div>
                ))}

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
        </div>
    );
}
