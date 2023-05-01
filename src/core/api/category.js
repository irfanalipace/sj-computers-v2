import ApiService from "@services/apiService";

export function categoryApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/categories`)
            .then((response) => {
                console.log(
                    "file: category.js | categoryApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error category", e);
                reject(e);
            });
    });
}
