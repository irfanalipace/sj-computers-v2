import { createSlice } from "@reduxjs/toolkit";
import * as types from "@store/features/auth/authTypes";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        [types.LOGIN_SUCCESS]: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        [types.LOGOUT_SUCCESS]: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },

        [types.REGISTER_SUCCESS]: (state) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        [types.REGISTER_SUCCESS]: (state) => {
            state.isAuthenticated = false;
            state.user = action.payload;
        },
    },
});

export default authSlice.reducer;
