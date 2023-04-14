import {
    LOADING,
    FETCH_PRODUCTS,
    API_ERROR,
} from "@store/products/productsSlice";
import { productsApi } from "@api/products";

export const fetchProducts = (page = 1) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await productsApi(page);
            dispatch({
                type: FETCH_PRODUCTS,
                payload: response.data.data.data,
            });
        } catch (error) {
            console.log("Something went wrong in products", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
