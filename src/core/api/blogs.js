
import ApiService from "@services/apiService";

// export function getBlogsPagesApi() {
   
//     return new Promise((resolve, reject) => {
      
//         ApiService.get(`http://127.0.0.1:8000/api/blogs`)
//             .then((response) => {
//                 console.print(
//                     "blogs-api-data-call",
//                     response.data
//                 );
//                 resolve(response);
//             })
//             .catch((e) => {
//                 console.print("Console Log: : error blogs-pages", e);
//                 reject(e);
//             });
//     });
// }

export function getBlogsPagesApi(page = 1, per_page = 12) {
  return new Promise((resolve, reject) => {
      ApiService.get(`/blogs?page=${page}&per_page=${per_page}`)
          .then((response) => {
              console.print(
                  "blogs.data show he",
                  response
              );
              resolve(response);
          })
          .catch((e) => {
              console.print("Console Log: : error blogs", e);
              reject(e);
          });
  });
}







export function blogsDetails(blogslug) {
  return new Promise((resolve, reject) => {
    ApiService.post(`${blogslug}`, {
      // Additional parameters for the API request
    })
      .then((response) => {
        console.log("file: states.js | blogsPostApi | response", response);
        resolve(response);
      })
      .catch((error) => {
        console.log("Console Log: : error blogsApi", error);
        reject(error);
      });
  });
}

  