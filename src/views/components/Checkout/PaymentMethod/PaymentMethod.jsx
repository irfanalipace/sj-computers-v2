import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT_METHODS } from "@utils/constants";
import PaymentModal from "./PaymentModal";
import paypal from "@images/common/paypal.png";
import visa from "@images/common/visa.png";
import mastercard from "@images/common/mastercard.png";
import PaymentButton from "./PaymentButton";

import "./PaymentMethod.css";
import { useNavigate } from "react-router-dom";
import { validateCartItems } from "../../../../core/store/cart/cartThunks";
import PaymentService from "../../../../core/services/PaymentService";
import usePaymentData from "./usePaymentData";

export default function PaymentMethod({ setPayment, handleHeight, cartItems }) {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [openPaymentModal, setPaymentModal] = useState(false);
    const placingOrder = useSelector((state) => state.orders.placingOrder);
    const [isLoading, setIsLoading] = useState(false);
    const paymentPayload = usePaymentData();

    const shippingDetails = useSelector(
        (state) => state.orders.shippingDetails
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    useEffect(() => {
        setPayment(paymentMethod);
    }, [paymentMethod]);

    useEffect(() => {
        handleHeight();
    }, []);

    const onPaymentApiSuccess = (response) => {
        const url = response.data;
        window.open(url, "_blank");
    };

    const onProcessEnd = () => {
        setIsLoading(false);
    };
    const onPaymentApiFailure = (error) => {
        // navigate("/checkout?error=" + response?.message);
        navigate("/checkout", {
            state: { error },
        });
    };
    const onQuantityIssue = () => {
        navigate("/cart", {
            state: { error: true },
        });
    };

    const clickHandler = () => {
        setIsLoading(true);
        const cartData = cartItems?.map((item) => {
            // map item according to the request payload format
            return {
                product_id: item.id,
                qty: item.quantity,
            };
        });
        const onSuccess = () => {
            switch (paymentMethod) {
                case PAYMENT_METHODS.PAYPAL:
                    const paymentService = new PaymentService({
                        paymentType: PAYMENT_METHODS.PAYPAL,
                        paymentPayload,
                        onPaymentApiFailure,
                        onQuantityIssue,
                        onPaymentApiSuccess,
                        onProcessEnd,
                    });
                    paymentService.processPaymentApi();
                    break;

                case PAYMENT_METHODS.SQUARE:
                    setIsLoading(false);
                    setPaymentModal(true);
                    break;

                default:
                    break;
            }
        };
        const onFailure = () => {
            navigate("/cart");
            setIsLoading(false);
        };
        dispatch(
            validateCartItems({ cart_items: cartData, onSuccess, onFailure }) //validate if all the items in the cart are available or not
        );
    };

    return (
        <div className="payment-card">
            <div className="payment-methods">
                <div className="payment-method">
                    <input
                        type="radio"
                        id="method1"
                        name="selectedAddress"
                        value={PAYMENT_METHODS.SQUARE}
                        onChange={handleChange}
                        
                    />
                    <div>
                        <label htmlFor="method1">
                            <div>Debit/Credit Card</div>
                            <div
                                className="image-wrapper"
                                style={{ marginLeft: "30px" }}
                            >
                                <img src={visa} /> <img src={mastercard} />
                            </div>
                        </label>
                    </div>
                </div>

                <div className="payment-method">
                    <input
                        type="radio"
                        id="method2"
                        name="selectedAddress"
                        value={PAYMENT_METHODS.PAYPAL}
                        onChange={handleChange}
                    />
                    <div>
                        <label htmlFor="method2">
                            <div>PayPal</div>
                            <div
                                className="image-warpper-image2"
                                style={{ marginLeft: "100px" }}
                            >
                                <img src={paypal} className="" />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            {!shippingDetails.address && (
                <p className="text-danger fs-6">*Add Shipping Details First</p>
            )}
            <PaymentButton
                paymentMethod={paymentMethod}
                isLoading={isLoading || placingOrder}
                disabled={
                    !paymentMethod || !shippingDetails.address || !paymentMethod
                }
                clickHandler={clickHandler}
            >
                Proceed for payment
            </PaymentButton>

            <PaymentModal
                isOpen={openPaymentModal}
                handleClose={() => setPaymentModal(false)}
            />
        </div>
    );
}
