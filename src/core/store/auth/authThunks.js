import {
    LOGIN,
    LOGOUT,
    REGISTER,
    LOADING,
    CLEAR_LOADING,
    VERIFY_EMAIL
} from "@store/auth/authSlice";
import { loginApi, logoutApi } from "@api/auth";
import { verifyEmailApi } from "@api/auth";
import { saveToken, destroyToken } from "@services/jwtService";

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await loginApi(credentials);
            let token = response.data.data.access_token;
            saveToken(token,'', credentials.email);
            dispatch({ type: LOGIN, payload: credentials });
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: CLEAR_LOADING, payload: {} });
        }
    };
};

export const register = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await loginApi(credentials);
            let token = response.data.data.access_token;
            saveToken(token, '', credentials.email);
            dispatch({ type: REGISTER, payload: credentials });
        } catch (error) {
            console.log("Something went wrong in register", error);
            dispatch({ type: CLEAR_LOADING, payload: {} });
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await logoutApi();
            destroyToken();
            dispatch({ type: LOGOUT });
        } catch (error) {
            console.log("Something went wrong in logout", error);
            dispatch({ type: CLEAR_LOADING, payload: {} });
        }
    };
};

export const verifyEmail = (email) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await verifyEmailApi(credentials);
            // let token = response.data.data.access_token;
            // saveToken(token,'', credentials.email);
            dispatch({ type: VERIFY_EMAIL, payload: email });
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: CLEAR_LOADING, payload: {} });
        }
    };
};