import ApiService from "@services/apiService";

export function addToCartApi(data) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/add-to-cart`, data)
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

export function updateQuantityApi({ id, difference }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/add-quantity-cart`, {
            item_id: id,
            qty: difference,
        })
            .then((response) => {
                console.log(
                    "file: states.js | updateQuantityApi| response",
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
