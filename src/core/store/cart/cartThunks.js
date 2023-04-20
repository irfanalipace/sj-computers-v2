import { LOADING, ADD_TO_CART, API_ERROR } from "@store/carts/cartsSlice";
import { addToCartApi } from "@api/cart";

export const fetchProducts = (data) => {
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
