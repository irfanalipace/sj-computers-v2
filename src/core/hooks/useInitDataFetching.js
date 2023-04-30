import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getShippingDetails } from "@store/orders/ordersThunk";
import { fetchBrands } from "@store/brands/brandsThunks";
import { fetchCategory } from "@store/category/categoryThunks";
import {
    addToLocalCart,
    syncCartItems,
    setCartDetails,
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
            deleteNotLocalCartItem(); //deletes all the no local cart items from local storage so that if user deletes the  item from backend of from another browser then it should not be added in the cart again automatically
            dispatch(getShippingDetails());
            dispatch(syncCartItems()); //gets all the cart items stored in database and stores them in store and local storage similarly stores local cart items in database
        }
    }, [isAuthenticated]);
};
