import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getShippingDetails } from "@store/orders/ordersThunk";
import { fetchBrands } from "@store/brands/brandsThunks";
import { fetchCategory } from "@store/category/categoryThunks";
import {
    addToLocalCart,
    syncCartItems,
    setCartDetails,
    clearCart,
} from "@store/cart/cartThunks";
import {
    getCartItems,
    getCartDetails,
    deleteNotLocalCartItem,
} from "@utils/helpers";

export const useInitDataFetching = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartItems = getCartItems() || [];
    const cartDetails = getCartDetails();

    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(fetchBrands());

        if (!isAuthenticated) {
            cartItems.forEach((cartItem) => {
                dispatch(addToLocalCart({ cartItem }));
            });
            dispatch(setCartDetails(cartDetails));
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(clearCart()); //clear store cart items because all cart items are again fetched from backend to sync with localCart
            dispatch(getShippingDetails());
            dispatch(syncCartItems()); //gets all the cart items stored in database and stores them in store and local storage similarly stores local cart items in database
        }
    }, [isAuthenticated]);
};
