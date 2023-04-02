import { createSlice } from "@reduxjs/toolkit";
import * as types from "@core/store/features/auth/authTypes";

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        [types.LOGIN_REQUEST]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [types.LOGIN_SUCCESS]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        [types.LOGIN_FAILURE]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [types.LOGOUT_REQUEST]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [types.LOGOUT_SUCCESS]: (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        [types.LOGOUT_FAILURE]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default authSlice.reducer;
