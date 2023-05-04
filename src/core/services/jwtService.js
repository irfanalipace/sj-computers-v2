import ApiService from "@services/apiService";

const TOKEN = "token";
const USER_NAME = "user_name";
const USER_EMAIL = "user_email";
const USER_IMAGE = "user_image";
const PASSWORD = "user_password";
const TEMP_TOKEN = "temp_token";

export const getToken = () => window.localStorage.getItem(TOKEN);

export const saveToken = (token) => {
    window.localStorage.setItem(TOKEN, token);
};

export const saveUserName = (userName) =>
    window.localStorage.setItem(USER_NAME, userName);

export const saveUserImage = (userImage) =>
    window.localStorage.setItem(USER_IMAGE, userImage);

export const getUserImage = (userImage) =>
    window.localStorage.getItem(USER_IMAGE, userImage);

export const deleteUserImage = () => window.localStorage.removeItem(USER_IMAGE);

export const saveTempToken = (token) => {
    ApiService.setHeader("Authorization", "Bearer " + token);
    window.localStorage.setItem(TEMP_TOKEN, token);
};
export const getTempToken = () => window.localStorage.getItem(TEMP_TOKEN);

export const saveUserEmail = (userEmail) =>
    window.localStorage.setItem(USER_EMAIL, userEmail);

export const saveUserPassword = (password) =>
    window.localStorage.setItem(PASSWORD, password);

export const getUserPassword = () => window.localStorage.getItem(PASSWORD);

export const destroyUserPassword = () =>
    window.localStorage.removeItem(PASSWORD);

export const getUserName = () => window.localStorage.getItem(USER_NAME);
export const getUserEmail = () => window.localStorage.getItem(USER_EMAIL);

export const saveUser = (user) => {
    window.localStorage.setItem(USER_EMAIL, user.userEmail);
    window.localStorage.setItem(USER_IMAGE, user.userImage);
    window.localStorage.setItem(USER_NAME, user.userName);
};

export const deleteUser = () => {
    window.localStorage.removeItem(USER_EMAIL);
    window.localStorage.removeItem(USER_IMAGE);
    window.localStorage.removeItem(USER_NAME);
};

export const getUser = () => {
    return {
        name: window.localStorage.getItem(USER_NAME),
        email: window.localStorage.getItem(USER_EMAIL),
        profile_pic: window.localStorage.getItem(USER_IMAGE),
    };
};

export const destroyTempKeys = () => {
    window.localStorage.removeItem(PASSWORD);
    window.localStorage.removeItem(TEMP_TOKEN);
};

export const destroyToken = () => {
    window.localStorage.removeItem(TOKEN);
    deleteUser();
    window.localStorage.removeItem(PASSWORD);
    window.localStorage.removeItem(TEMP_TOKEN);
};

export default {
    getToken,
    saveToken,
    saveUser,
    destroyToken,
    deleteUser,
    getUser,
    saveUserEmail,
    saveUserName,
    saveUserImage,
    getUserImage,
    deleteUserImage,
    getUserName,
    getUserEmail,
    saveUserPassword,
    getUserPassword,
    destroyUserPassword,
    saveTempToken,
    getTempToken,
    destroyTempKeys,
};
