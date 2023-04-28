import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingDetails: {},
    apiError: false,
    isLoading: false,
    placingOrder: false,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        SET_SHIPPING_DETAILS: (state, action) => {
            state.shippingDetails = { ...action.payload };
            state.isLoading = false;
        },
        PLACING_ORDER: (state) => {
            state.placingOrder = true;
        },
        ORDER_PLACED: (state) => {
            state.placingOrder = false;
        },
        API_ERROR: (state, action) => {
            state.apiError = { ...action.payload };
            state.isLoading = false;
            state.placingOrder = false;
        },
    },
});
export const {
    LOADING,
    CLEAR_LOADING,
    SET_SHIPPING_DETAILS,
    ORDER_PLACED,
    PLACING_ORDER,
    API_ERROR,
} = ordersSlice.actions;
export default ordersSlice.reducer;
