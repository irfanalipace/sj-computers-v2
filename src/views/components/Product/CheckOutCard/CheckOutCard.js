import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addToCart, addToLocalCart } from "@store/cart/cartThunks";
import Button from "@common/Button/Button";
import imges1 from "@images/cart-product/location.png";
import LocationModel from "@components/Header/Location/LocationModel";
import { QuantityInput } from "@common/QuantityInput/QuantityInput";

import "./CheckOutCard.css";
import { Link } from "react-router-dom";
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
    const navigate = useNavigate();

    const cartClickHandler = () => {
        let productPrice = product.price * quantity;
        let cartQuantity = details.total_items + 1;
        let cartTotal = parseFloat(details?.total) + productPrice;
        let cartSubTotal = parseFloat(details?.sub_total) + productPrice;
        const cartItem = {
            id: product.id,
            quantity: quantity,
            price: productPrice,
            product: { ...product },
        };

        const cartDetails = {
            total_items: cartQuantity,
            total: cartTotal.toFixed(2),
            sub_total: cartSubTotal.toFixed(2),
        };

        if (isAuthenticated)
            dispatch(addToCart({ cartItem }, () => navigate("/cart")));
        else
            dispatch(
                addToLocalCart({ cartItem, cartDetails }, () =>
                    navigate("/cart")
                )
            );
    };

    useEffect(() => {
        let item = cart.filter((ci) => ci.id === product.id);
        setCartItem(item);
    }, [cart]);

    return (
        <div>
            <div className="card-section-right">
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
                            
                            {/* {product?.description} */}
                            {/* <button className="buttion-details">
                                Details
                                <img src={imges} />
                            </button> */}
                        </p>
                    </div>
                </div>
                <div className="card-dev-section-paragrap-product">
                    <span className="dilvery-text-paragraph-card">
                  <Link className="text-decoration-none">Free delivery</Link>  <span style={{fontWeight:'bold'}}>Friday, May 19</span>{' '}
                 shipped by SJ Computers
                    </span>
                    </div>
                    <div className="card-dev-section-paragrap-product">
                    <span className="dilvery-text-paragraph-card">
                  or <Link className="text-decoration-none">Fastest delivery</Link>  <span style={{fontWeight:'bold'}}>Moday, May 15</span>{' '}
                   (Tentative)
                    </span>
                    </div>
                <div className="color-card-dev">
                    <button
                        className="select-location-btn mb-3"
                        onClick={handleShow}
                    >
                        <img src={imges1} /> Deliver to
                        {currentState?.name
                            ? " " + currentState?.name
                            : " Location"}
                    </button>
                    {show && (
                        <LocationModel
                            isOpen={show}
                            handleClose={() => setShow(false)}
                        />
                    )}
                    {cartItem?.length > 0 ? (
                        <p className="item-card-add-text-details">
                            Item Already in Cart
                        </p>
                    ) : (
                        <>
                            <div className="text-stock">
                            <div className="instock-dev-card-product-section-with-color-card">
                            <div>
                              <span className="color-card">In Stock</span>
                              </div>
                              <div>
                              <span className="color-text-cart-with-inStock">Only 10 pieces left</span>
                              </div>
                            </div>
                                <div className="mt-3">
                                    <QuantityInput
                                        onChange={setQuantity}
                                        maxQuantity={product?.quantity}
                                    />
                                </div>
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
                            {/* <div className="button-cart-sell">
                            <Button
                                className="button2 button-text-button"
                                clickHandler={cartClickHandler}
                                isLoading={isLoading}
                            >
                                Buy Now
                            </Button>
                        </div> */}
                        </>
                    )}

                <div className="instock-dev-card-product-section-with-color-card">
                            <div>
                              <span className="color-card-text-paragrap-payment">Payment</span>
                              </div>
                              <div>
                              <Link className="text-decoration-none secure-payment-method">Secure transaction</Link>
                              </div>
                            </div>
                            <div className="instock-dev-card-product-section-with-color-card">
                            <div>
                              <span className="color-card-text-paragrap-payment">Ships Form</span>
                              </div>
                              <div>
                              <span className="color-card-text-paragrap-payment">Sj Computers</span>
                              </div>
                            </div>
                            <div className="instock-dev-card-product-section-with-color-card">
                            <div>
                              <span className="color-card-text-paragrap-payment">Return</span>
                              </div>
                              <div>
                              <Link className="text-decoration-none secure-payment-method">Eligible for returns,
                                refund or 
                                replacement wi...
                                </Link>
                              </div>
                            </div>
                </div>
            </div>
        </div>
    );
};
