import { toast } from "react-toastify";

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
import {
    loginApi,
    logoutApi,
    registerApi,
    verifyOtpApi,
    resetPasswordApi,
    forgetPasswordApi,
} from "@api/auth";
import { verifyEmailApi } from "@api/auth";
import {
    saveToken,
    destroyToken,
    saveUserEmail,
    saveUserPassword,
    destroyUserPassword,
    saveTempToken,
    getTempToken,
} from "@services/jwtService";

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await loginApi(credentials);
            let token = response.data.data.access_token;
            saveToken("", "", credentials.email);
            saveTempToken(token);
            saveUserPassword(credentials.password);
            dispatch({
                type: LOGIN,
                payload: { user: { ...credentials }, token },
            });
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const register = (credentials, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await registerApi(credentials);
            dispatch({ type: REGISTER, payload: credentials });
            if (typeof cb === "function") cb();
        } catch (error) {
            console.log("Something went wrong in register", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
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
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
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
            if (typeof cb === "function") cb();
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const verifyOtp = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await verifyOtpApi(credentials);
            // let token = response.data.data.access_token;
            let temp_token = getTempToken();
            console.log("temp_token: " + temp_token);
            saveToken(temp_token, "", credentials.email);
            dispatch({ type: VERIFY_OTP, payload: {} });
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const resetPassword = (credentials, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await resetPasswordApi(credentials);
            dispatch({ type: CLEAR_LOADING, payload: {} });
            toast.success("Password reset successfully");
            if (typeof cb === "function") cb();
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const forgetPassword = (email, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await forgetPasswordApi({ email });
            dispatch({ type: CLEAR_LOADING, payload: {} });
            if (typeof cb === "function") cb();
        } catch (error) {
            console.log("Something went wrong in forgetPasswordApi", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
