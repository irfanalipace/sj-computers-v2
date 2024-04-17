import ApiService from '@services/apiService';

export function subscribeEmail(email) {
  return new Promise((resolve, reject) => {
    ApiService.post('/subscribe-newsletter', { email: email })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log('Error subscribing email:', error);
        reject(error);
      });
  });
}
