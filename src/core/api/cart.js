import ApiService from "@services/apiService";

export function addToCartApi(data) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/add-to-cart`, data)
            .then((response) => {
                console.print(
                    "file: cart.js | addToCartApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error cart", e);
                reject(e);
            });
    });
}

export function addListToCartApi(data) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/store-local-storage-items`, data)
            .then((response) => {
                console.print(
                    "file: cart.js | addListToCartApi| response",
                    response
                );
                console.print("response", response);
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error cart", e);
                reject(e);
            });
    });
}

export function fetchCartApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-items`)
            .then((response) => {
                console.print(
                    "file: cart.js | fetchCartApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error cart", e);
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
                console.print(
                    "file: cart.js | deleteItemApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error cart", e);
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
                console.print(
                    "file: cart.js | updateQuantityApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error cart", e);
                reject(e);
            });
    });
}

export function getDetailsApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-details`)
            .then((response) => {
                console.print(
                    "file: cart.js | getDetailsApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error cart", e);
                reject(e);
            });
    });
}
