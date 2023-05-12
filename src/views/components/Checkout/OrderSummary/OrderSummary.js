import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { placeOrder } from "@store/orders/ordersThunk";
import ShippingButton from "@components/Checkout/ShippingDetails/ShippingButton";
import PaymentButton from "@components/Checkout/PaymentMethod/PaymentButton";
import ReviewCheckout from "@components/Checkout/ReviewCheckout/ReviewButton";

import "./OrderSummary.css";

function OrderSummary({
    handleClick,
    activeAccordion,
    paymentMethod,
    shippingDetails,
}) {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const placingOrder = useSelector((state) => state.orders.placingOrder);

    useEffect(() => {
        if (paymentMethod) setDisabled(false);
    }, [paymentMethod]);

    const Button = () => {
        if (activeAccordion === 1) {
            return (
                <ShippingButton
                    handleClick={handleClick}
                    id={activeAccordion}
                />
            );
        } else if (activeAccordion === 2) {
            return (
                <ReviewCheckout
                    toggleAccordion={handleClick}
                    id={activeAccordion}
                />
            );
        } else {
            const placeOrderFunc = () => {
                dispatch(
                    placeOrder({ paymentMethod }, (link) =>
                        location.replace(link)
                    )
                );
            };

            return (
                <PaymentButton
                    clickHandler={placeOrderFunc}
                    id={activeAccordion}
                    disabled={disabled}
                    isLoading={placingOrder}
                />
            );
        }
    };
    return (
        <div className="summary-card">
            <div className="summary-wrapper">
                <div className="summary-btn">
                    <Button />
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                    </p>
                </div>
                <div className="summary-details">
                    <ul>
                        <li>
                            <span>Items:</span>
                            <span>({shippingDetails?.total_items})</span>
                        </li>
                        <li>
                            <span>Price:</span>
                            <span>
                                <strong>
                                    {shippingDetails?.sub_total
                                        ? "$" + shippingDetails.sub_total
                                        : "$0"}
                                </strong>
                            </span>
                        </li>
                        <li>
                            <span>Shipping & handling:</span>
                            <span>
                                {shippingDetails?.shipment_info?.amount
                                    ? "$" +
                                      shippingDetails?.shipment_info?.amount
                                    : "$0"}
                            </span>
                        </li>
                        <li>
                            <span>Total before tax:</span>
                            <span>--</span>
                        </li>
                        <li>
                            <span>Estimated tax to be calculated:</span>
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
                                <strong>${shippingDetails?.total}</strong>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="summary-footer">
                <p>
                    You can track your shipment and view any applicable import
                    fees deposit before placing your order.
                </p>
                <Link to={"#"}>How shipping costs calculates?</Link>
            </div>
        </div>
    );
}

export default OrderSummary;
