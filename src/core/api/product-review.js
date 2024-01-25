import ApiService from "@services/apiService";

export function productReviewsApi(id, page = 1, per_page = 10) {
    return new Promise((resolve, reject) => {
        ApiService.get(`get-product-details`, id, { per_page, page })
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

export function allReviewImagesApi(id) {
    return new Promise((resolve, reject) => {
        ApiService.get(`get-product-details`, id, { per_page: 100, page: 1 })
            .then((response) => {
                console.print(
                    "file: products.js | allReviewImagesApi| response",
                    response
                );
                const images = response.data?.product_detail?.data.map(
                    (review) => {
                        return review.product_media.map((media) => {
                            const mediaObj = {
                                review_id: review.id,
                                ...media,
                            };
                            return mediaObj;
                        });
                    }
                );
                resolve({ data: images.flat() });
            })
            .catch((e) => {
                console.print("Console Log: : error products", e);
                reject(e);
            });
    });
}
