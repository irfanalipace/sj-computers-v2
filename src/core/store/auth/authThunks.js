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
    ALREADY_LOGGED_IN,
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
    saveTempToken,
    getTempToken,
    getUserName,
    getUserEmail,
} from "@services/jwtService";

import ApiService from "@services/apiService";

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await loginApi(credentials);
            let token = response.data.data.access_token;
            let name = response.data.data.user;
            saveToken("", name, credentials.email);
            saveTempToken(token);
            saveUserPassword(credentials.password);
            dispatch({
                type: LOGIN,
                payload: response.data.data,
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
            await verifyOtpApi(credentials);
            let temp_token = getTempToken();
            let name = getUserName();
            let email = getUserEmail();
            saveToken(temp_token, name, credentials.email);
            dispatch({ type: VERIFY_OTP, payload: { name, email } });
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

export const alreadyLoggedIn = (token) => {
    return async (dispatch) => {
        let user = {
            name: getUserName(),
            email: getUserEmail(),
        };
        ApiService.setHeader("Authorization", "Bearer " + token);
        dispatch(ALREADY_LOGGED_IN(user));
    };
};
