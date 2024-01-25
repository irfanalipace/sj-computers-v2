import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToLocalCart } from "@store/cart/cartThunks";

function useAddToCart(product, quantity, plan) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const cart = useSelector((state) => state.cart.cart);
    const details = useSelector((state) => state.cart.details);
    // const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartClickHandler = () => {
        let cartQuantity = details.total_items + 1;
        let itemProtectedPlanPrice = parseFloat(plan?.price) * quantity || 10;
        let productPrice = product.price * quantity;
        let cartTotal = parseFloat(details?.total) + itemProtectedPlanPrice;
        let cartSubTotal =
            parseFloat(details?.sub_total) + itemProtectedPlanPrice;
        const cartItem = {
            id: product.id,
            quantity,
            price: productPrice,
            product: {
                ...product,
                in_stock: quantity >= product.quantity ? false : true,
            },
            plan: {
                id: plan?.value,
                price: plan?.price,
                label: plan?.label,
                durationInYears: plan?.durationInYears,
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

    const memoisedFunction = useMemo(cartClickHandler, [
        isAuthenticated,
        JSON.stringify(product),
        quantity,
        JSON.stringify(details),
    ]);
    return memoisedFunction;
}

export default useAddToCart;
