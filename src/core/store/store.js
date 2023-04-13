import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import authReducer from "@store/auth/authSlice";
import productsReducer from "@store/products/productsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        // Add additional reducers for other features here
    },
    middleware: [thunkMiddleware],
});

export default store;
