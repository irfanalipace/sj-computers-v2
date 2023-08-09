import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import authReducer from "@store/auth/authSlice";
import productsReducer from "@store/products/productsSlice";
import categoryReducer from "@store/category/categorySlice";
import statesReducer from "@store/states/statesSlice";
import brandsReducer from "@store/brands/brandsSlice";
import cartReducer from "@store/cart/cartSlice";
import ordersReducer from "@store/orders/ordersSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        category: categoryReducer,
        states: statesReducer,
        brands: brandsReducer,
        cart: cartReducer,
        orders: ordersReducer,
        // Add additional reducers for other features here
        // reducer: toggleSlice.reducer,
    },
    middleware: [thunkMiddleware],
});

export default store;
