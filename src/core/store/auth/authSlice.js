import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    apiError: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        LOGIN: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        LOGOUT: (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
        },
        REGISTER: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        alreadyLoggedIn: (state) => {
            state.isAuthenticated = true;
        },
        VERIFY_EMAIL: (state, payload) => {
            state.user.email = payload;
        },
    },
});
export const {
    LOGIN,
    LOGOUT,
    REGISTER,
    alreadyLoggedIn,
    LOADING,
    CLEAR_LOADING,
    VERIFY_EMAIL
} = authSlice.actions;
export default authSlice.reducer;
