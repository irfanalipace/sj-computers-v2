import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getShippingDetails } from "@store/orders/ordersThunk";
import { fetchBrands } from "@store/brands/brandsThunks";
import { fetchCategory } from "@store/category/categoryThunks";
import { currentState } from "@store/states/statesThunks";
import {
    addToLocalCart,
    syncCartItems,
    setCartDetails,
    getCartDetails,
    clearCart,
} from "@store/cart/cartThunks";
import { getCartItems } from "@utils/cartHelpers";

export const useInitDataFetching = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartItems = getCartItems() || [];
    const cartDetails = getCartDetails();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(clearCart()); //clear store cart items because all cart items are again fetched from backend to sync with localCart
            dispatch(getShippingDetails());
            dispatch(syncCartItems()); //gets all the cart items stored in database and stores them in store and local storage similarly stores local cart items in database
            dispatch(currentState());
        }
    }, [isAuthenticated]);

    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(fetchBrands());
        dispatch(getCartDetails());

        if (!isAuthenticated) {
            cartItems.forEach((cartItem) => {
                dispatch(addToLocalCart({ cartItem }));
            });
            dispatch(setCartDetails(cartDetails));
        }
    }, []);
};
