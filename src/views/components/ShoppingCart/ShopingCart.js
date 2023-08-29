import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { CartItem } from "./CartItem/CartItem";
import toggleSlice from "../../../core/store/toggle/toggleSlice";
import "./ShopingCart.css";
import { CheckoutBox } from "./CheckOut/CheckoutBox";
import CartOverlay from "../Header/CartOverlay";

export const ShopingCart = ({ onFormSubmit, form }) => {
    const cartItems = useSelector((state) => state.cart.cart);
    const cartDetails = useSelector((state) => state.cart.details);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    return (
        <>
            {isLoading ? (
                <LoaderComponent />
            ) : (
                <div>
                    <div className=" cart-mein-dev">
                        <div className="row">
                            <div className="col-md-8 col-lg-9">
                                <div className="card cart-box">
                                    <div className="row mx-0">
                                        <div className="shop-heading">
                                            <div className="col-md-10">
                                                <h3 className="shop-heading">
                                                    Shopping Cart
                                                </h3>
                                            </div>
                                            <div className="col-md-2">
                                                <p className="price-heading d-sm-block d-none">
                                                    Price
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {cartItems?.map((item) => (
                                        <div key={item.id} id={item.id}>
                                            <hr className="hrline"></hr>
                                            <div className="items">
                                                <CartItem cartData={item} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="row">
                                    <div className="cart-product-subtotal-price hide-mobile-cart-btn">
                                        <span>
                                            Subtotal (
                                            {cartDetails?.total_items
                                                ? cartDetails.total_items
                                                : 0}
                                            items):
                                            <strong className="price-with-sign">
                                                $
                                                {cartDetails?.sub_total
                                                    ? parseFloat(
                                                          cartDetails.sub_total
                                                      ).toFixed(2)
                                                    : 0}
                                            </strong>
                                        </span>
                                    </div>

                                    <div className="add-more-items-dev">
                                        <Link to={"/"}>
                                            <button className="add-more-button-product  hide-mobile-cart-btn">
                                                Add more items
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="card card-checkout">
                                    <div className="card-body">
                                        <div className="checkout-container">
                                            <div className="card-body-text">
                                                <div className="text-body">
                                                    <span className="sub-title">
                                                        Subtotal({" "}
                                                        {
                                                            cartDetails?.total_items
                                                        }
                                                        items):{" "}
                                                        <strong
                                                            className="price-items"
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            $
                                                            {
                                                                cartDetails?.sub_total
                                                            }
                                                        </strong>
                                                    </span>
                                                    <br></br>
                                                    {/* <label>
                                            <input
                                                type="checkbox"
                                                name="myCheckbox"
                                                className="checkbox-paragraph"
                                            />
                                            This is a paragraph with a checkbox.
                                        </label> */}
                                                </div>
                                            </div>

                                            {isAuthenticated ? (
                                                <div className="button-checkout-data">
                                                    <Link to={"/checkout"}>
                                                        <button className="btn btn-primary checkout-button">
                                                            Proceed to checkout
                                                        </button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="button-checkout-data">
                                                        <button
                                                            className="btn btn-primary checkout-button"
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            Proceed to checkout
                                                        </button>
                                                    </div>

                                                    {showModal && (
                                                        <div className="overlay-model-checkout-model">
                                                            <div
                                                                className="overlay-modal-checkout-model-checkout-model"
                                                                ref={modalRef}
                                                            >
                                                                <CheckoutBox />
                                                                {/* <div className="modal-content">
                                                                    <form>
                                                                        <div className="dve-heading-data-login-checkout">
                                                                            <h4 className="login-h3">
                                                                                {form ===
                                                                                "forgetPassword"
                                                                                    ? "Forget Password"
                                                                                    : "Sign in to checkout"}
                                                                            </h4>
                                                                        </div>
                                                                   
                                                                        <div className="d-flex justify-content-center w-100">
                                                                            <Link
                                                                                className="text-decoration-none"
                                                                                to={
                                                                                    "/login"
                                                                                }
                                                                            >
                                                                                {" "}
                                                                                <button
                                                                                    disabled={
                                                                                        isLoading
                                                                                    }
                                                                                >
                                                                                    {isLoading ? (
                                                                                        <Loader />
                                                                                    ) : (
                                                                                        "Sign in"
                                                                                    )}
                                                                                </button>
                                                                            </Link>
                                                                        </div>
                                                                        <div>
                                                                            <p className="small-text-paragrap">
                                                                                <Link
                                                                                    to="/login"
                                                                                    className="text-decoration-none"
                                                                                >
                                                                                    Don't
                                                                                    have
                                                                                    account?{" "}
                                                                                    <span>
                                                                                        Sign
                                                                                        Up
                                                                                    </span>
                                                                                </Link>
                                                                            </p>
                                                                        </div>
                                                                        <div className="or-dev-section-overlay-checkout">
                                                                            <span
                                                                                style={{
                                                                                    color: "black",
                                                                                }}
                                                                            >
                                                                                OR
                                                                            </span>
                                                                        </div>

                                                                        <div className="after-the-or-dev-sction-leve-model-checkout">
                                                                            <Link
                                                                                className="text-decoration-none"
                                                                                to={
                                                                                    "/checkout"
                                                                                }
                                                                            >
                                                                                <button>
                                                                                    {" "}
                                                                                    Continue
                                                                                    as
                                                                                    a
                                                                                    Guest
                                                                                </button>
                                                                            </Link>
                                                                        </div>
                                                                    </form>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="add-more-items-dev mt-3 hide-desktop-cart-btn">
                                            <Link to={"/"}>
                                                <button className="add-more-button-product">
                                                    Add more items
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
