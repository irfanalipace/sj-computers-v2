import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    apiError: false,
    messageResponse: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LOGIN: (state, action) => {
            state.isAuthenticated = true;
            state.apiError = false;
            state.user = action.payload;
        },
        LOGOUT: (state) => {
            state.isAuthenticated = false;
            state.apiError = false;
            state.user = null;
        },
        REGISTER: (state, action) => {
            state.isAuthenticated = true;
            state.apiError = false;
            state.user = action.payload;
        },
        alreadyLoggedIn: (state) => {
            state.isAuthenticated = true;
        },
    },
});
export const { LOGIN, LOGOUT, REGISTER, alreadyLoggedIn, API_ERROR } =
    authSlice.actions;
export default authSlice.reducer;
