import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LOGIN: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        LOGOUT: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        REGISTER: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        alreadyLoggedIn: (state) => {
            state.isAuthenticated = true;
        },
    },
});
export const { LOGIN, LOGOUT, REGISTER, alreadyLoggedIn } = authSlice.actions;
export default authSlice.reducer;
