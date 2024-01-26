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
import WarrantyBadge from "@components/ShoppingCart/CartItem/WarrantyBadge";

import "./CartItem.css";
import { Link } from "react-router-dom";

export const CartItem = memo(({ cartData }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const details = useSelector((state) => state.cart.details);
    const [updatingItem, setUpdatingItem] = useState(false);

    const dispatch = useDispatch();

    const deleteItemFunction = () => {
        let cartQuantity = details?.total_items - 1;
        let cartTotal =
            parseFloat(details?.total) -
            cartData?.price -
            parseFloat(cartData?.plan_price || 0);
        let cartSubTotal =
            parseFloat(details?.sub_total) -
            cartData?.price -
            parseFloat(cartData?.plan_price || 0);

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
        quantity = parseInt(quantity);
        let subTotal = 0.0;
        let difference = quantity - cartData?.quantity;
        const productPriceDifference =
            parseFloat(cartData?.product?.price) * difference;
        let productPriceWithQuantity =
            productPriceDifference + parseFloat(cartData?.price);
        const warrantyPriceDifference =
            parseFloat(cartData?.plan?.price || 0) * difference;
        let warrantyPriceWithQuantity =
            warrantyPriceDifference + parseFloat(cartData?.plan_price || 0);
        subTotal =
            parseFloat(details?.sub_total) +
            parseFloat(productPriceDifference) +
            parseFloat(warrantyPriceDifference);
        const cartTotal =
            parseFloat(details?.total) +
            parseFloat(productPriceDifference) +
            parseFloat(warrantyPriceDifference);
        const cartDetails = {
            total_items: details?.total_items,
            total: cartTotal.toFixed(2),
            sub_total: subTotal.toFixed(2),
        };
        const cartItem = {
            id: cartData.id,
            quantity,
            difference,
            price: parseFloat(productPriceWithQuantity).toFixed(2),
        };

        if (cartData?.plan?.value) {
            cartItem.plan_price = parseFloat(warrantyPriceWithQuantity).toFixed(
                2
            );
        }

        // debugger;
        if (!isAuthenticated) {
            let productQuantity = cartData?.product?.quantity + difference;
            let in_stock = productQuantity < 1 ? false : true;
            cartItem.in_stock = in_stock;
        }
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
                                <Link
                                    className="items-card-name"
                                    to={
                                        new URL(
                                            cartData?.product?.url ||
                                                location.href
                                        ).pathname
                                    }
                                >
                                    <strong className="item-details">
                                        {cartData?.product?.name}
                                    </strong>
                                </Link>
                            </div>
                            <div className="col-md-2 price-item">
                                <p className="my-sm-0 my-2">
                                    <strong className="">
                                        $
                                        {parseFloat(cartData?.price).toFixed(2)}
                                    </strong>
                                </p>
                            </div>
                            {cartData?.plan?.value && (
                                <WarrantyBadge
                                    durationInYears={
                                        cartData?.plan?.durationInYears
                                    }
                                    planPrice={cartData?.plan_price}
                                />
                            )}
                        </div>
                        <ul className="item-list mt-1 mb-2">
                            <li>
                                <span className="item-stock">
                                    {cartData?.product?.quantity ==
                                    cartData?.quantity
                                        ? "Out of Stock"
                                        : "In Stock"}
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
                                    className="d-flex justify-content-between justify-content-sm-start align-items-end"
                                    style={{
                                        maxWidth: "700px",
                                    }}
                                >
                                    <QuantityInput
                                        onChange={handleQuantity}
                                        minQuantity={1}
                                        value={cartData?.quantity}
                                        maxQuantity={
                                            cartData?.product?.quantity
                                        }
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
            {cartData?.error && (
                <p className="fs-6 mt-3 text-danger">{cartData?.error}</p>
            )}
        </div>
    );
});
