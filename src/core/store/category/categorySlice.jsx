import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    apiError: false,
    isLoading: false,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        FETCH_CATEGORIES: (state, action) => {
            state.categories = [...action.payload];
            state.isLoading = false;
        },
        CLEAR_CATEGORIES: (state) => {
            state.categories = [];
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
    FETCH_CATEGORIES,
    CLEAR_CATEGORIES,
    API_ERROR,
} = categorySlice.actions;
export default categorySlice.reducer;
