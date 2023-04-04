import { LOGIN, LOGOUT, REGISTER, API_ERROR } from "@store/auth/authSlice";
import { loginApi, logoutApi } from "@api/auth";
import { saveToken, destroyToken } from "@services/jwtService";

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await loginApi(credentials);
            saveToken(token);
            dispatch({ type: LOGIN, payload: credentials });
        } catch (error) {
            console.log("Something went wrong in login", error);
            dispatch({ type: API_ERROR, payload: {} });
        }
    };
};

export const register = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await loginApi(credentials);
            let token = response.data.data.token;
            saveToken(token);
            dispatch({ type: REGISTER, payload: credentials });
        } catch (error) {
            console.log("Something went wrong in register", error);
            dispatch({ type: API_ERROR, payload: {} });
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            await logoutApi();
            destroyToken();
            dispatch({ type: LOGOUT });
        } catch (error) {
            console.log("Something went wrong in logout", error);
            dispatch({ type: API_ERROR, payload: {} });
        }
    };
};
