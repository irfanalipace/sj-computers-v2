import ApiService from "@services/apiService";

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
