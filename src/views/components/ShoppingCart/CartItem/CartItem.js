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
        let cartQuantity = details?.total_quantity - 1;
        let cartTotal = details?.total - cartData?.price;

        const cartDetails = {
            total_quantity: cartQuantity,
            total: cartTotal,
        };

        isAuthenticated
            ? dispatch(deleteItem({ cartItem: cartData, cartDetails }))
            : dispatch(deleteLocalItem({ cartItem: cartData, cartDetails }));
    };

    const handleQuantity = (quantity) => {
        let cartTotal = 0;
        let difference = quantity - cartData?.quantity;
        let price = cartData?.product?.price * difference;
        cartTotal = details?.total + price;
        const cartDetails = {
            total_quantity: details?.total_quantity,
            total: cartTotal,
        };

        let itemPrice = cartData?.product?.price + price;
        const cartItem = {
            ...cartData,
            quantity,
            price: itemPrice,
        };
        isAuthenticated
            ? dispatch(updateQuantity({ cartItem, cartDetails }))
            : dispatch(updateLocalQuantity({ cartItem, cartDetails }));
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-2">
                    <img
                        src={cartData?.product?.image}
                        alt=""
                        className="ssd-image"
                    />
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
                                <ul className="item-list">
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
                            </div>
                            <div className="col-md-2 price-item">
                                <p>
                                    <strong className="">
                                        {cartData?.price}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        {cartData.loading ? (
                            <Loader />
                        ) : (
                            <>
                                <div
                                    className="d-flex"
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
                                        className="button-link ms-2"
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
