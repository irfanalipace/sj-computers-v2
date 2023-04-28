import {
    LOADING,
    SET_SHIPPING_DETAILS,
    API_ERROR,
} from "@store/orders/ordersSlice";
import { getShippingAddressApi, setShippingAddressApi } from "@api/checkout";

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

export const setShippingDetails = (data, cb) => {
    return async (dispatch) => {
        try {
            if (typeof cb === "function") cb();
            dispatch({ type: LOADING, payload: {} });
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
