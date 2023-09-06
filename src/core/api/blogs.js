import ApiService from "@services/apiService";

export function getBlogsPagesApi(page = 1, per_page = 12) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/blogs?page=${page}&per_page=${per_page}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.error("API Error:", error);
                reject(error);
            });
    });
}

export function getBlogsHeaderPagesApi(page = 1, per_page = 3) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/blogs?page=${page}&per_page=${per_page}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.error("API Error:", error);
                reject(error);
            });
    });
}

export function blogSlugApiblogDetails(slug) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-blogs?slug=${slug}`)
            .then((response) => {
                console.log(response, "update blog slug");
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error blogsDetail", e);
                reject(e);
            });
    });
}

export function blogHeaderDetails(slug) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/get-blogs?slug=${slug}`)
            .then((response) => {
                console.log(response, "update blog slug");
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error blogsDetail", e);
                reject(e);
            });
    });
}

export function getBlogCategories(slug) {
    const dummyCategories = [
        {
            id: 1,
            name: "laptops",
            slug: "laptops",
        },
        {
            id: 23,
            name: "laptops",
            slug: "laptops",
        },
        {
            id: 3,
            name: "laptops",
            slug: "laptops",
        },
        {
            id: 4,
            name: "laptops",
            slug: "laptops",
        },
        {
            id: 5,
            name: "laptops",
            slug: "laptops",
        },
    ];
    return new Promise((resolve, reject) => {
        // ApiService.get(`/get-blogs?slug=${slug}`)
        //     .then((response) => {
        //       console.log(response,'update blog slug')
        //         resolve(response);
        //     })
        //     .catch((e) => {
        //         console.print("Console Log: : error blogsDetail", e);
        //         reject(e);
        //     });
        setTimeout(() => {
            resolve(dummyCategories);
        }, 2000);
    });
}
