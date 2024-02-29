import ApiService from '@services/apiService';

export function addToCartApi(data) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/add-to-cart`, data)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error cart', e);
        reject(e);
      });
  });
}

export function addListToCartApi(data) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/store-local-storage-items`, data)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error cart', e);
        reject(e);
      });
  });
}

export function fetchCartApi(email) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/get-items`, null, {
      email,
    })
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error cart', e);
        reject(e);
      });
  });
}

export function deleteItemApi({ id }) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/delete-item`, {
      id,
    })
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error cart', e);
        reject(e);
      });
  });
}

export function updateQuantityApi({ id, difference }) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/add-quantity-cart`, {
      item_id: id,
      qty: difference,
    })
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error cart', e);
        reject(e);
      });
  });
}

export function getDetailsApi() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/get-details`)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error cart', e);
        reject(e);
      });
  });
}

export function clearCartApi() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/clear-cart`)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error cart', e);
        reject(e);
      });
  });
}
