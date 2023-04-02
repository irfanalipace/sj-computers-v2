import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "@core/store/features/auth/authTypes";
import { loginApi, logoutApi } from "@api/auth/login";

export const login = (credentials) => {
    return async (dispatch) => {
        dispatch({ type: types.LOGIN_REQUEST });
        try {
            const response = await api.loginApi(credentials);
            // const response = {
            //     userName: "haroon",
            //     userEmail: "test@email.com",
            // };
            dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: types.LOGIN_FAILURE, payload: error.message });
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: types.LOGOUT_REQUEST });
        try {
            await logoutApi();
            dispatch({ type: types.LOGOUT_SUCCESS });
        } catch (error) {
            dispatch({ type: types.LOGOUT_FAILURE, payload: error.message });
        }
    };
};
