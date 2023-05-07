import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Accordion from "@common/Accordion/Accordion";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ShippingDetails from "@components/Checkout/ShippingDetails/ShippingDetails";
import PaymentMethod from "@components/Checkout/PaymentMethod/PaymentMethod";
import ReviewCheckout from "@components/Checkout/ReviewCheckout/ReviewCheckout";
import OrderSummary from "@components/Checkout/OrderSummary/OrderSummary";
import footerlogo from "@images/header-logo.png";

import "./Checkout.css";

export default function Checkout() {
    const [accordionOne, setAccordionOne] = useState(false);
    const [accordionTwo, setAccordionTwo] = useState(false);
    const [accordionThree, setAccordionThree] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [currentAccordionId, setCurrentAccordionId] = useState();

    const checkoutDetails = useSelector((state) => state.cart.details);
    const loading = useSelector((state) => state.cart.isLoading);

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
        toggleAccordion(1);
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
                                        Checkout ({checkoutDetails.total_items}{" "}
                                        items)
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-page-inner">
                        {checkoutDetails.total_items > 0 ? (
                            <div className="row mx-o">
                                <div className="col-md-9 col-12">
                                    <Accordion
                                        className="shipping-details"
                                        id={1}
                                        title="Shipping Details"
                                        summary={<ShippingSummary />}
                                        toggleAccordion={toggleAccordion}
                                        isOpen={ACCORDION_VARIABLES[1]}
                                    >
                                        <ShippingDetails />
                                    </Accordion>
                                    <Accordion
                                        id={2}
                                        title="Review Items & Shipping"
                                        toggleAccordion={toggleAccordion}
                                        isOpen={ACCORDION_VARIABLES[2]}
                                    >
                                        <ReviewCheckout />
                                    </Accordion>
                                    <Accordion
                                        id={3}
                                        title="Payment Method"
                                        toggleAccordion={toggleAccordion}
                                        isOpen={ACCORDION_VARIABLES[3]}
                                    >
                                        <PaymentMethod
                                            setPayment={setPaymentMethod}
                                        />
                                    </Accordion>
                                </div>
                                <div className="col-md-3 col-12">
                                    <OrderSummary
                                        handleClick={handleClick}
                                        activeAccordion={currentAccordionId}
                                        paymentMethod={paymentMethod}
                                    />
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
