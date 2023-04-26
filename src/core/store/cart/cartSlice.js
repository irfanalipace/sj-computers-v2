import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    apiError: false,
    isLoading: false,
    updatingItem: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        UPDATING: (state) => {
            state.updatingItem = true;
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        ADD_TO_CART: (state, action) => {
            console.log("cart: ", action);
            state.cart = [...state.cart, { ...action.payload }];
            state.isLoading = false;
        },

        ADD_TO_LOCAL_CART: (state, action) => {
            state.cart = [...state.cart, { ...action.payload }];
            state.isLoading = false;
        },
        CLEAR_CART: (state) => {
            state.cart = [];
        },
        DELETE_ITEM: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
            state.updatingItem = false;
        },
        UPDATE_QUANTITY: (state, action) => {
            state.cart = state.cart.findIndex(
                (item) => item.id !== action.payload.id
            );
            state.updatingItem = false;
        },
        API_ERROR: (state, action) => {
            state.apiError = { ...action.payload };
            state.isLoading = false;
            state.updatingItems = false;
        },
    },
});
export const {
    LOADING,
    CLEAR_LOADING,
    ADD_TO_CART,
    ADD_TO_LOCAL_CART,
    CLEAR_CART,
    API_ERROR,
    DELETE_ITEM,
    UPDATE_QUANTITY,
    UPDATING,
} = cartSlice.actions;
export default cartSlice.reducer;
