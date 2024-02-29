import ApiService from '@services/apiService';

export function brandsApi() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/brands`)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error brands', e);
        reject(e);
      });
  });
}
