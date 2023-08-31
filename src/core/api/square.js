import ApiService from "@services/apiService";

export function sendTokenApi(data) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/square-charge`, data)
            .then((response) => {
                console.print(
                    "file: square.js | sendTokenApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error square", e);
                reject(e);
            });
    });
}
