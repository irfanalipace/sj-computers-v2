import {
    LOADING,
    FETCH_CATEGORIES,
    API_ERROR,
} from "@store/category/categorySlice";
import { categoryApi } from "@api/category";

export const fetchCategory = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await categoryApi();
            dispatch({ type: FETCH_CATEGORIES, payload: response.data });
        } catch (error) {
            console.print("Something went wrong in category", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
