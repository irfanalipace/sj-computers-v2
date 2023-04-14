import ApiService from "@services/apiService";

export function statesApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/states`)
            .then((response) => {
                console.log("file: states.js | statesApi| response", response);
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error states", e);
                reject(e);
            });
    });
}

export function updateStateApi() {
    return new Promise((resolve, reject) => {
        ApiService.post(`/update-state`)
            .then((response) => {
                console.log(
                    "file: states.js | updateStateApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error states", e);
                reject(e);
            });
    });
}
