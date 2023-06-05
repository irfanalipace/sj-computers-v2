import React from 'react'

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@common/Button/Button";
import { addToCart, addToLocalCart } from "@store/cart/cartThunks";
import "./ProductCard.css";
const AddCartComponents = ({ product, className }) => {
    const currentState = useSelector((state) => state.states.currentState);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cart = useSelector((state) => state.cart.cart);
    const details = useSelector((state) => state.cart.details);
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
    {cartItem?.length > 0 ? (
      <Button className="add-to-card-button-mobile-product">
        Item Already in Cart
      </Button>
    ) : (
      <Button onClick={cartClickHandler}  isLoading={product?.loading}  className={className}>
        Add to Cart
      </Button>
    )}
  </div>
  
  )
}

export default AddCartComponents