import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchBrands } from "@store/brands/brandsThunks";
import { fetchCategory } from "@store/category/categoryThunks";
import { addToCart } from "@store/cart/cartThunks";
import { getCartItems } from "@utils/helpers";

export const useInitDataFetching = () => {
    const dispatch = useDispatch();
    const cartItems = getCartItems();
    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(fetchBrands());
        dispatch(addToCart(cartItems));
    }, []);
};
