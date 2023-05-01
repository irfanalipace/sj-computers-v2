import {
    LOADING,
    ADD_TO_CART,
    ADD_TO_LOCAL_CART,
    SET_CART_DETAILS,
    DELETE_ITEM,
    UPDATE_QUANTITY,
    UPDATING,
    API_ERROR,
} from "@store/cart/cartSlice";
import { addToCartApi, fetchCartApi, deleteItemApi } from "@api/cart";
import {
    deleteCartItem,
    addItemToLocalCart,
    updateCartItem,
} from "@utils/helpers";

export const addToCart = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            let param = {
                product_id: data.cartItem.id,
                qty: data.cartItem.quantity,
            };
            await addToCartApi(param);
            dispatch({
                type: ADD_TO_CART,
                payload: data,
            });
            addItemToLocalCart(data);
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const deleteItem = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATING, payload: data });
            await deleteItemApi(data.cartItem);
            deleteCartItem(data);
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

export const updateQuantity = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATING, payload: data });
            await deleteItemApi(data);
            updateCartItem(data);
            dispatch({
                type: UPDATE_QUANTITY,
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

export const addToLocalCart = (data) => {
    return async (dispatch) => {
        addItemToLocalCart(data);
        dispatch({
            type: ADD_TO_CART,
            payload: data,
        });
    };
};

export const deleteLocalItem = (data) => {
    return async (dispatch) => {
        deleteCartItem(data);
        dispatch({
            type: DELETE_ITEM,
            payload: data,
        });
    };
};

export const updateLocalQuantity = (data) => {
    return async (dispatch) => {
        updateCartItem(data);
        dispatch({
            type: UPDATE_QUANTITY,
            payload: data,
        });
    };
};

export const setCartDetails = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_CART_DETAILS,
            payload: data,
        });
    };
};

export const addListToCart = (data) => {
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
