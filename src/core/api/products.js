import ApiService from "@services/apiService";

export function productsApi(page = 1) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/products?page=${page}`)
            .then((response) => {
                console.log("file: products.js | products| response", response);
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error products", e);
                reject(e);
            });
    });
}
