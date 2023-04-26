import { LOADING, ADD_TO_CART, API_ERROR } from "@store/cart/cartSlice";
import { addToCartApi, fetchCartApi } from "@api/cart";

export const addToCart = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await addToCartApi(data);
            dispatch({
                type: ADD_TO_CART,
                payload: data,
            });
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const fetchCartItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            let response = await fetchCartApi();
            dispatch({
                type: ADD_TO_CART,
                payload: response.data,
            });
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const createLocalCart = (data) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_TO_CART,
            payload: data,
        });
    };
};
