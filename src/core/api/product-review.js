import ApiService from "@services/apiService";

export function productReviewsApi(page = 1, per_page = 10) {
    return new Promise((resolve, reject) => {
        ApiService.get(`get-product-reviews?page=${page}&per_page=${per_page}`)
            .then((response) => {
                console.print(
                    "file: products.js | products| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error products", e);
                reject(e);
            });
    });
}
