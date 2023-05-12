import ApiService from "@services/apiService";

export function getOrderDetailsApi() {
    return new Promise((resolve, reject) => {

        const myParams = {
            month: "1",
            per_page: "1",
            page: "2"
          };

        ApiService.get(`/order-list`, "", myParams)
            .then((response) => {
                console.log(
                    "file: order.js | getOrderDetailsApi| response",
                    response
                );
                resolve(response.data);
            })
            .catch((e) => {
                console.log("Console Log: : error checkout", e);
                reject(e);
            });
    });
}