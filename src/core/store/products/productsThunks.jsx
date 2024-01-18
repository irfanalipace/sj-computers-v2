import {
    LOADING,
    FETCH_PRODUCTS,
    SEARCH_PRODUCTS,
    FILTER_PRODUCTS,
    SET_FILTERING_PRODUCTS,
    SET_IS_SHOW_MORE,
    FETCH_SIMILAR_PRODUCTS,
    RESET_PAGE,
    API_ERROR,
} from "@store/products/productsSlice";
import {
    productsApi,
    searchProductsApi,
    filterProductsApi,
    similarProducts,
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

export const fetchSimilarProducts = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SET_IS_SHOW_MORE, payload: {} });
            const response = await similarProducts(data);
            console.log(response?.data?.data);
            dispatch({
                type: FETCH_SIMILAR_PRODUCTS,
                payload: response?.data?.data,
            });
        } catch (error) {
            console.print("Something went wrong in products", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const searchProducts = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await searchProductsApi(data);
            if (data.page === 1) dispatch(RESET_PAGE());
            dispatch({
                type: SEARCH_PRODUCTS,
                payload: {
                    data: [...response?.data?.data],
                    searchString: data.name,
                },
            });
        } catch (error) {
            console.print("Something went wrong in products", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const filterProducts = (filter, loadMore = false) => {
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
