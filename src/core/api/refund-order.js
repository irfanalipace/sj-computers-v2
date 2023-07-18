import ApiService from "@services/apiService";

export function verifyEmail() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/verify-email`)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | verifyEmail| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}

export function verifyOTP() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/verify-otp`)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | verifyOTP| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}

export function verifyEmailOTO() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/verify-email`)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | verifyEmailOTO| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}

export function verifyOTPOTO() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/verify-otp`)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | verifyOTPOTO| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}

export function getOrdersList() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/orders-list`)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | getOrdersList| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}

export function getInvoicesList() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/invoices-list`)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | getInvoicesList| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}

export function getPreviousRefundsList() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/refunds-list`)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | getPreviousRefundsList| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}

export function getOrderDetailsSJ(orderDetails) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/order-detail`)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | getOrderDetailsSJ| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}

export function getOrderDetailsOTO(orderID) {
    return new Promise((resolve, reject) => {
        ApiService.get(
            `/order-detail`,
            null,
            { order_id: orderID },
            process.env.REACT_APP_OTO_BASE_URL
        )
            .then((response) => {
                console.print(
                    "file: refundOrder.js | getOrderDetailsOTO| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}

export function submitRefundRequestAPiSJ(params) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/order-detail`, params)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | submitRefundRequestAPiSJ| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}
export function submitRefundRequestAPiOTO(params) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/order-detail`, params)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | submitRefundRequestAPiOTO| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error refundOrder", e);
                reject(e);
            });
    });
}
