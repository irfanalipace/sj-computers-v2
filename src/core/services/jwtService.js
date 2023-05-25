import ApiService from "@services/apiService";

const TOKEN = "token";
const USER = "user";
const PASSWORD = "user_password";
const USER_STATE = "state";
const TEMP_TOKEN = "temp_token";

export const getToken = () => window.localStorage.getItem(TOKEN);
export const saveToken = (token) => {
    window.localStorage.setItem(TOKEN, token);
};

export const saveUser = (user) => {
    const userDetails = {...user}

    window.localStorage.setItem(USER, JSON.stringify(userDetails));
};
export const saveUserName = (name) => {
    let  user = getUser();
    user = {...user , name}
    saveUser(user);
};

export const saveUserImage = (profile_pic) => {
    let  user = getUser();
    user = {...user , profile_pic}
    saveUser(user);
};

export const saveUserState = (userState) => {
    window.localStorage.setItem(USER_STATE, JSON.stringify(userState));
};
export const saveUserEmail = (email) => {
    let  user = getUser();
      user = {...user,email}
      console.log('user@' , user , email)
    saveUser(user)
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

export const getUser = () => JSON.parse(window.localStorage.getItem(USER)) || {};

export const getUserEmail = () => {
    const user = getUser();
    return user?.email;
};
export const getUserName = () => {
    const user = getUser();
    return user.name;
};

export const getUserImage = () => {
    const user = getUser();
    return user.profile_pic;
};

export const getUserState = () =>
    JSON.parse(window.localStorage.getItem(USER_STATE));

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
