import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    apiError: false,
    isLoading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        ADD_TO_CART: (state, action) => {
            console.log("cart items: ", action.payload);
            state.cart = [...state.cart, ...action.payload];
            state.isLoading = false;
        },
        CLEAR_CART: (state) => {
            state.cart = [];
        },
        DELETE_ITEM: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
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
    ADD_TO_CART,
    CLEAR_CART,
    API_ERROR,
    DELETE_ITEM,
} = cartSlice.actions;
export default cartSlice.reducer;
