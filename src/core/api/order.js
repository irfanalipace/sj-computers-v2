import ApiService from "@services/apiService";

export function getOrderDetailsApi() {
    return new Promise((resolve, reject) => {
        const myParams = {
            month: "1",
            per_page: "1",
            page: "1"
          };

        ApiService.get(`/order-list`, "", myParams)
            .then((response) => {
                console.log(
                    "file: order.js | getOrderDetailsApi| response",
                    response.data
                );
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error OrderDetail", e);
                reject(e);
            });
    });
}
export function OrderSearchApi(invoiceId) {

    return new Promise((resolve, reject) => {

        const myParams = {
           invoice_id : invoiceId
          };

        ApiService.get(`/search-order`, "", myParams)
            .then((response) => {
                console.log(
                    "file: order.js | OrderSearchApi| response",
                    response.data
                );
                resolve(response.data);
            })
            .catch((e) => {
                console.log("Console Log: : error order search", e);
                reject(e);
            });
    });
}
export function OrderListhApi() {

    return new Promise((resolve, reject) => {

        const myParams = {
            month: "0",
            per_page: "100",
            page: "1"
          };

        ApiService.get(`/order-list`, "", myParams)
            .then((response) => {
                console.log(
                    "file: order.js | order-list| response",
                    response.data
                );
                resolve(response.data);
            })
            .catch((e) => {
                console.log("Console Log: : error order list", e);
                reject(e);
            });
    });
}
