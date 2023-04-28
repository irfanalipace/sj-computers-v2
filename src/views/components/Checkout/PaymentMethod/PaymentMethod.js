import { useState } from "react";

import visa from "@images/common/visa.png";
import mastercard from "@images/common/mastercard.png";
import paypal from "@images/common/paypal.png";
import PaymentButton from "./PaymentButton";

import "./PaymentMethod.css";
import { useSelector } from "react-redux";

export default function PaymentMethod({ handleClick }) {
    const [paymentMethod, setPaymentMethod] = useState("PAYPAL");
    const loading = useSelector((state) => state.orders.isLoading);

    const handleChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="payment-card">
            <div className="payment-methods">
                {/* <div className="payment-method">
                    <input
                        type="radio"
                        id="method1"
                        name="selectedAddress"
                        value="Debit/Credit Card"
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
                        checked={true}
                        onChange={handleChange}
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
            <PaymentButton paymentMethod={paymentMethod} isLoading={loading} />
        </div>
    );
}
