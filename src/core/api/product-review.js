import ApiService from "@services/apiService";

export function productReviewsApi(id, page = 1, per_page = 10) {
    return new Promise((resolve, reject) => {
        ApiService.get(`get-product-reviews`, id, { per_page, page })
            .then(async (response) => {
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

export function productRatingApi(id) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-product-rating`, id)
            .then(async (response) => {
                resolve(response);
            })
            .catch((e) => {
                console.print(
                    "Console Log: : error in proudct rating api products",
                    e
                );
                reject(e);
            });
    });
}

export function allReviewImagesApi(id) {
    return new Promise((resolve, reject) => {
        ApiService.get(`get-review-media/${id}`)
            .then((response) => {
                console.print(
                    "file: products.js | allReviewImagesApi| response",
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

export function productSpecificDetailsReview(id) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-specific-review`, id)
            .then((response) => {
                console.print(
                    "file: products.js | productSpecificDetailsReview| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error productSpecificDetail", e);
                reject(e);
            });
    });
}

export function reviewReportHelpfullApi(data) {
    return new Promise((resolve, reject) => {
        ApiService.post("store-review-report", data)
            .then((response) => {
                console.print(
                    "file: order.js | validateCartItems| response",
                    response.data
                );
                resolve(response.data);
            })
            .catch((e) => {
                console.print("Console Log: : error order list", e);
                reject(e);
            });
    });
}
