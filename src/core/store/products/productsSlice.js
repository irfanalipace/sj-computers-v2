import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    searchString: null,
    isSearchedProducts: false,
    filtersArray: [],
    apiError: false,
    isLoading: false,
    currentPage: 1,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        FETCH_PRODUCTS: (state, action) => {
            if (state.currentPage === 1) state.products = [...action.payload];
            else state.products = [...state.products, ...action.payload];
            state.currentPage = state.currentPage + 1;
            state.isLoading = false;
        },
        SEARCH_PRODUCTS: (state, action) => {
            if (state.currentPage === 1)
                state.products = [...action.payload.data];
            else state.products = [...state.products, ...action.payload.data];
            state.currentPage = state.currentPage + 1;
            state.searchString = action.payload.searchString;
            state.isLoading = false;
        },

        FILTER_PRODUCTS: (state, action) => {
            if (state.currentPage === 1)
                state.products = [...action.payload.data];
            else state.products = [...state.products, ...action.payload.data];
            state.currentPage = state.currentPage + 1;
            state.isLoading = false;
        },
        SET_SEARCH_STRING: (state, action) => {
            state.searchString = action.payload;
        },
        SET_FILTERS_ARRAY: (state, action) => {
            state.filtersArray = [...action.payload];
        },
        CLEAR_SEARCH: (state) => {
            state.searchString = null;
            state.currentPage = 1;
            state.products = [];
        },
        CLEAR_PRODUCTS: (state) => {
            state.products.splice(12, state.products.length - 12);
            state.currentPage = 2;
        },
        CLEAR_ALL_PRODUCTS: (state) => {
            state.products = [];
            state.currentPage = 1;
        },
        RESET_PAGE: (state) => {
            state.currentPage = 1;
        },
        API_ERROR: (state, action) => {
            state.apiError = { ...action.payload };
            state.isLoading = false;
        },
    },
});
export const {
    LOADING,
    CLEAR_LOADING,
    FETCH_PRODUCTS,
    SET_FILTERS_ARRAY,
    SEARCH_PRODUCTS,
    SET_SEARCH_STRING,
    FILTER_PRODUCTS,
    CLEAR_PRODUCTS,
    CLEAR_SEARCH,
    CLEAR_ALL_PRODUCTS,
    RESET_PAGE,
    API_ERROR,
} = productSlice.actions;
export default productSlice.reducer;
