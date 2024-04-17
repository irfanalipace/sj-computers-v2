import ApiService from '@services/apiService';

export function productsApi(page = 1, per_page = 12) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/products?page=${page}&per_page=${per_page}`)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error products', e);
        reject(e);
      });
  });
}

export function similarProductsApi(product_id) {
  return new Promise((resolve, reject) => {
    ApiService.get('/similar-item', product_id)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error productsf', e);
        reject(e);
      });
  });
}

export function featureProductsApi(product_id) {
  return new Promise((resolve, reject) => {
    ApiService.get('/product-fast-delivery', product_id)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error productsf', e);
        reject(e);
      });
  });
}

export function productDetailsApi(id) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/product-detail?product_id=${id}`)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error productDetail', e);
        reject(e);
      });
  });
}

export function productDetailsbyAsinApi(asin) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/product-detail-asin?asin=${asin}`)
      .then(response => {
        console.print(
          'file: products.js | productDetailsbyAsinApi| response',
          response,
        );
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error productDetail', e);
        reject(e);
      });
  });
}

export function searchProductsApi(data) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/search-product`, '', data)
      .then(response => {
        console.print(
          'file: products.js | searchProductsApi| response',
          response,
        );
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error searchProductsApi', e);
        reject(e);
      });
  });
}

export function filterProductsApi(filter) {
  const newData = Object.keys(filter.filter).map(key => {
    const { key: objKey, value, unit } = filter.filter[key];
    return { key: objKey, value, unit };
  });

  filter.filter = newData?.map(fil => JSON.stringify(fil));
  return new Promise((resolve, reject) => {
    ApiService.get(`/filter-products`, '', filter)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error filterProductsApi', e);
        reject(e);
      });
  });
}

export function getProductsCategory(filter) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/get-products-category`, '', filter)
      .then(response => {
        console.print(
          'file: products.js | filterProductsApi| response',
          response,
        );

        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error filterProductsApi', e);
        reject(e);
      });
  });
}

export function getDiscountedProduct() {
  return new Promise((resolve, reject) => {
    ApiService.get(`/get-discount-product`)
      .then(response => {
        console.print(
          'file: products.js | filterProductsApi| response',
          response,
        );

        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error filterProductsApi', e);
        reject(e);
      });
  });
}

export function getPaypalOrderDetail(orderNo) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/get-order/${orderNo}`)
      .then(response => {
        console.print(
          'file: products.js | paypal order api | response',
          response,
        );

        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error filterProductsApi', e);
        reject(e);
      });
  });
}

// export function productPreviewApi(formData) {

//     return new Promise((resolve, reject) => {
//         ApiService.post(`/product-reviews`, formData)
//             .then((response) => {
//                 console.print(
//                     "file: products.js | productPreviewApi| response",
//                     response
//                 );
//                 resolve(response);
//             })
//             .catch((e) => {
//                 console.print("Console Log: : error productPreviewApi", e);
//                 reject(e);
//             });
//     });
// }

export function productPreviewApi(formData) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/product-reviews`, formData, null, null, true)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.log('Console Log: : error states', e);
        reject(e);
      });
  });
}

export function orderItemReview(formData) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/order-item-reviews`, formData, null, null, false)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.log('Console Log: : error states', e);
        reject(e);
      });
  });
}
