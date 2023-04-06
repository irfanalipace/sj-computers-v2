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
            state.isLoading = false;
            state.password = action.payload;
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
            state.isLoading = false;
        },
        VERIFY_EMAIL: (state, action) => {
            state.user.email = action.payload;
        },
        VERIFY_OTP: (state, action) => {
            state.user.isAuthenticated = true;
            state.user = action.payload;
            state.isLoading = false;
        },
        API_ERROR: (state, action) => {
            state.apiError = action.payload;
            state.isLoading = false;
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
    VERIFY_EMAIL,
    VERIFY_OTP,
    API_ERROR,
} = authSlice.actions;
export default authSlice.reducer;
