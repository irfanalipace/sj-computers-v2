import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import authReducer from "@store/auth/authSlice";
import productsReducer from "@store/products/productsSlice";
import categoryReducer from "@store/category/categorySlice";
import statesReducer from "@store/states/statesSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        category: categoryReducer,
        states: statesReducer,
        // Add additional reducers for other features here
    },
    middleware: [thunkMiddleware],
});

export default store;
