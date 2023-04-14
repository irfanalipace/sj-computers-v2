import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: [],
    apiError: false,
    isLoading: false,
};

const productSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        FETCH_CATEGORY: (state, action) => {
            state.category = [...action.payload];
            state.currentPage = state.currentPage + 1;
        },
        CLEAR_CATEGORY: (state) => {
            state.category = [];
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
    FETCH_CATEGORY,
    CLEAR_CATEGORY,
    API_ERROR,
} = productSlice.actions;
export default productSlice.reducer;
