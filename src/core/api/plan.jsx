import ApiService from '@services/apiService';

export function fetchProtectionPlan() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/get-protection-plans`)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error plan', e);
        reject(e);
      });
  });
}
