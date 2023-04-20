import ApiService from "@services/apiService";

export function addToCartApi({ name, quantity, price }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/add-to-cart`, {
            name,
            qty: quantity,
            price,
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
