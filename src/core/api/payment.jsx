import ApiService from '@services/apiService';

export function paymentApi(data) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/checkout-order`, data)
      .then(response => {
        console.print('file: square.js | paymentApi| response', response);
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error square', e);
        reject(e);
      });
  });
}
