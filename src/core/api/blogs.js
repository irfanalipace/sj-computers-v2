
import ApiService from "@services/apiService";


export function getBlogsPagesApi(page = 1, per_page = 12) {
  return new Promise((resolve, reject) => {
      ApiService.get(`/blogs?page=${page}&per_page=${per_page}`)
          .then((response) => {
              console.log(
                  "blogs.data show he ya nhi",
                  response
              );
              resolve(response);
          })
          .catch((e) => {
              console.log("Console Log: : error blogs", e);
              reject(e);
          });
  });
}








  