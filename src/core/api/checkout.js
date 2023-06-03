import ApiService from "@services/apiService";

export function getShippingAddressApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-shipping-address`)
            .then((response) => {
                console.print(
                    "file: checkout.js | getShippingAddressApi| response",
                    response
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
            permanent_address,
        })
            .then((response) => {
                console.print(
                    "file: checkout.js | setShippingAddressApi| response",
                    response
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
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error checkout", e);
                reject(e);
            });
    });
}

export function applyShipment({ shipment_days }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/apply-shipment`, {
            shipment_days,
        })
            .then((response) => {
                console.print(
                    "file: checkout.js | applyShipment| response",
                    response
                );
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error checkout", e);
                reject(e);
            });
    });
}
