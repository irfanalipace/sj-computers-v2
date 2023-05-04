import { toast } from "react-toastify";

import {
    LOGIN,
    LOGOUT,
    REGISTER,
    LOADING,
    CLEAR_LOADING,
    VERIFY_EMAIL,
    VERIFY_OTP,
    UPDATE_PROFILE,
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
    verifyEmailApi,
    updateProfileApi,
    updatePasswordApi,
} from "@api/auth";
import {
    saveToken,
    destroyToken,
    saveUserEmail,
    saveUserName,
    saveUserPassword,
    saveTempToken,
    getTempToken,
    getUserName,
    getUserEmail,
    destroyTempKeys,
} from "@services/jwtService";

import ApiService from "@services/apiService";

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await loginApi(credentials);
            let token = response.data.data.access_token;
            let name = response.data.data.user;
            saveUserName(name);
            saveTempToken(token); // saving token temporarily to only allow user to call the login api
            saveUserPassword(credentials.password); // saving password temporarily to only allow user to re login to resend the otp
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
            destroyTempKeys(); // destroy user password and temporary token after login success
            saveToken(temp_token); // stores temporary token in right key to be used later for calling protected apis
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
            toast.success("Password Changed Successfully");
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

export const updateProfile = (formData) => {
    const name = formData.get("name");
    const profile_pic = formData.get("profile_pic");
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await updateProfileApi(formData);
            dispatch({ type: UPDATE_PROFILE, payload: { name, profile_pic } });
        } catch (error) {
            console.log("Something went wrong in updateProfile", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const updatePassword = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await updatePasswordApi(data);
            toast.success("Password Changed Successfully");
            dispatch({ type: CLEAR_LOADING, payload: {} });
        } catch (error) {
            console.log("Something went wrong in updateProfile", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
