import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getShippingDetails } from "@store/orders/ordersThunk";
import { fetchBrands } from "@store/brands/brandsThunks";
import { fetchCategory } from "@store/category/categoryThunks";
import {
    addToLocalCart,
    addToCart,
    fetchCartItems,
    setCartDetails,
} from "@store/cart/cartThunks";
import {
    getCartItems,
    getCartDetails,
    findMissingObjects,
    addItemToLocalCart,
    createCartObject,
} from "@utils/helpers";

export const useInitDataFetching = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const storeCartItems = useSelector((state) => state.cart.cart);
    const cartItems = getCartItems() || [];
    const cartDetails = getCartDetails();
    // if (!cartItems.length > 0) dispatch(fetchCartItems());

    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(fetchBrands());
        dispatch(getShippingDetails());

        if (isAuthenticated) {
            // dispatch(fetchCartItems());
        } else {
            cartItems.forEach((cartItem) => {
                dispatch(addToLocalCart({ cartItem }));
            });
            dispatch(setCartDetails(cartDetails));
        }
    }, []);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         console.log("storeCartItems: ", storeCartItems);
    //         console.log("cartItems: ", cartItems);
    //         const [missingObjects1, missingObjects2] = findMissingObjects(
    //             storeCartItems,
    //             cartItems
    //         );
    //         if (missingObjects1?.length > 0) {
    //             missingObjects1?.forEach((object) => {
    //                 addItemToLocalCart(createCartObject(object));
    //             });
    //         }
    //         if (missingObjects2?.length > 0) {
    //             missingObjects2?.forEach((object) => {
    //                 // dispatch(addToCart(object));
    //             });
    //         }
    //     }
    // }, [storeCartItems]);
};
