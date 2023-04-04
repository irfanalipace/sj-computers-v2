import * as types from "@store/auth/authTypes";
import { loginApi, logoutApi } from "@api/auth";
import { saveToken } from "@services/jwtService";

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await loginApi(credentials);
            let token = response.data.token.token;
            // const response = {
            //     userName: "haroon",
            //     userEmail: "test@email.com",
            // };
            saveToken(token);
            dispatch({ type: types.LOGIN_SUCCESS, payload: credentials });
        } catch (error) {
            console.log("Something went wrong in login", error);
        }
    };
};

export const register = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await loginApi(credentials);
            let token = response.data.data.token;
            // const response = {
            //     userName: "haroon",
            //     userEmail: "test@email.com",
            // };
            saveToken(token);
            dispatch({ type: types.REGISTER_SUCCESS, payload: credentials });
        } catch (error) {
            console.log("Something went wrong in register", error);
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            await logoutApi();
            dispatch({ type: types.LOGOUT_SUCCESS });
        } catch (error) {
            console.log("Something went wrong in logout", error);
        }
    };
};
