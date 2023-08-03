


import ApiService from "@services/apiService";

export function metaDetailsApi() {
    return new Promise((resolve, reject) => {
        ApiService.get(`/meta_detail`)
            .then((response) => {

                console.print("file: meta-details.js | meta-details| response", response);
                resolve(response);
            })
            .catch((e) => {

                console.print("Console Log: : error meta", e);
                reject(e);
            });
    });
}

