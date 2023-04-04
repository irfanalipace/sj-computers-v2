import ApiService from "@services/apiService";

export function loginApi({ email, password }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/login?email=${email}&password=${password}`)
            .then((response) => {
                console.log("file: auth.module.js | login| response", response);
                const { data } = response;
                resolve(data);
            })
            .catch(({ message }) => {
                console.log("Console Log: : error Login", message);
                reject(message);
            });
    });
}

export function registerApi(name, email, password) {
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
                const { data } = response;
                resolve(data);
            })
            .catch(({ message }) => {
                console.log("Console Log: : error", message);
                reject(message);
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
                const { data } = response;
                resolve(data);
            })
            .catch(({ message }) => {
                console.log("Console Log: : error", message);
                reject(message);
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
                const { data } = response;
                resolve(data);
            })
            .catch(({ message }) => {
                console.log("Console Log: : error", message);
                reject(message);
            });
    });
}

export function verifyEmailAddress(email) {
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
                const { data } = response;
                resolve(data);
            })
            .catch(({ message }) => {
                console.log("Console Log: : error", message);
                reject(message);
            });
    });
}
