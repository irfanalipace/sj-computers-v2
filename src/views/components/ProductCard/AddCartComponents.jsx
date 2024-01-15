import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@common/Button/Button";
import { addToCart, addToLocalCart } from "@store/cart/cartThunks";
import "./ProductCard.css";
import { Dialog, Drawer } from "@mui/material";
import ProtectionPlanDrawer from "./ProtectionPlanDrawer";
const AddCartComponents = ({
    product,
    className,
    classNameforBuyNow,
    quantity = 1,
    open,
    setOpen,
    ...rest
}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cart = useSelector((state) => state.cart.cart);
    const details = useSelector((state) => state.cart.details);
    const productAddingToCard = useSelector(
        (state) => state.products.isLoading
    );
    const [show, setShow] = useState(false);
    const [cartItem, setCartItem] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [open, setOpen] = useState(false);
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
            quantity,
            price: productPrice,
            product: {
                ...product,
                in_stock: quantity >= product.quantity ? false : true,
            },
        };

        const cartDetails = {
            total_items: cartQuantity,
            total: cartTotal.toFixed(2),
            sub_total: cartSubTotal.toFixed(2),
        };

        if (isAuthenticated)
            dispatch(addToCart({ cartItem }, () => navigate("/cart")));
        else {
            dispatch(
                addToLocalCart({ cartItem, cartDetails }, () =>
                    navigate("/cart")
                )
            );
        }
    };
    useEffect(() => {
        let item = cart.find((ci) => ci.id === product.id);
        setCartItem(item);
    }, [cart]);

    return (
        <div>
            {cartItem?.id ? (
                <Button className="add-to-card-button-mobile-product">
                    Item Already in Cart
                </Button>
            ) : (
                <>
                    <Button
                        // onClick={cartClickHandler}
                        onClick={() => setOpen(true)}
                        isLoading={productAddingToCard && open}
                        className={className}
                        style={{ marginBottom: "10px" }}
                        {...rest}
                    >
                        Add to Cart
                    </Button>
                    <Button
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
                    </Button>
                </>
            )}
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <ProtectionPlanDrawer
                    handleButton={() => {
                        if (open) {
                            cartClickHandler();
                        }
                    }}
                />
            </Drawer>
        </div>
    );
};

export default AddCartComponents;
