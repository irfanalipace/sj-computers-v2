import ApiService from "@services/apiService";

const OTOBaseURL = process.env.REACT_APP_OTO_BASE_URL;

export function verifyEmailSjApi(param) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/customer-email-verify`, param)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | verifyEmailSjApi| response",
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

export function verifyOtpSjApi(param) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/customer-verify-otp`, param)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | verifyOtpSjApi| response",
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

export function verifyEmailOTOApi(param) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/verify-email`, param, OTOBaseURL)
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

export function verifyOTPOTOApi(param) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/verify-otp`, param, OTOBaseURL)
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

export function getOrdersList(param) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/customer-orders-list`, null, param)
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

export function getInvoicesList(param) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/invoices-list`, null, param, OTOBaseURL)
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

export function getPreviousRefundsListSj(params) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/refunds-list`, null, params)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | getPreviousRefundsListSj| response",
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

export function getPreviousRefundsListOto(params) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/refunds-list`, null, params, OTOBaseURL)
            .then((response) => {
                console.print(
                    "file: refundOrder.js | getPreviousRefundsListOto| response",
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

export function getOrderDetailsSJ(param) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/order-details`, null, param)
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

export function getOrderDetailsOTO(param) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/order-detail`, null, param, OTOBaseURL)
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
        ApiService.post(`/refund-submit`, params)
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
        ApiService.post(`/refund-submit`, params, OTOBaseURL)
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
