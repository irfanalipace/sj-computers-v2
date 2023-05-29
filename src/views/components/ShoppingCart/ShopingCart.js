import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { CartItem } from "./CartItem/CartItem";

import "./ShopingCart.css";

export const ShopingCart = () => {
    const cartItems = useSelector((state) => state.cart.cart);
    const cartDetails = useSelector((state) => state.cart.details);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const dispatch = useDispatch();

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
                                                    ? cartDetails.sub_total
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
                                            <div className="button-checkout-data">
                                                <Link to={"/checkout"}>
                                                    <button className="btn btn-primary checkout-button">
                                                        Proceed to checkout
                                                    </button>
                                                </Link>
                                            </div>
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
