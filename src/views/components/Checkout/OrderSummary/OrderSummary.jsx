import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { placeOrder } from "@store/orders/ordersThunk";
import ShippingButton from "@components/Checkout/ShippingDetails/ShippingButton";
import PaymentButton from "@components/Checkout/PaymentMethod/PaymentButton";
import ReviewButton from "@components/Checkout/ReviewCheckout/ReviewButton";

import "./OrderSummary.css";

function OrderSummary({
    handleClick,
    activeAccordion,
    // paymentMethod,
    shippingDetails,
    isDisabled,
}) {
    const dispatch = useDispatch();
    const placingOrder = useSelector((state) => state.orders.placingOrder);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const Button = () => {
        if (activeAccordion === 1) {
            return (
                <ShippingButton
                    handleClick={handleClick}
                    id={activeAccordion}
                    disabled={isDisabled}
                >
                    Review Order
                </ShippingButton>
            );
        } else if (activeAccordion === 2) {
            return (
                <ReviewButton
                    toggleAccordion={handleClick}
                    id={activeAccordion}
                >
                    Proceed
                </ReviewButton>
            );
        } else {
            // const placeOrderFunc = () => {
            //     dispatch(
            //         placeOrder({ paymentMethod }, (link) =>
            //             location.replace(link)
            //         )
            //     );
            // };

            return (
                <PaymentButton
                    clickHandler={() => false}
                    id={activeAccordion}
                    disabled={true}
                    isLoading={placingOrder}
                >
                    Select Payment Method
                </PaymentButton>
            );
        }
    };
    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <div className="summary-card">
                        <div className="summary-wrapper">
                            <div className="summary-btn summery-btton-order-summery">
                                <Button />
                            </div>
                            <div className="summary-details">
                                <ul>
                                    <li>
                                        <span>Items:</span>
                                        <span>
                                            ({shippingDetails?.total_items})
                                        </span>
                                    </li>
                                    <li>
                                        <span>Price:</span>
                                        <span>
                                            <strong>
                                                {shippingDetails?.sub_total
                                                    ? "$" +
                                                      shippingDetails.sub_total
                                                    : "$0"}
                                            </strong>
                                        </span>
                                    </li>
                                    <li>
                                        <span>Shipping & handling:</span>
                                        <span>
                                            {shippingDetails?.shipment_info
                                                ?.amount
                                                ? "$" +
                                                  parseFloat(
                                                      shippingDetails
                                                          ?.shipment_info
                                                          ?.amount
                                                  ).toFixed(2)
                                                : "$0"}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Total before tax:</span>
                                        <span>--</span>
                                    </li>
                                    <li>
                                        <span>
                                            Estimated tax to be calculated:
                                        </span>
                                        <span>--</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="order-total">
                                <ul>
                                    <li>
                                        <span>
                                            <strong>Order Total</strong>
                                        </span>
                                        <span>
                                            <strong>
                                                ${shippingDetails?.total}
                                            </strong>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="summary-footer">
                            <p>
                                You can track your shipment and view any
                                applicable import fees deposit before placing
                                your order.
                            </p>
                            <Link to={"#"}>How shipping costs calculates?</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="summary-card">
                        <div className="summary-wrapper summery-data-checkout-data">
                            <h3>Order Summary</h3>

                            <div className="summary-details">
                                <ul>
                                    <li>
                                        <span>Items:</span>
                                        <span>
                                            ({shippingDetails?.total_items})
                                        </span>
                                    </li>
                                    <li>
                                        <span>Price:</span>
                                        <span>
                                            <strong>
                                                {shippingDetails?.sub_total
                                                    ? "$" +
                                                      shippingDetails.sub_total
                                                    : "$0"}
                                            </strong>
                                        </span>
                                    </li>
                                    <li>
                                        <span>Shipping & handling:</span>
                                        <span>
                                            {shippingDetails?.shipment_amount
                                                ? "$" +
                                                  parseFloat(
                                                      shippingDetails?.shipment_amount
                                                  ).toFixed(2)
                                                : "$0"}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Total before tax:</span>
                                        <span>--</span>
                                    </li>
                                    <li>
                                        <span>
                                            Estimated tax to be calculated:
                                        </span>
                                        <span>--</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="order-total">
                                <ul>
                                    <li>
                                        <span>
                                            <strong>Order Total</strong>
                                        </span>
                                        <span>
                                            <strong>
                                                ${shippingDetails?.total}
                                            </strong>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="summary-footer">
                            <Link to={"#"}>How shipping costs calculates?</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderSummary;
