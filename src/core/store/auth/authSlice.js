import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    apiError: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        IS_LOADING:(state, action)=>{
            state.isLoading = true;
        },
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
export const { LOGIN, LOGOUT, REGISTER, alreadyLoggedIn, IS_LOADING } =  authSlice.actions;
export default authSlice.reducer;
