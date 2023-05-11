import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingDetails: {},
    ordergDetails: {},
    settingAdress: false,
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
        SETTING_ADDRESS: (state) => {
            state.settingAdress = true;
        },
        SET_SHIPPING_DETAILS: (state, action) => {
            state.shippingDetails = { ...action.payload };
            state.isLoading = false;
            state.settingAdress = false;
        },
        SET_ORDER_DETAILS: (state, action) => {
            state.ordergDetails = { ...action.payload };
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
            state.settingAdress = false;
        },
    },
});
export const {
    LOADING,
    SETTING_ADDRESS,
    CLEAR_LOADING,
    SET_SHIPPING_DETAILS,
    SET_ORDER_DETAILS,
    ORDER_PLACED,
    PLACING_ORDER,
    API_ERROR,
} = ordersSlice.actions;
export default ordersSlice.reducer;
