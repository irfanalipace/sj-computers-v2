import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getShippingDetails } from "@store/orders/ordersThunk";
import { fetchBrands } from "@store/brands/brandsThunks";
import { fetchCategory } from "@store/category/categoryThunks";
import { CLEAR_CART } from "@store/cart/cartSlice";
import {
    addToLocalCart,
    syncCartItems,
    setCartDetails,
    syncGuestUserCart,
    clearCart,
} from "@store/cart/cartThunks";
import { updateState, currentState } from "@store/states/statesThunks";
import { getEstimatedDelivery } from "@store/orders/ordersThunk";
import {
    getCartItems,
    getCartDetails,
    clearCartLocally,
} from "@utils/cartHelpers";
import { clearCartApi } from "../../../core/api/cart";

const AppWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartItems = useSelector((state) => state.cart.cart);
    const cartDetails = getCartDetails();
    const state = useSelector((state) => state.states.currentState);
    const [isMounted, setIsMounted] = useState(false);
    let timer = null;
    const timeToTimeout = 15 * 60000; // 15 minutes
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(CLEAR_CART()); //clear store cart items because all cart items are again fetched from backend to sync with localCart
            dispatch(getShippingDetails()); // fetch shipping details of customer and stor in redux
            dispatch(syncCartItems()); //gets all the cart items stored in database and stores them in store and local storage similarly stores local cart items in database
            dispatch(currentState()); // fetches current state from api and sets in redux store
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
        // if (isMounted)
        setTimeout(() => {
            dispatch(getEstimatedDelivery(state?.id));
        }, 3000); // giving timeout to increase initial page load speed
    }, [state]);

    // useEffect(() => {
    //     if (isAuthenticated && cartItems?.length > 0) {
    //         if (!document._clickListenerAdded) {
    //             // attach click listener only if its not previously attached
    //             document.addEventListener("click", clearCartAfterTimeout);
    //             document._clickListenerAdded = true;
    //         }
    //         if (!timer) clearCartAfterTimeout(); // start timer whenever user adds items in cart only if timer is not created previously
    //     }

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [cartItems]);

    // const clearCartAfterTimeout = () => {
    //     if (timer) {
    //         clearTimeout(timer);
    //         timer = null;
    //     }
    //     timer = setTimeout(async () => {
    //         try {
    //             await clearCartApi(); // clear the cart if user remains idel for more than timeout time.
    //             clearCartLocally(); // clear cart from local storage
    //             dispatch(CLEAR_CART()); // clear cart from redux
    //         } catch (error) {}
    //     }, timeToTimeout);
    // };

    useEffect(() => {
        timer = setTimeout(() => {
            dispatch(fetchCategory());
            dispatch(fetchBrands());
        }, 3000); // giving timeout to increase initial page load speed
        if (!isAuthenticated) {
            dispatch(syncGuestUserCart(cartDetails));
        }
        setIsMounted(true);
    }, []);

    return <div>{children}</div>;
};

export default AppWrapper;
