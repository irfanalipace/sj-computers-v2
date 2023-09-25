import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    details: {
        total_items: 0,
        sub_total: 0,
        total: 0,
    },
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
        UPDATING: (state, action) => {
            let index = state.cart.findIndex(
                (item) => item.id === action.payload.cartItem.id
            );
            if (index >= 0) {
                state.cart[index] = { ...state.cart[index], loading: true };
            }
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        ADD_TO_CART: (state, action) => {
            let item = { ...action.payload.cartItem };
            state.cart = [...state.cart, { ...item }];
            state.details = { ...action.payload.cartDetails };
            state.isLoading = false;
        },

        ADD_LIST_TO_CART: (state, action) => {
            let items = action.payload.cartItems;
            state.cart = [...state.cart, ...items];
            state.details = { ...action.payload.cartDetails };
            state.isLoading = false;
        },

        ADD_TO_LOCAL_CART: (state, action) => {
            let items = { ...action.payload.cartItems };
            let details = { ...action.payload.cartDetails };
            state.cart = [...state.cart, [...items]];
            if (details) {
                state.details = { ...details };
            }
            state.isLoading = false;
        },

        CLEAR_CART: (state) => {
            console.print("clearing cart");
            state.cart = [];
            state.details = {
                total_items: 0,
                total: 0,
                sub_total: 0,
            };
        },
        DELETE_ITEM: (state, action) => {
            let cartItem = { ...action.payload.cartItem };
            let details = { ...action.payload.cartDetails };
            let index = state.cart.findIndex((item) => item.id === cartItem.id);
            if (index >= 0) {
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
            if (index >= 0) {
                if (cartItem?.in_stock)
                    state.cart[index] = {
                        ...state.cart[index],
                        quantity: cartItem.quantity,
                        price: cartItem.price,
                        product: {
                            ...state.cart[index].product,
                            in_stock: cartItem.in_stock,
                        },
                        error: cartItem.error,
                        loading: false,
                    };
                else
                    state.cart[index] = {
                        ...state.cart[index],
                        product: {
                            ...state.cart[index].product,
                        },
                        loading: false,
                    };
                if (details) {
                    state.details = { ...details };
                }
            }
            state.updatingItem = false;
        },
        SET_OUT_OF_STOCK: (state, action) => {
            let cartItem = { ...action.payload.cartItem };
            let index = state.cart.findIndex((item) => item.id === cartItem.id);
            if (index >= 0) {
                state.cart[index] = {
                    ...state.cart[index],
                    product: {
                        ...state.cart[index].product,
                        in_stock: cartItem.in_stock,
                    },
                    loading: false,
                };
            }
            state.updatingItem = false;
        },

        UPDATE_LOCAL_PROPERTY_OF_ALL_ITEMS: (state, action) => {
            const cartItems = state.cart.map((item) => {
                return {
                    ...item,
                    notLocal: true,
                };
            });
            state.cart = cartItems;
        },
        SET_CART_DETAILS: (state, action) => {
            state.details = { ...action.payload };
        },
        SET_CART_ERRORS: (state, action) => {
            state.details = action.payload.cartDetails;
            state.cart = action.payload.cartItems;
        },
        API_ERROR: (state, action) => {
            state.apiError = { ...action.payload };
            state.isLoading = false;
        },
        UPDATED_QUANTITY: (state, action) => {
            state.isLoading = false;
            let index = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index >= 0) {
                state.cart[index] = { ...state.cart[index], loading: false };
            }
        },
    },
});
export const {
    LOADING,
    CLEAR_LOADING,
    ADD_TO_CART,
    ADD_LIST_TO_CART,
    SET_CART_DETAILS,
    CLEAR_CART,
    API_ERROR,
    DELETE_ITEM,
    UPDATE_QUANTITY,
    UPDATING,
    UPDATE_LOCAL_PROPERTY_OF_ALL_ITEMS,
    UPDATED_QUANTITY,
    SET_OUT_OF_STOCK,
    SET_CART_ERRORS,
} = cartSlice.actions;
export default cartSlice.reducer;
