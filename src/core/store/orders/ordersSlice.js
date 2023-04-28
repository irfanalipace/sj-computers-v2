import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingDetails: {},
    apiError: false,
    isLoading: false,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        SET_SHIPPING_DETAILS: (state, action) => {
            state.shippingDetails = { ...action.payload };
            state.isLoading = false;
        },
        API_ERROR: (state, action) => {
            state.apiError = { ...action.payload };
            state.isLoading = false;
        },
    },
});
export const { LOADING, SET_SHIPPING_DETAILS, API_ERROR } = ordersSlice.actions;
export default ordersSlice.reducer;
