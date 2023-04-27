import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    details: {},
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
            let cart = { ...action.payload };
            console.log("cart: ", cart);
            state.cart = [...state.cart, { ...action.payload }];
            state.isLoading = false;
        },

        ADD_TO_LOCAL_CART: (state, action) => {
            let items = { ...action.payload.data };
            delete items.details;
            let details = { ...action.payload.data.details };
            state.cart = [...state.cart, [...items]];
            state.details = { ...details };
            state.isLoading = false;
        },

        CREATE_LOCAL_CART: (state, action) => {
            let items = { ...action.payload.data };
            console.log("state.items: ", items);
            delete items.details;
            let details = { ...action.payload.data.details };
            state.cart = [...state.cart, [...items]];
            state.details = { ...details };
            state.isLoading = false;
            console.log("stat.cart: ", state.cart);
        },
        CLEAR_CART: (state) => {
            state.cart = [];
        },
        DELETE_ITEM: (state, action) => {
            let index = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        UPDATE_QUANTITY: (state, action) => {
            let index = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.cart[index] = { ...state.cart[index], loading: false };
            }
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
    CREATE_LOCAL_CART,
    CLEAR_CART,
    API_ERROR,
    DELETE_ITEM,
    UPDATE_QUANTITY,
    UPDATING,
} = cartSlice.actions;
export default cartSlice.reducer;
