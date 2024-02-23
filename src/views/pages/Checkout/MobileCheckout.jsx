import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

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
import { useViewportWidth } from "@hooks/useViewportWidth";
import "./Checkout.css";
import Discount from "@components/Checkout/Discount/Discount";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MobileSummary from "../../components/Checkout/OrderSummary/MobileSumery";
import MobileReviewCheckout from "../../components/Checkout/ReviewCheckout/MobileReviewCheckout";
import ReviewButton from "../../components/Checkout/ReviewCheckout/ReviewButton";
import ShipingModalSummery from "../../components/Checkout/OrderSummary/ShipingModalSummery";

export default function MobileCheckout() {
    const location = useLocation();
    const { error } = location?.state || {};
    const initAccordionValues = {
        1: { open: false },
        2: { open: false },
        3: { open: false },
    };
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
    const [accordion, setAccordion] = useState(initAccordionValues);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [currentAccordionId, setCurrentAccordionId] = useState();
    const checkoutDetails = useSelector((state) => state.cart.details);
    const cartItems = useSelector((state) => state.cart.cart);
    const [searchParams] = useSearchParams();
    const shippingAddress = useSelector(
        (state) => state.orders.shippingDetails
    );
    const [paymentError, setPaymentError] = useState("");

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const loading = useSelector((state) => state.cart.isLoading);
    const id = searchParams.get("id");

    const toggleAccordion = (id) => {
        openAccordion(id, !accordion[id].open);
        setCurrentAccordionId(id);
    };

    const openAccordion = (id, value) => {
        setAccordion({
            ...initAccordionValues, // closes all the open accordions
            [id]: { open: value }, // toggles that specific accordion
        });
    };

    const handleClick = (e, next = false, id) => {
        next ? toggleAccordion(id + 1) : toggleAccordion(id); // adds +1 because accordoin keys start from 1
    };

    useEffect(() => {
        // displays error on top whenever square payment fails and open shipping details form (First Accordion)

        if (error) {
            toggleAccordion(3);
        } else {
            toggleAccordion(1);
        }
        setPaymentError(error);
    }, [JSON.stringify(error)]);

    useEffect(() => {
        // displays error on top whenever paypal payment fails and open shipping details form (First Accordion)
        const error = searchParams.get("error");
        if (error) {
            const errors = extractJsonObjectFromError(error);
            if (errors.cartError) {
                navigate("/cart", {
                    state: { error: true },
                });
            } else {
                setPaymentError(error);
                toggleAccordion(3);
            }
        }
    }, [searchParams.get("error")]);
    const handleWindowSizeChange = () => {
        setIsMobile(window.innerWidth <= 430);
    };

    useEffect(() => {
        const handleResize = () => {
            handleWindowSizeChange();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
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
                                    {isAuthenticated ? (
                                        <h3>
                                            Checkout (
                                            {checkoutDetails.total_items} items)
                                        </h3>
                                    ) : (
                                        <h3>
                                            Guest Checkout ({" "}
                                            {id
                                                ? 1
                                                : checkoutDetails.total_items}{" "}
                                            items)
                                        </h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-page-inner">
                        {paymentError && (
                            <Alert variant="danger" className="my-3">
                                {JSON.stringify(paymentError)}
                            </Alert>
                        )}
                        {checkoutDetails.total_items > 0 ? (
                            <div className="row mx-o">
                           <div style={{textAlign:'center'}} className="checkout-item-mobile-series-data">
                           <p>Checkout (1 item)</p>
                            </div>
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
                                        isOpen={accordion[1].open}
                                    >
                                        <ShippingDetails
                                            shippingAddress={shippingAddress}
                                        />
                                    </Accordion>
                                    {accordion[1].open && (
                                    <>
                                    <div className="col-md-3 col-12">
                                    <div>
                                        <div className="shipping-method-component-wrapper" style={{marginTop:"12px", marginBottom:"12px"}}>
                                            <ShippingMethod />
                                        </div>
                                    </div>        

                                    {!isAuthenticated && (
                                        <div>
                                            <div>
                                                <Discount />
                                            </div>
                                        </div>
                                    )}

                                 
                                </div>
                              
                                    <div className="order-summary-component-wrapper">
                                        <MobileSummary
                                       
                                            handleClick={handleClick}
                                            activeAccordion={currentAccordionId}
                                            paymentMethod={paymentMethod}
                                            shippingDetails={checkoutDetails}
                                            isDisabled={
                                                !shippingAddress?.isValid
                                            }
                                        />
                                    </div></>
                                    )}
                                    {/* <div className="col-md-3 col-12">
                                    <div>
                                        <div className="shipping-method-button-mobile-size" style={{marginBottom:"12px", marginTop:"12px"}}>
                                           <button>Continue</button>
                                        </div>
                                    </div>
                                    </div> */}
                                    <Accordion
                                        id={2}
                                        title="Review Items & Shipping"
                                        toggleAccordion={toggleAccordion}
                                        isOpen={accordion[2].open}
                                    >
                                     
                                        <MobileReviewCheckout
                                            estimatedDelivery={
                                                checkoutDetails.shipment_info
                                                    ?.other_info
                                                    ?.estimate_day ||
                                                checkoutDetails?.estimate_days
                                            }
                                            cartItems={cartItems}
                                        />
                                    </Accordion>
                                    {accordion[2].open && (
                                    <>
                                    <div className="col-md-3 col-12">
                                    <div style={{display:'flex', justifyContent:'space-between'}} className="border-shipping-summery-data">
                                        {/* <div className="shipping-method-component-wrapper" style={{marginTop:"12px", marginBottom:"12px"}}>
                                            <ShippingMethod />
                                        </div> */}
                                        <div>
                                            <input type="radio" name="radio"  id="specifyColor"/>
                                            <span className="shipping-data-shiping-view-mobile">Free Shipping
                                            <p style={{ fontSize: "10px", marginLeft:'15px' }}>
                                                Mon, Nov 13
                                            </p>
                                            </span>
                                        </div>
                                        <div className="summery-modal-data-open-mobile">
                                            <span onClick={openModal}>order Summery</span>
                                        </div>

                                     
                                    </div>        
                                 
                                    {!isAuthenticated && (
                                        <div>
                                            <div>
                                                <Discount />
                                            </div>
                                        </div>
                                    )}

                                 
                                </div>
                           
                                              <ShipingModalSummery isOpen={isModalOpen} onClose={closeModal}> </ShipingModalSummery>
                                       
                                    <div className="order-summary-component-wrapper">
                                        <MobileSummary
                                       
                                            handleClick={handleClick}
                                            activeAccordion={currentAccordionId}
                                            paymentMethod={paymentMethod}
                                            shippingDetails={checkoutDetails}
                                            isDisabled={
                                                !shippingAddress?.isValid
                                            }
                                        />
                                    </div>
                                    
                                    <div className="col-md-3 col-12">
                                    <div>
                                        <div className="shipping-method-button-mobile-size" style={{marginBottom:"12px", marginTop:"12px"}}>
                                           {/* <button >Proceed</button> */}
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
                                    </div>
                                    </div> 
                                    </>
                                    )}
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
                                        isOpen={accordion[3].open}
                                    >
                                        <PaymentMethod
                                            setPayment={setPaymentMethod}
                                            cartItems={cartItems}
                                        />
                                    </Accordion>
                                    {accordion[3].open && (
                                    <>
                                    <div className="col-md-3 col-12">
                                    <div>
                                        <div className="shipping-method-component-wrapper" style={{marginTop:"12px", marginBottom:"12px"}}>
                                            <ShippingMethod />
                                        </div>
                                    </div>        

                                    {!isAuthenticated && (
                                        <div>
                                            <div>
                                                <Discount />
                                            </div>
                                        </div>
                                    )}

                                 
                                </div>
                              
                                    <div className="order-summary-component-wrapper">
                                        <MobileSummary
                                       
                                            handleClick={handleClick}
                                            activeAccordion={currentAccordionId}
                                            paymentMethod={paymentMethod}
                                            shippingDetails={checkoutDetails}
                                            isDisabled={
                                                !shippingAddress?.isValid
                                            }
                                        />
                                    </div></>
                                    )}
                                    <div style={{marginTop:"8px", paddingLeft:"10px"}}>
                                    <div className="col-md-3 col-12">
                                    <div>
                                       <span>Need help? <Link className="text-decoration-none" style={{color:"#007185", fontSize:'12px', fontWeight:'600'}}>Contact Us</Link></span>
                                    </div>
                                    <div className="return-paragraph-policy-data">
                                   <span>
                                   You may return new, unopened merchandise in original condition within 30 days of delivery. Exceptions and restrictions apply. See 
                                  <span>  sjcomputers.us  <Link className="text-decoration-none" style={{color:"#007185", fontSize:'12px', fontWeight:'600'}}>Returns Policy.</Link></span>
                                   </span>
                                    </div>
                                    <div className="return-paragraph-policy-data">
                                   <span>
                                   You Need to add more items to your order? Continue 
                                   shopping on<br></br> the <Link className="text-decoration-none" style={{color:"#007185", fontSize:'12px', fontWeight:'600'}}>sjcomputers.us</Link> homepage.
                                 
                                   </span>
                                    </div>
                                    </div>
                                        </div>
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
