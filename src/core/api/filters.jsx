import ApiService from "@services/apiService";

export function getFilterListApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/products-filter-list`)
            .then((response) => {
                console.print(
                    "file: category.js | getFilterListApi| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error filters", e);
                reject(e);
            });
    });
}
