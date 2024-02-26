import ApiService from '@services/apiService';

export function statesApi() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/states`)
      .then(response => {
        console.print('file: states.js | statesApi| response', response);
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error states', e);
        reject(e);
      });
  });
}

export function getCurrentStateApi() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/user-state`)
      .then(response => {
        console.print(
          'file: states.js | getCurrentStateApi| response',
          response,
        );
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error states', e);
        reject(e);
      });
  });
}

export function updateStateApi({ id, zip_code_start }) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/update-state`, {
      state_id: id,
      zip_code: zip_code_start,
    })
      .then(response => {
        console.print('file: states.js | updateStateApi| response', response);
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error states', e);
        reject(e);
      });
  });
}
