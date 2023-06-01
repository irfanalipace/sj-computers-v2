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
    DELETING_PROFILE_PIC,
    CLEAR_API_ERRORS,
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
    deleteProfilePicApi,
} from "@api/auth";
import {
    saveToken,
    destroyToken,
    saveUserEmail,
    saveUserName,
    saveUserImage,
    saveUserState,
    saveUserPassword,
    saveUser,
    saveTempToken,
    getTempToken,
    getUser,
    destroyTempKeys,
} from "@services/jwtService";

import { clearCartLocally } from "@utils/cartHelpers";
import { CLEAR_CART } from "@store/cart/cartSlice";

import ApiService from "@services/apiService";

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await loginApi(credentials);
            console.log("response: ", response);
            let token = response.access_token;
            let name = response.user;
            let profile_pic = response.profile_pic;
            let state = response?.state?.state;
            saveUserName(name);
            saveUserImage(profile_pic);
            saveUserState(state);
            saveTempToken(token); // saving token temporarily to only allow user to call the login api
            saveUserPassword(credentials.password); // saving password temporarily to only allow user to re login to resend the otp
            dispatch({
                type: LOGIN,
                payload: response,
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
            dispatch({ type: CLEAR_CART });
            clearCartLocally();
            toast.success("Logged out");
            ApiService.setHeader("Authorization", "");
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
            let user = getUser();
            dispatch({ type: VERIFY_OTP, payload: { ...user } });
            destroyTempKeys(); // destroy user password and temporary token after login success
            saveToken(temp_token); // stores temporary token in right key to be used later for calling protected apis
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
        let user = getUser();
        ApiService.setHeader("Authorization", "Bearer " + token);
        dispatch(ALREADY_LOGGED_IN(user));
    };
};

export const updateProfile = (formData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            let response = await updateProfileApi(formData);
            dispatch({ type: UPDATE_PROFILE, payload: response });
            saveUser(response);
            toast.success("Profile Updated Successfully");
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
            toast.success("Password Updated Successfully");

            dispatch({ type: CLEAR_LOADING, payload: {} });
            dispatch({ type: CLEAR_API_ERRORS, payload: {} });
        } catch (error) {
            console.log("Something went wrong in updatePassword", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const deleteProfilePic = (data, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: DELETING_PROFILE_PIC, payload: {} });
            let response = await deleteProfilePicApi(data);
            dispatch({ type: UPDATE_PROFILE, payload: response });
            saveUser(response);
            if (typeof cb === "function") cb();
            toast.success("Profile Picture removed");
        } catch (error) {
            console.log("Something went wrong in updateProfile", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
