import ApiService from "@services/apiService";

export function getBlogsPagesApi(page = 1, per_page = 12) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/blogs?page=${page}&per_page=${per_page}`)
            .then((response) => {
                console.log("blogs.data", response.data);
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
        ApiService.get(`/get-blogs-slug?slug=${slug}`)
            .then((response) => {
              console.log(response,'update blog slug')
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error blogsDetail", e);
                reject(e);
            });
    });
}
