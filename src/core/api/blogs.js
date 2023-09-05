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
              console.log(response,'update blog slug')
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
              console.log(response,'update blog slug')
                resolve(response);
            })
            .catch((e) => {
                console.print("Console Log: : error blogsDetail", e);
                reject(e);
            });
    });
}





//getBlogs by category blogs api
export function getBlogsCategoryApi(per_page = 12, slug) {
    const params = { per_page, slug }; // Create an object with the parameters
    console.log(slug, 'slug dta')
    return new Promise((resolve, reject) => {
        ApiService.get("/category-blogs", { params }) // Pass the parameters as an object
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.error("API Error:", error);
                reject(error);
            });
    });
}
