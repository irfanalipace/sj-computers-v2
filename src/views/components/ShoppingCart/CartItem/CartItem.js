import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@common/Spinner/Spinner";
import {
    deleteItem,
    deleteLocalItem,
    updateQuantity,
    updateLocalQuantity,
} from "@store/cart/cartThunks";
import { QuantityInput } from "@common/QuantityInput/QuantityInput";

import "./CartItem.css";

export const CartItem = memo(({ cartData }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const details = useSelector((state) => state.cart.details);
    const [updatingItem, setUpdatingItem] = useState(false);

    const dispatch = useDispatch();

    const deleteItemFunction = () => {
        let cartQuantity = details?.total_items - 1;
        let cartTotal = parseFloat(details?.total) - cartData?.price;
        let cartSubTotal = parseFloat(details?.sub_total) - cartData?.price;

        const cartDetails = {
            total_items: cartQuantity,
            sub_total: cartSubTotal.toFixed(2),
            total: cartTotal.toFixed(2),
        };

        isAuthenticated
            ? dispatch(deleteItem({ cartItem: cartData }))
            : dispatch(deleteLocalItem({ cartItem: cartData, cartDetails }));
    };

    const handleQuantity = (quantity) => {
        let subTotal = 0;
        let difference = quantity - cartData?.quantity;
        let price = cartData?.product?.price * difference;
        subTotal = parseFloat(details?.sub_total) + price;
        let cartTotal = parseFloat(details?.total) + price;

        const cartDetails = {
            total_items: details?.total_items,
            total: cartTotal.toFixed(2),
            sub_total: subTotal.toFixed(2),
        };

        let itemPrice = cartData?.product?.price * quantity;
        const cartItem = {
            id: cartData.id,
            quantity,
            difference,
            price: itemPrice,
        };
        isAuthenticated
            ? dispatch(updateQuantity({ cartItem }))
            : dispatch(updateLocalQuantity({ cartItem, cartDetails }));
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-2">
                    <div className="cart-image-mobile-size">
                        <img
                            src={cartData?.product?.image}
                            alt=""
                            className="cartItem-image"
                        />
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="d-flex flex-column h-100 justify-content-between mx-0">
                        <div className="items-card-data">
                            <div className="col-md-10">
                                <p>
                                    <strong className="item-details">
                                        {cartData?.product?.name}
                                    </strong>
                                </p>
                            </div>
                            <div className="col-md-2 price-item">
                                <p className="my-sm-0 my-2">
                                    <strong className="">
                                        ${cartData?.price}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <ul className="item-list mt-1 mb-2">
                            <li>
                                <span className="item-stock">
                                    {cartData?.product?.quantity
                                        ? "In Stock"
                                        : "Out of Stock"}
                                </span>
                            </li>
                            {/* <li>Discount Available</li> */}
                            {/* <li>
                                        <span className="item-capacity">
                                            Capacity:
                                        </span>
                                        <span clasName="item-capacity1">
                                            2TB
                                        </span>
                                    </li>
                                    <li>
                                        <span className="item-capacity">
                                            Style:
                                        </span>
                                        <span clasName="item-style1">
                                            980 PRO
                                        </span>
                                    </li> */}
                        </ul>
                        {cartData.loading ? (
                            <Loader />
                        ) : (
                            <>
                                <div
                                    className="d-flex justify-content-between justify-content-sm-start"
                                    style={{
                                        maxWidth: "700px",
                                    }}
                                >
                                    <QuantityInput
                                        onChange={handleQuantity}
                                        minQuantity={1}
                                        value={cartData?.quantity}
                                    />

                                    <button
                                        onClick={deleteItemFunction}
                                        className="button-link cartitem-delete-button ms-2"
                                        disabled={updatingItem}
                                    >
                                        {updatingItem ? <Loader /> : "Delete"}
                                    </button>
                                    {/* <button className="button-link">
                                Save for later
                            </button>
                            <button className="button-link">
                                Compare with similer item
                            </button>
                            <button className="button-link">Share</button> */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
