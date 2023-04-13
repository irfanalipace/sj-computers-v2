import { LOADING, FETCH_PRODUCTS, API_ERROR } from "@store/auth/authSlice";
import { productsApi } from "@api/auth";

export const fetchProducts = (page) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await productsApi(page);
            dispatch({ type: FETCH_PRODUCTS, payload: response.data });
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
