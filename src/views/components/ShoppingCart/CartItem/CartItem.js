import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@common/Spinner/Spinner";
import { deleteItem } from "@store/cart/cartThunks";
import { QuantityInput } from "@common/QuantityInput/QuantityInput";

import "./CartItem.css";

export const CartItem = ({ cartData }) => {
    const [quantity, setQuantity] = useState(1);
    const updatingItem = useSelector((state) => state.cart.updatingItem);
    const dispatch = useDispatch();

    const deleteItemFunction = () => {
        dispatch(deleteItem(cartData));
    };
    return (
        <div>
            <div className="row">
                <div className="col-md-2">
                    <img src={cartData?.image} alt="" className="ssd-image" />
                </div>
                <div className="col-md-10">
                    <div className="d-flex flex-column h-100 justify-content-between mx-0">
                        <div className="items-card-data">
                            <div className="col-md-10">
                                <p>
                                    <strong className="item-details">
                                        {cartData?.name}
                                    </strong>
                                </p>
                                <ul className="item-list">
                                    <li>
                                        <span className="item-stock">
                                            {cartData?.quantity
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

                        <div
                            className="d-flex"
                            style={{
                                maxWidth: "700px",
                            }}
                        >
                            <QuantityInput
                                onChange={setQuantity}
                                minQuantity={1}
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
                    </div>
                </div>
            </div>
        </div>
    );
};
