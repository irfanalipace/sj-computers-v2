import ApiService from "@services/apiService";

export function getShippingAddressApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-shipping-address`)
            .then((response) => {
                console.log(
                    "file: checkout.js | getShippingAddressApi| response",
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

export function setShippingAddressApi({
    country,
    full_name,
    phone_number,
    address,
    floorAddress,
    city,
    state,
    zip_code,
}) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/order-shipping-address`, {
            country,
            full_name,
            phone_number,
            address: address + floorAddress,
            city,
            state,
            zip_code,
        })
            .then((response) => {
                console.log(
                    "file: checkout.js | setShippingAddressApi| response",
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

export function placeOrderApi({ paymentMethod }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/place-order`, {
            payment_type: paymentMethod,
        })
            .then((response) => {
                console.log(
                    "file: checkout.js | placeOrderApi| response",
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
