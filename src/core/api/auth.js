import ApiService from "@services/apiService";

export function loginApi({ email, password }) {
    return new Promise((resolve, reject) => {
        ApiService.post("/login", {
            email,
            password,
        })
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

export function registerApi({ name, email, password, confirmPassword }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/register`, {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
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

export function verifyEmailApi(email) {
    return new Promise((resolve, reject) => {
        ApiService.post("verify-email", {
            email,
            // formData,
        })
            .then((response) => {
                console.log(
                    "file: auth.module.js | verifyEmailApi| response",
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

export function verifyOtpApi({ otp }) {
    return new Promise((resolve, reject) => {
        ApiService.post("verify-otp", {
            otp_code: otp,
        })
            .then((response) => {
                console.log(
                    "file: auth.module.js | verifyOtpApi| response",
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

export function forgetPasswordApi({ email }) {
    return new Promise((resolve, reject) => {
        ApiService.post("forgot-password", {
            email,
        })
            .then((response) => {
                console.log(
                    "file: auth.module.js | forgetPasswordApi| response",
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

export function resetPasswordApi({
    access_token,
    email,
    password,
    confirm_password,
}) {
    ApiService.setHeader("Authorization", "Bearer " + access_token);
    return new Promise((resolve, reject) => {
        ApiService.post("reset-password", {
            email,
            password,
            confirm_password,
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

export function updateProfileApi({ name, profile_pic }) {
    console.log("profile_pic:", profile_pic);
    return new Promise((resolve, reject) => {
        ApiService.post("update-profile", {
            name,
            profile_pic,
        })
            .then((response) => {
                console.log(
                    "file: auth.module.js | updateProfileApi| response",
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
