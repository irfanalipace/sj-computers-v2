import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import imges1 from "@images/cart-product/location.png";
import LocationModal from "@components/Header/Location/LocationModal";

import "./CheckOutCard.css";
import { Link } from "react-router-dom";
import { IS_CHRISTMAS_HOLIDAYS } from "@utils/constants";
import AddToCartAndWarranty from "./AddToCartAndWarranty";
export const CheckOutCard = ({ product }) => {
    const currentState = useSelector((state) => state.states.currentState);
    const cart = useSelector((state) => state.cart.cart);

    const [show, setShow] = useState(false);

    const [cartItem, setCartItem] = useState(null);
    const handleShow = () => setShow(!show);

    const orderEstimatedDelivery = useSelector(
        (state) => state.orders.orderEstimatedDelivery
    );

    useEffect(() => {
        let item = cart.find((ci) => ci.id === product.id);
        setCartItem(item);
    }, [cart]);

    // const handleAddProtection = (name) => {
    //     const matchingEnum = Object.values(PLAN_ENUM).find(
    //         (enumEntry) => enumEntry.label === name
    //     );
    //     console.log(matchingEnum);
    //     setProtPlan(matchingEnum?.value);
    // };

    return (
        <div>
            <div className="card-section-right">
                <div className="hidden-on-mobile">
                    <h6 style={{ fontWeight: "700" }}>Excellent Condition</h6>
                    <h6 style={{ fontWeight: "700" }}>(Refurbished)</h6>
                </div>
                {/* <div
                    className="hidden-on-desktop"
                    style={{ fontWeight: "600" }}
                >
                    ${product?.price?.toString().split(".")[0]}
                </div> */}
                <div className="row card-price-section-card-product">
                    <div className="col-md-12 color-text-cart hidden-on-mobile">
                        <sup>$</sup>
                        {product?.price?.toString().split(".")[0]}
                        <sup>{product?.price?.toString().split(".")[1]}</sup>
                    </div>
                </div>

                <div className="head">
                    <div className="">
                        <p className="cart-text">
                            {/* {product?.description} */}
                            {/* <button className="buttion-details">
                                Details
                                <img src={imges} />
                            </button> */}
                        </p>
                    </div>
                </div>
                {/* Below sections are rendered based on christmas holidays static boolean variable in constants, and it will be true or false based on management decision  */}
                {IS_CHRISTMAS_HOLIDAYS ? (
                    <div className="card-dev-section-paragrap-product">
                        <span className="dilvery-text-paragraph-card">
                            <button className="text-decoration-none text-danger">
                                Arrive after Christmas
                            </button>
                            <span style={{ fontWeight: "bold" }}>
                                {", "}
                                {
                                    orderEstimatedDelivery?.free_shipment_amount
                                        ?.estimate_day
                                }
                            </span>{" "}
                            (Tentative)
                            <br></br>
                            Shipped by SJ Computers
                        </span>
                    </div>
                ) : (
                    <>
                        <div className="card-dev-section-paragrap-product">
                            <div className="hover-box">
                                <Link
                                    href="#"
                                    className="text-decoration-none free-return hidden-on-mobile"
                                    style={{ color: "#2c8a9a" }}
                                >
                                    FREE Returns
                                </Link>
                                <div className="hidden-box">
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        Return this item for free
                                    </span>
                                    <div style={{ marginTop: "12px" }}>
                                        <p style={{ fontSize: "11px" }}>
                                            This item can be returned in its
                                            original condition for a full refund
                                            or replacement within 30 days of
                                            receipt .
                                        </p>
                                        <Link
                                            to={"/return_refund_policy"}
                                            style={{
                                                marginTop: "12px",
                                                fontSize: "11px",
                                                color: "#2c8a9a",
                                            }}
                                        >
                                            Read full return policy
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        <div className="card-dev-section-paragrap-product hidden-on-mobile">
                            <span className="dilvery-text-paragraph-card">
                                <button style={{ color: "#2c8a9a" }}>
                                    FREE Delivery
                                </button>{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {
                                        orderEstimatedDelivery
                                            ?.free_shipment_amount?.estimate_day
                                    }
                                </span>
                                <br></br>
                                Shipped by SJ Computers
                            </span>
                        </div>{" "}
                        <div className="card-dev-section-paragrap-product hidden-on-desktop">
                            <span className="dilvery-text-paragraph-card">
                                <button
                                    style={{ color: "#000", fontWeight: 400 }}
                                >
                                    Delivery by
                                </button>{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {
                                        orderEstimatedDelivery
                                            ?.free_shipment_amount?.estimate_day
                                    }
                                </span>
                            </span>
                        </div>{" "}
                        {/*
                        <div className="card-dev-section-paragrap-product">
                            <span className="dilvery-text-paragraph-card">
                                or{" "}
                                <button className="text-decoration-none">
                                    Fastest delivery
                                </button>{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {
                                        orderEstimatedDelivery[
                                            "1_day_shipment_amount"
                                        ]?.estimate_day
                                    }
                                </span>{" "}
                                (Tentative)
                            </span>
                        </div>
                           */}
                    </>
                )}

                <div className="color-card-dev">
                    <button
                        className="select-location-btn deliver-to mb-2"
                        onClick={handleShow}
                    >
                        <img
                            src={imges1}
                            style={{ width: "10.5px", height: "14px" }}
                        />
                        &ensp;Deliver to
                        {currentState?.name
                            ? " " + currentState?.name
                            : " Location"}
                    </button>
                    {show && (
                        <LocationModal
                            isOpen={show}
                            handleClose={() => setShow(false)}
                        />
                    )}
                    {cartItem?.id ? (
                        <p className="item-card-add-text-details">
                            Item Already in Cart
                        </p>
                    ) : (
                        <AddToCartAndWarranty product={product} />
                    )}
                </div>
                {/* <hr className="hidden-on-mobile"></hr> */}
            </div>
        </div>
    );
};
