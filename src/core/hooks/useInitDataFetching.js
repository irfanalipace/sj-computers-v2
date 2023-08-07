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
import { updateState } from "@store/states/statesThunks";
import { getEstimatedDelivery } from "@store/orders/ordersThunk";
import { getCartItems, getCartDetails } from "@utils/cartHelpers";

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
            // dispatch(currentState());
            // dispatch(conditionState());

            if (!window.localStorage.getItem("state")?.id) {
                const tempState = JSON.parse(
                    window.localStorage.getItem("tempState")
                );
                if (tempState?.id) {
                    // Dispatch the state from tempState and remove tempState from localStorage
                    //   dispatch(tempState);
                    dispatch(updateState(tempState));
                }
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchCategory());
            dispatch(fetchBrands());
            dispatch(getEstimatedDelivery());

            if (!isAuthenticated) {
                cartItems.forEach((cartItem) => {
                    dispatch(addToLocalCart({ cartItem })); // adds local cart items to redux store
                });
                dispatch(setCartDetails(cartDetails)); // add local store details to redux store
            }
        }, 2000); // giving timeout to increase initial page load speed
    }, []);
};
