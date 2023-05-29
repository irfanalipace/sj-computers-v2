import ApiService from "@services/apiService";

export function getInventory(search) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/get-inventory`, {
            search,
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
export function inventoryAction({ action, quantity, search }) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/action-perform`, {
            action,
            quantity,
            search,
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
