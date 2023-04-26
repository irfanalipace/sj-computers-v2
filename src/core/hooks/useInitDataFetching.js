import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBrands } from "@store/brands/brandsThunks";
import { fetchCategory } from "@store/category/categoryThunks";
import { addToLocalCart, addToCart } from "@store/cart/cartThunks";
import { getCartItems } from "@utils/helpers";

export const useInitDataFetching = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartItems = getCartItems() || [];

    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(fetchBrands());
        if (isAuthenticated) {
            cartItems.forEach((item) => {
                dispatch(addToCart(item));
            });
        } else dispatch(addToLocalCart(cartItems));
    }, []);
};
