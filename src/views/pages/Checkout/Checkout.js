import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { PAYMENT_METHODS } from "@utils/constants";
import { Alert } from "react-bootstrap";
import Accordion from "@common/Accordion/Accordion";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ShippingDetails from "@components/Checkout/ShippingDetails/ShippingDetails";
import PaymentMethod from "@components/Checkout/PaymentMethod/PaymentMethod";
import ReviewCheckout from "@components/Checkout/ReviewCheckout/ReviewCheckout";
import OrderSummary from "@components/Checkout/OrderSummary/OrderSummary";
import ShippingMethod from "@components/Checkout/ShippingMethod/ShippingMethod";
import footerlogo from "@images/header-logo.png";
import paypal from "@images/common/paypal.png";
import visa from "@images/common/visa.png";
import mastercard from "@images/common/mastercard.png";

import "./Checkout.css";
import Discount from "@components/Checkout/Discount/Discount";

export default function Checkout() {
    const [accordionOne, setAccordionOne] = useState(false);
    const [accordionTwo, setAccordionTwo] = useState(false);
    const [accordionThree, setAccordionThree] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [currentAccordionId, setCurrentAccordionId] = useState();
    const checkoutDetails = useSelector((state) => state.cart.details);

    const shippingAddress = useSelector(
        (state) => state.orders.shippingDetails
    );

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const loading = useSelector((state) => state.cart.isLoading);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paymentError = useRef(null);
    paymentError.current = urlParams.get("error");

    const ACCORDION_VARIABLES = {
        1: accordionOne,
        2: accordionTwo,
        3: accordionThree,
    };
    const ACCORDION_SETTERS = {
        1: setAccordionOne,
        2: setAccordionTwo,
        3: setAccordionThree,
    };

    const toggleAccordion = (id) => {
        for (const [key, value] of Object.entries(ACCORDION_SETTERS)) {
            key != id && value(false);
        }
        ACCORDION_SETTERS[id](!ACCORDION_VARIABLES[id]);
        setCurrentAccordionId(id);
    };

    const handleClick = (e, next = false, id) => {
        next ? toggleAccordion(id + 1) : toggleAccordion(id);
    };

    useEffect(() => {
        paymentError.current ? toggleAccordion(3) : toggleAccordion(1);
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="checkout-page">
                    <div className="checkout-header">
                        <div className="checkout-header-wrapper">
                            <div className="d-flex justify-content-between">
                                <div className="logo-wrapper">
                                    <Link to={"/"}>
                                        <img src={footerlogo} />
                                    </Link>
                                </div>
                                <div className="items-number">
                                    
                                        <h3>
                                            Checkout (
                                            {checkoutDetails.total_items} items)
                                        </h3>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-page-inner">
                        {paymentError.current && (
                            <Alert variant="danger" className="my-3">
                                {paymentError.current}
                            </Alert>
                        )}
                        {checkoutDetails.total_items > 0 ? (
                            <div className="row mx-o">
                                <div className="col-md-9 col-12">
                                    <Accordion
                                        className="shipping-details px-0 acoordeing"
                                        id={1}
                                        title="Enter Your Shipping Details "
                                        summary={
                                            shippingAddress.address && (
                                                <ShippingSummary />
                                            )
                                        }
                                        toggleAccordion={toggleAccordion}
                                        isOpen={ACCORDION_VARIABLES[1]}
                                    >
                                        <ShippingDetails
                                            shippingAddress={shippingAddress}
                                        />
                                    </Accordion>
                                    <Accordion
                                        id={2}
                                        title="Review Items & Shipping"
                                        toggleAccordion={toggleAccordion}
                                        isOpen={ACCORDION_VARIABLES[2]}
                                    >
                                        <ReviewCheckout
                                            estimatedDelivery={
                                                checkoutDetails.shipment_info
                                                    ?.other_info?.estimate_day
                                            }
                                        />
                                    </Accordion>
                                    <Accordion
                                        id={3}
                                        title="Payment Method"
                                        summary={
                                            paymentMethod && (
                                                <SelectedPaymentMethod
                                                    paymentMethod={
                                                        paymentMethod
                                                    }
                                                />
                                            )
                                        }
                                        toggleAccordion={toggleAccordion}
                                        isOpen={ACCORDION_VARIABLES[3]}
                                    >
                                        <PaymentMethod
                                            setPayment={setPaymentMethod}
                                        />
                                    </Accordion>
                                </div>
                                <div className="col-md-3 col-12">
                                    <div>
                                        <div className="shipping-method-component-wrapper">
                                            <ShippingMethod />
                                        </div>
                                    </div>
                                    {/* {!isAuthenticated && (
                                        <div>
                                            <div>
                                                <Discount
                                                    handleClick={handleClick}
                                                    activeAccordion={
                                                        currentAccordionId
                                                    }
                                                    paymentMethod={
                                                        paymentMethod
                                                    }
                                                    shippingDetails={
                                                        checkoutDetails
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )} */}

                                    {/* <div className="shipping-method-component-wrapper">
                                        <ShippingMethod />
                                    </div> */}
                                    <div className="order-summary-component-wrapper">
                                        <OrderSummary
                                            handleClick={handleClick}
                                            activeAccordion={currentAccordionId}
                                            paymentMethod={paymentMethod}
                                            shippingDetails={checkoutDetails}
                                        />
                                    </div>
                                    {/* <div>
                                    <Discount />
                                  </div> */}
                                </div>
                            </div>
                        ) : (
                            <>
                                <p>No Items Present</p>
                                <Link to={"/"}>Go Back to HomePage?</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export const ShippingSummary = () => {
    const shippingDetails = useSelector(
        (state) => state.orders.shippingDetails
    );

    return (
        <div>
            <p>
                <strong>{shippingDetails?.full_name}</strong>
            </p>
            <p>{shippingDetails?.address}</p>
        </div>
    );
};

export const SelectedPaymentMethod = ({ paymentMethod }) => {
    let Component = () => {
        switch (paymentMethod) {
            case PAYMENT_METHODS.PAYPAL:
                return (
                    <div className="payment-method mb-0">
                        <div>
                            <label htmlFor={PAYMENT_METHODS.PAYPAL}>
                                <div>PayPal</div>
                                <div className="image-wrapper ms-4">
                                    <img src={paypal} />
                                </div>
                            </label>
                        </div>
                    </div>
                );
            case PAYMENT_METHODS.SQUARE:
                return (
                    <div className="payment-method mb-0">
                        <div>
                            <label htmlFor={PAYMENT_METHODS.SQUARE}>
                                <div>Debit/Credit Card</div>
                                <div className="image-wrapper ms-4">
                                    <img src={visa} />
                                    <img src={mastercard} />
                                </div>
                            </label>
                        </div>
                    </div>
                );
            default:
                return <></>;
        }
    };

    return <Component />;
};
