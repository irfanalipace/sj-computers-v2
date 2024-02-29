import ApiService from '@services/apiService';

export function categoryApi() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/categories`)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error category', e);
        reject(e);
      });
  });
}
