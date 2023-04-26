import {
    LOADING,
    ADD_TO_CART,
    ADD_TO_LOCAL_CART,
    DELETE_ITEM,
    UPDATE_QUANTITY,
    UPDATING,
    API_ERROR,
} from "@store/cart/cartSlice";
import { addToCartApi, fetchCartApi, deleteItemApi } from "@api/cart";

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

export const deleteItem = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATING, payload: {} });
            await deleteItemApi(data);
            dispatch({
                type: DELETE_ITEM,
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
            dispatch({ type: UPDATING, payload: {} });
            let response = await fetchCartApi();
            dispatch({
                type: UPDATE_QUANTITY,
                payload: response.data,
            });
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const addToLocalCart = (data) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_TO_LOCAL_CART,
            payload: data,
        });
    };
};
