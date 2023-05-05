import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
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
        CLEAR_PRODUCTS: (state) => {
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
    CLEAR_PRODUCTS,
    RESET_PAGE,
    API_ERROR,
} = productSlice.actions;
export default productSlice.reducer;
