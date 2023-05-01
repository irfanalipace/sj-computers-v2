import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { placeOrder } from "@store/orders/ordersThunk";
import paypal from "@images/common/paypal.png";
import PaymentButton from "./PaymentButton";

import "./PaymentMethod.css";

export default function PaymentMethod({ setPayment }) {
    const [paymentMethod, setPaymentMethod] = useState("PAYPAL");
    const placingOrder = useSelector((state) => state.orders.placingOrder);
    const shippingDetails = useSelector(
        (state) => state.orders.shippingDetails
    );
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    useEffect(() => {
        setPayment(paymentMethod);
    }, [paymentMethod]);

    const clickHandler = () => {
        dispatch(
            placeOrder({ paymentMethod }, (link) => window.open(link, "_blank"))
        );
    };

    return (
        <div className="payment-card">
            <div className="payment-methods">
                {/* <div className="payment-method">
                    <input
                        type="radio"
                        id="method1"
                        name="selectedAddress"
                        value="SQUARE"
                        onChange={handleChange}
                        checked={true}
                    />
                    <div>
                        <label htmlFor="method1">
                            <div>Debit/Credit Card</div>
                            <div
                                className="image-wrapper"
                                style={{ marginLeft: "30px" }}
                            >
                                <img src={visa} />
                                <img src={mastercard} />
                            </div>
                        </label>
                    </div>
                </div> */}

                <div className="payment-method">
                    <input
                        type="radio"
                        id="method2"
                        name="selectedAddress"
                        value="PAYPAL"
                        onChange={handleChange}
                        checked={true}
                    />
                    <div>
                        <label htmlFor="method2">
                            <div>PayPal</div>
                            <div
                                className="image-wrapper"
                                style={{ marginLeft: "100px" }}
                            >
                                <img src={paypal} />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            {!shippingDetails && (
                <p className="text-danger fs-6">*Add Shipping Details First</p>
            )}
            <PaymentButton
                paymentMethod={paymentMethod}
                isLoading={placingOrder}
                disabled={!paymentMethod || !shippingDetails}
                clickHandler={clickHandler}
            />
        </div>
    );
}
