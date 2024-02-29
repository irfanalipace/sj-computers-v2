import ApiService from '@services/apiService';

export function getInventory(search) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/get-inventory`, {
      search,
    })
      .then(response => {
        console.print('resp', response);
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error inventory', e);
        reject(e);
      });
  });
}

export function inventoryAction({ action, quantity, search }) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/action-perform`, {
      action,
      quantity,
      search,
    })
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error inventory', e);
        reject(e);
      });
  });
}

export function downloadProductsApi() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/download-inventory`)
      .then(response => {
        console.print('resp', response);
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error inventory', e);
        reject(e);
      });
  });
}
