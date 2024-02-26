import ApiService from "@services/apiService";

export function getShippingAddressApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-shipping-address`)
            .then((response) => {
                console.print(
                    "file: checkout.js | getShippingAddressApi| response",
                    response,
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error checkout", e);
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
    permanent_address,
    apartment,
}) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/order-shipping-address`, {
            country,
            full_name,
            phone_number,
            address: address,
            city,
            state,
            zip_code,
            apartment,
            permanent_address,
        })
            .then((response) => {
                console.print(
                    "file: checkout.js | setShippingAddressApi| response",
                    response,
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error checkout", e);
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
                console.print(
                    "file: checkout.js | placeOrderApi| response",
                    response,
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error checkout", e);
                reject(e);
            });
    });
}

export function applyShipment(data) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/apply-shipment`, data)
            .then((response) => {
                console.print(
                    "file: checkout.js | applyShipment| response",
                    response,
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error checkout", e);
                reject(e);
            });
    });
}
export function applyShipmentForGuest(data) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/apply-shippment-guest`, data)
            .then((response) => {
                console.print(
                    "file: checkout.js | applyShipmentForGuest| response",
                    response,
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error checkout", e);
                reject(e);
            });
    });
}
