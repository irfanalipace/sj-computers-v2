import ApiService from '@services/apiService';

export function paymentApi(data) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/checkout-order`, data)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error square', e);
        reject(e);
      });
  });
}
