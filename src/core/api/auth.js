import ApiService from "@services/apiService";

export function loginApi() {
    return new Promise((resolve, reject) => {
        ApiService.post("/login", {
            userId: email,
            password,
        })
            .then((response) => {
                console.log("file: auth.module.js | login| response", response);
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
            userId: email,
            password,
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
