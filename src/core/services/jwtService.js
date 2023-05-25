import ApiService from "@services/apiService";

const TOKEN = "token";
// const USER_NAME = "user_name";
const USER = "user";
// const USER_EMAIL = "user_email";
// const USER_IMAGE = "user_image";
const PASSWORD = "user_password";
// const USER_STATE = "state";
const TEMP_TOKEN = "temp_token";

export const getToken = () => window.localStorage.getItem(TOKEN);
export const saveToken = (token) => {
    window.localStorage.setItem(TOKEN, token);
};

export const saveUser = (user) => {
    const userDetails = {
        userName: user.name,
        userEmail: user.email,
        userImage: user.profile_pic,
        userState: user.state,
    };
    return window.localStorage.setItem(USER, JSON.stringify(userDetails));
};
export const saveUserName = (userName) => {
    const user = getUser();
    user.userName = userName;
    saveUser(user);
};

export const saveUserImage = (userImage) => {
    const user = getUser();
    user.profile_pic = userImage;
    saveUser(user);
};

export const saveUserState = (userState) => {
    const user = getUser();
    user.state = userState;
    saveUser(user);
};
export const saveUserEmail = (email) => {
    const user = getUser();
    user.userEmail = email;
    saveUser(user);
};



export const saveTempToken = (token) => {
    ApiService.setHeader("Authorization", "Bearer " + token);
    window.localStorage.setItem(TEMP_TOKEN, token);
};
export const getTempToken = () => window.localStorage.getItem(TEMP_TOKEN);


export const saveUserPassword = (password) => {
    window.localStorage.setItem(PASSWORD, password);
};

export const getUserPassword = () => window.localStorage.getItem(PASSWORD);

export const destroyUserPassword = () =>
    window.localStorage.removeItem(PASSWORD);


export const getUser = () => JSON.parse(window.localStorage.getItem(USER));

export const getUserEmail = () => {
    const user = getUser();
    return user.email;
};
export const getUserName = () => {
    const user = getUser();
    return user.name;
};

export const getUserImage = () => {
    const user = getUser();
    return user.name;
};

export const getUserState = () => {
    const user = getUser();
    return user.state;
};

const deleteUser = () => window.localStorage.removeItem(USER);

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
    getUserName,
    getUserEmail,
    saveUserPassword,
    getUserPassword,
    destroyUserPassword,
    saveTempToken,
    getTempToken,
    destroyTempKeys,
};
