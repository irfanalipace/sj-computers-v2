import ApiService from "@services/apiService";

export function statesApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/states`)
            .then((response) => {
                console.log("file: states.js | states| response", response);
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error states", e);
                reject(e);
            });
    });
}
