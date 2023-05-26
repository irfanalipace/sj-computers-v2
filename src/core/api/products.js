import ApiService from "@services/apiService";

export function productsApi(page = 1, per_page = 12) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/products?page=${page}&per_page=${per_page}`)
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

export function productDetailsApi(id) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/product-detail?product_id=${id}`)
            .then((response) => {
                console.log(
                    "file: products.js | productDetail| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error productDetail", e);
                reject(e);
            });
    });
}

export function productDetailsbyAsinApi(asin) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/product-detail-asin?asin=${asin}`)
            .then((response) => {
                console.log(
                    "file: products.js | productDetailsbyAsinApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error productDetail", e);
                reject(e);
            });
    });
}

export function searchProductsApi(name, page = 1, per_page = 12) {
    return new Promise((resolve, reject) => {
        ApiService.get(
            `/search-product?page=${page}&per_page=${per_page}`,
            "",
            { name }
        )
            .then((response) => {
                console.log(
                    "file: products.js | searchProductsApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error searchProductsApi", e);
                reject(e);
            });
    });
}

export function filterProductsApi(filter) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/filter-products`, "", filter)
            .then((response) => {
                console.log(
                    "file: products.js | filterProductsApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error filterProductsApi", e);
                reject(e);
            });
    });
}
