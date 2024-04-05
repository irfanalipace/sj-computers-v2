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
  const names = [
    'budget-friendly',
    'workstation',
    'professional-laptop',
    'touch-screen',
    'top-rated-product',
    'best-sellers',
    'new-arrival',
    'all',
  ];

  let url = '';

  if (names.includes(category)) {
    url = `/products-filter-list?category=${category}`;
  } else {
    url = `/products-filter-list?category_id=${category}`;
  }
  return new Promise((resolve, reject) => {
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
