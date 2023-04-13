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
            dispatch({ type: FETCH_PRODUCTS, payload: response.data });
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
            dispatch({ type: FETCH_PRODUCTS, payload: { error } });
        }
    };
};
