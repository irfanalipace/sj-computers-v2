import {
    LOADING,
    FETCH_CATEGORY,
    API_ERROR,
} from "@store/category/categorySlice";
import { categoryApi } from "@api/category";

export const fetchCategory = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await categoryApi();
            dispatch({ type: FETCH_CATEGORY, payload: response.data.data });
        } catch (error) {
            console.log("Something went wrong in category", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
