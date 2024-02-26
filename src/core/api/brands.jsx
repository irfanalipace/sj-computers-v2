import ApiService from '@services/apiService';

export function brandsApi() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/brands`)
      .then(response => {
        console.print('file: brands.js | brands| response', response);
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error brands', e);
        reject(e);
      });
  });
}
