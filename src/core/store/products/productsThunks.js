import {
    LOADING,
    FETCH_PRODUCTS,
    SEARCH_PRODUCTS,
    FILTER_PRODUCTS,
    SET_FILTERING_PRODUCTS,
    SET_IS_SHOW_MORE,
    RESET_PAGE,
    API_ERROR,
} from "@store/products/productsSlice";
import {
    productsApi,
    searchProductsApi,
    filterProductsApi,
} from "@api/products";

export const fetchProducts = (page = 1, loadMore = false, per_page = 12) => {
    return async (dispatch) => {
        try {
            if (loadMore) dispatch({ type: SET_IS_SHOW_MORE, payload: {} });
            else dispatch({ type: LOADING, payload: {} });
            const response = await productsApi(page, per_page);
            dispatch({
                type: FETCH_PRODUCTS,
                payload: response?.data?.data,
            });
        } catch (error) {
            console.print("Something went wrong in products", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const searchProducts = (name = "", page = 1, per_page = 12) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await searchProductsApi(name, page, per_page);
            if (page === 1) dispatch(RESET_PAGE());
            dispatch({
                type: SEARCH_PRODUCTS,
                payload: {
                    data: [...response?.data?.data],
                    searchString: name,
                },
            });
        } catch (error) {
            console.print("Something went wrong in products", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const filterProducts = (filter, loadMore = false) => {
    console.log('fillllll' ,  filter)
    
    return async (dispatch) => {
        try {
            if (loadMore) dispatch({ type: SET_IS_SHOW_MORE, payload: {} });
            else {
                dispatch({ type: LOADING, payload: {} });
                dispatch({ type: SET_FILTERING_PRODUCTS, payload: {} });
            }
            // const filterdata=
            const response = await filterProductsApi(filter);
            if (filter.page === 1) dispatch(RESET_PAGE());
            if (response?.data?.data) {
                dispatch({
                    type: FILTER_PRODUCTS,
                    payload: {
                        data: [...response?.data?.data],
                    },
                });
            } else {
                dispatch({ type: API_ERROR, payload: {} });
            }
        } catch (error) {
            console.print("Something went wrong in products", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
