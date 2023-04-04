import { LOGIN, LOGOUT, REGISTER } from "@store/auth/authSlice";
import { loginApi, logoutApi } from "@api/auth";
import { saveToken, destroyToken } from "@services/jwtService";

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
            // dispatch({ type: types.LOGIN, payload: credentials });
        } catch (error) {
            console.log("Something went wrong in login", error);
        }
        saveToken(
            "fdsfsafsafsaffsafsfsafashfjshfjksahfjk2374264g2jh4g2g42jh4gj2g"
        );
        dispatch({ type: LOGIN, payload: credentials });
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
            dispatch({ type: REGISTER, payload: credentials });
        } catch (error) {
            console.log("Something went wrong in register", error);
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
        }
    };
};
