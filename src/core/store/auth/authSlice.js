import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    apiError: null,
    isLoading: false,
    accessToken: "",
    currentPage: 1,
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
            state.accessToken = action.payload.token;
            state.currentPage = state.currentPage + 1;
            state.apiError = null;
        },
        LOGOUT: (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
            state.apiError = null;
        },
        REGISTER: (state) => {
            state.isLoading = false;
            state.apiError = null;
        },
        ALREADY_LOGGED_IN: (state, action) => {
            state.isAuthenticated = true;
            state.user = { ...action.payload };
            state.isLoading = false;
        },
        VERIFY_EMAIL: (state) => {
            state.isLoading = false;
            state.currentPage = state.currentPage + 1;
            state.apiError = null;
        },
        VERIFY_OTP: (state, action) => {
            state.isAuthenticated = true;
            state.user = { ...action.payload };
            state.user.profile_pic = action.payload.profile_pic;
            state.isLoading = false;
            state.currentPage = 1;
            state.apiError = null;
        },
        UPDATE_PROFILE: (state, action) => {
            state.user = { ...action.payload };
            state.isLoading = false;
        },
        API_ERROR: (state, action) => {
            state.apiError = { ...action.payload };
            state.isLoading = false;
        },
        CLEAR_API_ERRORS: (state) => {
            state.apiError = null;
        },
    },
});
export const {
    LOGIN,
    LOGOUT,
    REGISTER,
    ALREADY_LOGGED_IN,
    LOADING,
    CLEAR_LOADING,
    VERIFY_EMAIL,
    VERIFY_OTP,
    UPDATE_PROFILE,
    API_ERROR,
    CLEAR_API_ERRORS,
} = authSlice.actions;
export default authSlice.reducer;
