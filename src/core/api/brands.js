import ApiService from "@services/apiService";

export function brandsApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/brands`)
            .then((response) => {
                console.log("file: brands.js | brands| response", response);
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error brands", e);
                reject(e);
            });
    });
}
