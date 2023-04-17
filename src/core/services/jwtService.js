import ApiService from "@services/apiService";

const TOKEN = "token";
const USER_NAME = "user_name";
const USER_EMAIL = "user_email";
const PASSWORD = "user_password";
const TEMP_TOKEN = "temp_token";

export const getToken = () => window.localStorage.getItem(TOKEN);

export const saveToken = (token, name, email) => {
    window.localStorage.setItem(TOKEN, token);
    window.localStorage.setItem(USER_NAME, name);
    window.localStorage.setItem(USER_EMAIL, email);
    ApiService.setHeader("Authorization", "Bearer " + token);
};

export const updateToken = (token, id, email) => {
    window.localStorage.setItem(TOKEN, token);
};

export const saveUserID = (UserID) =>
    window.localStorage.setItem(USER_NAME, UserID);

export const saveTempToken = (token) =>
    window.localStorage.setItem(TEMP_TOKEN, token);

export const getTempToken = () => window.localStorage.getItem(TEMP_TOKEN);

export const saveUserEmail = (userEmail) =>
    window.localStorage.setItem(USER_EMAIL, userEmail);

export const saveUserPassword = (password) =>
    window.localStorage.setItem(PASSWORD, password);

export const getUserPassword = () => window.localStorage.getItem(PASSWORD);

export const destroyUserPassword = () =>
    window.localStorage.removeItem(PASSWORD);

export const getUserID = () => window.localStorage.getItem(USER_NAME);
export const getUserEmail = () => window.localStorage.getItem(USER_EMAIL);

export const destroyToken = () => {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER_NAME);
    window.localStorage.removeItem(USER_EMAIL);
    window.localStorage.removeItem(PASSWORD);
    window.localStorage.removeItem(TEMP_TOKEN);
};

export default {
    getToken,
    saveToken,
    updateToken,
    destroyToken,
    saveUserEmail,
    saveUserID,
    getUserID,
    getUserEmail,
    saveUserPassword,
    getUserPassword,
    destroyUserPassword,
    saveTempToken,
    getTempToken,
};
