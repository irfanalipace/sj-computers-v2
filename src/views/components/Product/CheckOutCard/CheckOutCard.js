import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "@store/cart/cartThunks";
import { addItemToLocalCart } from "@utils/helpers";
import Button from "@common/Button/Button";
import imges from "@images/bottom-arrow.png";
import imges1 from "@images/cart-product/location.png";
import LocationModel from "@components/Header/Location/LocationModel";
import { QuantityInput } from "@common/QuantityInput/QuantityInput";

import "./CheckOutCard.css";

export const CheckOutCard = ({ product }) => {
    console.log("product", product);
    const currentState = useSelector((state) => state.states.currentState);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cart = useSelector((state) => state.cart.cart);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [cartItem, setCartItem] = useState(null);
    const handleShow = () => setShow(!show);
    const dispatch = useDispatch();

    const cartClickHandler = () => {
        addItemToLocalCart({ ...product, quantity });
        if (isAuthenticated)
            dispatch(
                addToCart({
                    ...product,
                    quantity,
                })
            );
    };

    useEffect(() => {
        let item = cart.filter((ci) => ci.id === product.id);
        setCartItem(item);
    }, [cart]);

    return (
        <div>
            <div className="card-section-left">
                <div className="row">
                    <div className="col-md-12 color-text">
                        <sup className="$-color">$</sup>
                        {product?.price?.toString().split(".")[0]}
                        <sup>{product?.price?.toString().split(".")[1]}</sup>
                    </div>
                </div>
                <div className="head">
                    <div className="">
                        <p className="cart-text">
                            {product?.description}
                            <button className="buttion-details">
                                Details
                                <img src={imges} />
                            </button>
                        </p>
                    </div>
                </div>
                <div>
                    <button className="color-card" onClick={handleShow}>
                        <img src={imges1} /> Deliver to
                        {currentState?.name
                            ? " " + currentState?.name
                            : " Location"}
                    </button>
                </div>
                {show && (
                    <LocationModel
                        isOpen={show}
                        handleClose={() => setShow(false)}
                    />
                )}
                {cartItem?.length > 0 ? (
                    <p>Item Added in Cart</p>
                ) : (
                    <>
                        <span className="color-card">In Stock</span>
                        <QuantityInput onChange={setQuantity} />

                        <div className="button-cart-sell">
                            <Button
                                className="button1 button-text-button"
                                clickHandler={cartClickHandler}
                                isLoading={isLoading}
                            >
                                Add to Cart
                            </Button>
                        </div>
                        <div className="button-cart-sell">
                            <Button
                                className="button2 button-text-button"
                                clickHandler={cartClickHandler}
                                isLoading={isLoading}
                            >
                                Buy Now
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
