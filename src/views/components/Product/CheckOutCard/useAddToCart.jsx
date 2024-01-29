import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToLocalCart } from "@store/cart/cartThunks";
import { useParams } from "react-router-dom";

function useAddToCart(product, quantity) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const cart = useSelector((state) => state.cart.cart);
    const details = useSelector((state) => state.cart.details);
    // const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const cartClickHandler = (plan) => {
        let cartQuantity = details.total_items + 1;
        let itemProtectedPlanPrice = parseFloat(plan?.price || 0) * quantity;
        let productPrice = parseFloat(product.price * quantity);
        let cartTotal =
            parseFloat(details?.total) + productPrice + itemProtectedPlanPrice;
        let cartSubTotal =
            parseFloat(details?.sub_total) +
            productPrice +
            itemProtectedPlanPrice;
        const cartItem = {
            id: product.id,
            quantity,
            price: productPrice,
            plan_price: itemProtectedPlanPrice,
            product: {
                ...product,
                in_stock: quantity >= product.quantity ? false : true,
            },
        };

        if (plan) {
            cartItem.plan = plan;
        }

        const cartDetails = {
            total_items: cartQuantity,
            total: cartTotal.toFixed(2),
            sub_total: cartSubTotal.toFixed(2),
        };

        if (isAuthenticated)
            dispatch(
                addToCart({ cartItem }, () =>
                    navigate(
                        `/add-to-cart/${params?.title}/dp/${params?.productId}`
                    )
                )
            );
        else {
            dispatch(
                addToLocalCart({ cartItem, cartDetails }, () =>
                    navigate(
                        `/add-to-cart/${params?.title}/dp/${params?.productId}`
                    )
                )
            );
        }
    };

    const memoisedFunction = useMemo(
        () => cartClickHandler,
        [
            isAuthenticated,
            JSON.stringify(product),
            quantity,
            JSON.stringify(details),
        ]
    );
    return memoisedFunction;
}

export default useAddToCart;
