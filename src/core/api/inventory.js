import ApiService from "@services/apiService";

export function getInventory(SKU) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/get-inventory`, {
            SKU,
        })
            .then((response) => {
                console.log("resp", response);
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error products", e);
                reject(e);
            });
    });
}
export function inventoryAction({ action, quantity, sku }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/action-perfom`, {
            action,
            quantity,
            sku,
        })
            .then((response) => {
                console.log("resp", response);
                resolve(response);
            })
            .catch((e) => {
                console.log("Console Log: : error products", e);
                reject(e);
            });
    });
}
