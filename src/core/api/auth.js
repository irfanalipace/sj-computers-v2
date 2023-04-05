import ApiService from "@services/apiService";

export function loginApi({ email, password }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/login?email=${email}&password=${password}`)
            .then((response) => {
                console.log("file: auth.module.js | login| response", response);
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error Login", e);
                reject(e);
            });
    });
}

export function registerApi({ name, email, password }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/register`, {
            name,
            email,
            password,
        })
            .then((response) => {
                console.log(
                    "file: auth.module.js | register| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error", e);
                reject(e);
            });
    });
}

export function logoutApi() {
    return new Promise((resolve, reject) => {
        ApiService.post("/logout", {
            // userId: email,
            // password,
        })
            .then((response) => {
                console.log(
                    "file: auth.module.js | logout| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error", e);
                reject(e);
            });
    });
}

export function resetPasswordApi() {
    return new Promise((resolve, reject) => {
        ApiService.post("/password/email", {
            // userId: email,
            // password,
        })
            .then((response) => {
                console.log(
                    "file: auth.module.js | resetPasswordApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error", e);
                reject(e);
            });
    });
}

export function verifyEmailApi(email) {
    return new Promise((resolve, reject) => {
        ApiService.post(`email/verify?email=${email}`, {
            // userId: email,
            // password,
        })
            .then((response) => {
                console.log(
                    "file: auth.module.js | verifyEmailAddress| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error", e);
                reject(e);
            });
    });
}

export function verifyOtpApi({email, otp}) {
    return new Promise((resolve, reject) => {
        ApiService.post(`email/verify?otp${otp}`, {
            // userId: email,
            // password,
        })
            .then((response) => {
                console.log(
                    "file: auth.module.js | verifyEmailAddress| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error", e);
                reject(e);
            });
    });
}
