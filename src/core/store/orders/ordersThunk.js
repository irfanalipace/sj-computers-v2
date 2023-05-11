import {
    LOADING,
    SETTING_ADDRESS,
    SET_SHIPPING_DETAILS,
    SET_ORDER_DETAILS,
    PLACING_ORDER,
    ORDER_PLACED,
    API_ERROR,
} from "@store/orders/ordersSlice";
import {
    getShippingAddressApi,
    setShippingAddressApi,
    placeOrderApi,
} from "@api/checkout";
import {
    getOrderDetailsApi,
} from "@api/order";

import { clearCartLocally } from "@utils/cartHelpers";

export const getShippingDetails = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            let response = await getShippingAddressApi();
            dispatch({
                type: SET_SHIPPING_DETAILS,
                payload: response.data,
            });
        } catch (error) {
            console.log("Something went wrong in orders", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
export const getOrderDetails = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            let response = await getOrderDetailsApi();
            dispatch({
                type: SET_ORDER_DETAILS,
                payload: response.data,
            });
        } catch (error) {
            console.log("Something went wrong in orders", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const setShippingDetails = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SETTING_ADDRESS, payload: {} });
            await setShippingAddressApi(data);
            dispatch({
                type: SET_SHIPPING_DETAILS,
                payload: data,
            });
        } catch (error) {
            console.log("Something went wrong in orders", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const placeOrder = (data, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PLACING_ORDER, payload: {} });
            let response = await placeOrderApi(data);
            clearCartLocally();

            if (typeof cb === "function") cb(response.data);
            dispatch({ type: ORDER_PLACED, payload: {} });
        } catch (error) {
            console.log("Something went wrong in orders", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
