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
            state.products = [...state.products, ...action.payload];
            state.currentPage += 1;
        },
        CLEAR_PRODUCTS: (state) => {
            state.products = [];
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
    API_ERROR,
} = productSlice.actions;
export default productSlice.reducer;
