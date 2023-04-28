import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    details: {
        total_quantity: 0,
        total: 0,
    },
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
        UPDATING: (state, action) => {
            let index = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.cart[index] = { ...state.cart[index], loading: true };
            }
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        ADD_TO_CART: (state, action) => {
            let item = { ...action.payload.cartItem };
            let details = { ...action.payload.details };
            state.cart = [...state.cart, { ...item }];
            if (details) {
                state.details = { ...details };
            }
            state.isLoading = false;
        },

        ADD_TO_LOCAL_CART: (state, action) => {
            let item = { ...action.payload.cartItem };
            let details = { ...action.payload.details };
            state.cart = [...state.cart, { ...item }];
            if (details) {
                state.details = { ...details };
            }
            state.isLoading = false;
        },

        CLEAR_CART: (state) => {
            state.cart = [];
        },
        DELETE_ITEM: (state, action) => {
            let cartItem = { ...action.payload.cartItem };
            let details = { ...action.payload.cartDetails };
            let index = state.cart.findIndex((item) => item.id === cartItem.id);
            if (index !== -1) {
                state.cart.splice(index, 1);
                if (details) {
                    state.details = { ...details };
                }
            }
        },
        UPDATE_QUANTITY: (state, action) => {
            let cartItem = { ...action.payload.cartItem };
            let details = { ...action.payload.cartDetails };
            let index = state.cart.findIndex((item) => item.id === cartItem.id);
            if (index !== -1) {
                state.cart[index] = {
                    ...state.cart[index],
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                };
                if (details) {
                    state.details = { ...details };
                }
            }
        },
        SET_CART_DETAILS: (state, action) => {
            state.details = { ...action.payload };
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
    ADD_TO_LOCAL_CART,
    SET_CART_DETAILS,
    CLEAR_CART,
    API_ERROR,
    DELETE_ITEM,
    UPDATE_QUANTITY,
    UPDATING,
} = cartSlice.actions;
export default cartSlice.reducer;
