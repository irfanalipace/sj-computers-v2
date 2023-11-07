import {
    LOADING,
    FETCH_CATEGORIES,
    API_ERROR,
} from "@store/category/categorySlice";
import { categoryApi } from "@api/category";

const restrictedCategories = ["tablet", "monitor", "category-1", "category-2"];

export const fetchCategory = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await categoryApi();
            if (response.data?.length > 0) {
                const categories = response?.data?.filter((category) =>
                    restrictedCategories?.includes(category?.slug)
                );
                dispatch({ type: FETCH_CATEGORIES, payload: categories });
            }
        } catch (error) {
            console.print("Something went wrong in category", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
