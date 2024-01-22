import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@common/Button/Button";
import { addToCart, addToLocalCart } from "@store/cart/cartThunks";
import "./ProductCard.css";
import { Dialog, Drawer } from "@mui/material";
import ProtectionPlanDrawer from "./ProtectionPlanDrawer";
import { PlanEnum } from "@utils/constants";
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
    const cart = useSelector((state) => state.cart.cart);
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
            protective_plan_id: plan || checkplan,
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

    const getPlanvalue = (id) => {
        const matchingEnum = Object.values(PlanEnum).find(
            (enumEntry) => enumEntry.label === id
        );
        setPlan(matchingEnum.value);
    };
    return (
        <>
            {cartItem?.id ? (
                <Button className="add-to-card-button-mobile-product">
                    Item Already in Cart
                </Button>
            ) : (
                <>
                    <Button
                        // onClick={cartClickHandler}
                        onClick={() => {
                            protectionPlan ? cartClickHandler() : setOpen(true);
                        }}
                        isLoading={productAddingToCard}
                        className={className}
                        // style={{ marginBottom: "10px" }}
                        {...rest}
                    >
                        Add to Cart
                    </Button>
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
            <Drawer
                anchor="right"
                open={!protectionPlan && open}
                onClose={() => setOpen(false)}
            >
                <ProtectionPlanDrawer
                    closeDrawer={() => setOpen(false)}
                    handleButton={() => {
                        if (open) {
                            cartClickHandler();
                        }
                    }}
                    handleAddingProtec={() => {
                        if (plan) {
                            cartClickHandler();
                        }
                    }}
                    ProtectionPlanCallBack={getPlanvalue}
                />
            </Drawer>
        </>
    );
};

export default AddCartComponents;
