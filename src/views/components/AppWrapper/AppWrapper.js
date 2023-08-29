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
import { updateState, currentState } from "@store/states/statesThunks";
import { getEstimatedDelivery } from "@store/orders/ordersThunk";
import {
    getCartItems,
    getCartDetails,
    clearCartLocally,
} from "@utils/cartHelpers";

const AppWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartItems = getCartItems() || [];
    const cartDetails = getCartDetails();
    const state = useSelector((state) => state.states.currentState);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(clearCart()); //clear store cart items because all cart items are again fetched from backend to sync with localCart
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
        dispatch(getEstimatedDelivery(state?.id));
    }, [state]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchCategory());
            dispatch(fetchBrands());

            if (!isAuthenticated) {
                if (cartItems?.length > 0 && cartDetails?.total_items > 0) {
                    cartItems.forEach((cartItem) => {
                        dispatch(addToLocalCart({ cartItem })); // adds local cart items to redux store
                    });
                    dispatch(setCartDetails(cartDetails)); // add local store details to redux store
                } else {
                    clearCartLocally();
                }
            }
        }, 3000); // giving timeout to increase initial page load speed
    }, []);

    return <div>{children}</div>;
};

export default AppWrapper;
