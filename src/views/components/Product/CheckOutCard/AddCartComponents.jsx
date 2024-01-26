import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@common/Button/Button";
import { addToCart, addToLocalCart } from "@store/cart/cartThunks";
// import "./ProductCard.css";
import { PLAN_ENUM } from "@utils/constants";
const AddCartComponents = ({
    product,
    className,
    classNameforBuyNow,
    quantity = 1,
    open,
    setOpen,
    protectionPlan,
    checkplan,
    ...rest
}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const cart = useSelector((state) => state.cart.cart);
    const details = useSelector((state) => state.cart.details);
    const productAddingToCard = useSelector(
        (state) => state.products.isLoading
    );
    const [show, setShow] = useState(false);
    const [cartItem, setCartItem] = useState(null);
    const [plan, setPlan] = useState(null);
    // const [open, setOpen] = useState(false);
    const handleShow = () => setShow(!show);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     let item = cart.find((ci) => ci.id === product.id);
    //     setCartItem(item);
    // }, [cart]);

    const getPlanvalue = (id) => {
        const matchingEnum = Object.values(PLAN_ENUM).find(
            (enumEntry) => enumEntry.label === id
        );
        setPlan(matchingEnum);
    };
    return (
        <>
            {cartItem?.id ? (
                <Button className="add-to-card-button-mobile-product">
                    Item Already in Cart
                </Button>
            ) : (
                <>
                   
                    {/* <Button
                        onClick={() => {
                            if (!open) {
                                cartClickHandler();
                            }
                        }}
                        isLoading={productAddingToCard && !open}
                        className={classNameforBuyNow}
                        {...rest}
                    >
                        Buy Now
                    </Button> */}
                </>
            )}
        </>
    );
};

export default AddCartComponents;
