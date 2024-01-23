import ApiService from "@services/apiService";

export function getProductReviewDetails(id) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/product-reviews/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error products", e);
                reject(e);
            });
    });
}
