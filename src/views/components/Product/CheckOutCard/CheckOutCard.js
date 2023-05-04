import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToCart, addToLocalCart } from "@store/cart/cartThunks";
import Button from "@common/Button/Button";
import imges1 from "@images/cart-product/location.png";
import LocationModel from "@components/Header/Location/LocationModel";
import { QuantityInput } from "@common/QuantityInput/QuantityInput";

import "./CheckOutCard.css";

export const CheckOutCard = ({ product }) => {
    const currentState = useSelector((state) => state.states.currentState);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cart = useSelector((state) => state.cart.cart);
    const details = useSelector((state) => state.cart.details);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [cartItem, setCartItem] = useState(null);
    const handleShow = () => setShow(!show);
    const dispatch = useDispatch();

    const cartClickHandler = () => {
        let productPrice = product.price * quantity;
        let cartQuantity = details.total_items + 1;
        let cartTotal = parseFloat(details.total) + parseFloat(productPrice);
        const cartItem = {
            id: product.id,
            quantity: quantity,
            price: productPrice,
            product: { ...product },
        };

        const cartDetails = {
            total_items: cartQuantity,
            total: cartTotal.toFixed(2),
        };

        if (isAuthenticated) dispatch(addToCart({ cartItem, cartDetails }));
        else dispatch(addToLocalCart({ cartItem, cartDetails }));
    };

    useEffect(() => {
        let item = cart.filter((ci) => ci.id === product.id);
        setCartItem(item);
    }, [cart]);

    return (
        <div>
            <div className="card-section-left">
                <div className="row">
                    <div className="col-md-12 color-text-cart">
                        <span className="$-color">$</span>
                        {product?.price?.toString().split(".")[0]}
                        <sup>{product?.price?.toString().split(".")[1]}</sup>
                    </div>
                </div>
                <div className="head">
                    <div className="">
                        <p className="cart-text">
                            {product?.description}
                            {/* <button className="buttion-details">
                                Details
                                <img src={imges} />
                            </button> */}
                        </p>
                    </div>
                </div>
                <div className="color-card-dev">
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
                        <div className="text-stock">
                            <span className="color-card">In Stock</span>
                            <QuantityInput onChange={setQuantity} />
                        </div>
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
