export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

const getCurrentTimestamp = () => new Date().getTime();

export const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageItem = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const getSignInTime = (userType) => {
    return getLocalStorageItem(`${userType}_signInTime`);
};

export const getIsVerified = (userType) => {
    return getLocalStorageItem(`${userType}_isVerified`);
};

export const getUserTypes = () => {
    return getLocalStorageItem("userTypes") || [];
};

export const setUserTypes = (userTypes) => {
    setLocalStorageItem("userTypes", userTypes);
};

export const setSignInTime = (userType) => {
    const userTypes = getUserTypes();
    if (!userTypes.includes(userType)) {
        setUserTypes([...userTypes, userType]);
    }
    setLocalStorageItem(`${userType}_signInTime`, getCurrentTimestamp());
};

export const setIsVerified = (userType, value) => {
    setLocalStorageItem(`${userType}_isVerified`, value);
};

export const getUserID = (userType) => {
    return getLocalStorageItem(`${userType}_id`);
};

export const setUserEmail = (userType, email) => {
    return setLocalStorageItem(`${userType}_email`, email);
};

export const getUserEmail = (userType) => {
    return getLocalStorageItem(`${userType}_email`);
};

export const setUserID = (userType, userID) => {
    setLocalStorageItem(`${userType}_id`, userID);
};

export const isSessionValid = (userType) => {
    const signInTime = getSignInTime(userType);
    if (!signInTime) return false;

    const currentTime = getCurrentTimestamp();
    return currentTime - signInTime < SESSION_TIMEOUT;
};

export const loginUser = (userType, userID, userEmail) => {
    setUserID(userType, userID);
    setIsVerified(userType, true);
    setSignInTime(userType);
    setUserEmail(userType, userEmail);
};

export const logoutUser = (userType) => {
    const userTypes = getUserTypes();
    const updatedUserTypes = userTypes.filter((type) => type !== userType);
    setUserTypes(updatedUserTypes);
    setLocalStorageItem(`${userType}_isVerified`, false);
    localStorage.removeItem(`${userType}_signInTime`);
    localStorage.removeItem(`${userType}_id`);
    localStorage.removeItem(`${userType}_email`);
    localStorage.removeItem("orderType");
};
