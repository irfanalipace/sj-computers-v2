import ApiService from '@services/apiService';

// export function getFilterListApi(category) {
//   return new Promise((resolve, reject) => {
//     ApiService.get(`/products-filter-list`)
//       .then(response => {
//         console.print(
//           'file: category.js | getFilterListApi| response',
//           response,
//         );
//         resolve(response);
//       })
//       .catch(e => {
//         console.print('Console Log: : error filters', e);
//         reject(e);
//       });
//   });
// }

export function getFilterListApi(category) {
  return new Promise((resolve, reject) => {
    const url = `/products-filter-list?category=${category}`;

    ApiService.get(url)
      .then(response => {
        console.print(
          'file: category.js | getFilterListApi| response',
          response,
        );
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error filters', e);
        reject(e);
      });
  });
}
