import { useState, useEffect, useRef } from "react";

import Accordion from "@common/Accordion/Accordion";
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
    const [currentAccordionId, setCurrentAccordionId] = useState();

    const refAccordionOne = useRef(accordionOne);

    const toggleAccordion = (id) => {
        switch (id) {
            case 1:
                setAccordionOne(!refAccordionOne.current);
                refAccordionOne.current = !refAccordionOne.current;
                setAccordionTwo(false);
                setAccordionThree(false);
                setCurrentAccordionId(1);
                break;
            case 2:
                setAccordionOne(false);
                setAccordionTwo(!accordionTwo);
                setAccordionThree(false);
                setCurrentAccordionId(2);
                break;
            case 3:
                setAccordionOne(false);
                setAccordionTwo(false);
                setAccordionThree(!accordionThree);
                setCurrentAccordionId(3);
                break;

            default:
                break;
        }
    };

    const handleClick = (e, next = false, id) => {
        next ? toggleAccordion(id + 1) : toggleAccordion(id);
    };

    useEffect(() => {
        toggleAccordion(1);
    }, []);

    const shippingSummary = (
        <div>
            <p>
                <strong>John Adam</strong>
            </p>
            <p>Eagan, MN 55121, USA.(complete address, Zip code etc)</p>
        </div>
    );

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="checkout-header-wrapper">
                    <div className="d-flex justify-content-between">
                        <div className="logo-wrapper">
                            <img src={footerlogo} />
                        </div>
                        <div className="items-number">
                            <h3>Checkout (1 item)</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="checkout-page-inner">
                <div className="row mx-o">
                    <div className="col-md-9 col-6">
                        <Accordion
                            id={1}
                            title="Shipping Details"
                            summary={shippingSummary}
                            toggleAccordion={toggleAccordion}
                            isOpen={accordionOne}
                        >
                            <ShippingDetails />
                        </Accordion>
                        <Accordion
                            id={2}
                            title="Review Items & Shipping"
                            toggleAccordion={toggleAccordion}
                            isOpen={accordionTwo}
                        >
                            <ReviewCheckout />
                        </Accordion>
                        <Accordion
                            id={3}
                            title="Payment Method"
                            toggleAccordion={toggleAccordion}
                            isOpen={accordionThree}
                        >
                            <PaymentMethod />
                        </Accordion>
                    </div>
                    <div className="col-lg-3 col-6">
                        <OrderSummary
                            handleClick={handleClick}
                            activeAccordion={currentAccordionId}
                        />
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}
