import ApiService from "@services/apiService";

export function getTokenApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/states`)
            .then((response) => {
                console.log(
                    "file: square.js | getTokenApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error square", e);
                reject(e);
            });
    });
}

export function sendTokenApi({ source_id }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/square-charge`, {
            source_id,
        })
            .then((response) => {
                console.log(
                    "file: square.js | sendTokenApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error square", e);
                reject(e);
            });
    });
}
