import ApiService from "@services/apiService";

export function addToCartApi({ id, quantity }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/add-to-cart`, {
            product_id: id,
            qty: quantity,
        })
            .then((response) => {
                console.log(
                    "file: states.js | addToCartApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error cart", e);
                reject(e);
            });
    });
}

export function fetchCartApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-items`)
            .then((response) => {
                console.log(
                    "file: states.js | fetchCartApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error cart", e);
                reject(e);
            });
    });
}

export function deleteItemApi({ id }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/delete-item`, {
            id,
        })
            .then((response) => {
                console.log(
                    "file: states.js | deleteItemApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error cart", e);
                reject(e);
            });
    });
}
