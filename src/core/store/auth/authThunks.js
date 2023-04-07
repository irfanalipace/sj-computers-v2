import {
    LOGIN,
    LOGOUT,
    REGISTER,
    LOADING,
    CLEAR_LOADING,
    VERIFY_EMAIL,
    VERIFY_OTP,
    API_ERROR,
} from "@store/auth/authSlice";
import { loginApi, logoutApi, registerApi, verifyOtpApi } from "@api/auth";
import { verifyEmailApi } from "@api/auth";
import { saveToken, destroyToken, saveUserEmail } from "@services/jwtService";

export const login = (credentials, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await loginApi(credentials);
            // let token = response.data.data.access_token;
            dispatch({ type: LOGIN, payload: credentials.email });
            cb();
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error.data.errors });
        }
    };
};

export const register = (credentials, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await registerApi(credentials);
            let token = response.data.data.access_token;
            dispatch({ type: REGISTER, payload: credentials });
            cb();
        } catch (error) {
            console.log("Something went wrong in register", error);
            dispatch({ type: API_ERROR, payload: error.data.errors });
        }
    };
};

export const logout = (cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await logoutApi();
            destroyToken();
            dispatch({ type: LOGOUT });
            cb();
        } catch (error) {
            console.log("Something went wrong in logout", error);
            dispatch({ type: API_ERROR, payload: error.data.errors });
        }
    };
};

export const verifyEmail = (email, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await verifyEmailApi(email);
            saveUserEmail(email);
            dispatch({ type: VERIFY_EMAIL, payload: email });
            cb();
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error.data.errors });
        }
    };
};

export const verifyOtp = (credentials, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await verifyOtpApi(credentials);
            let token = response.data.data.access_token;
            // saveToken(token, "", credentials.email);
            dispatch({ type: VERIFY_OTP, payload: {} });
            cb();
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error.data.errors });
        }
    };
};

export const resetPassword = (credentials, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await resetPasswordApi(credentials);
            let token = response.data.data.access_token;
            saveToken(token, "", credentials.email);
            dispatch({ type: VERIFY_OTP, payload: {} });
            cb();
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error.data.errors });
        }
    };
};
