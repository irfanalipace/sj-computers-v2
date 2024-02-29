import ApiService from '@services/apiService';

export function getOrderDetailsApi(page) {
  return new Promise((resolve, reject) => {
    const myParams = {
      month: '0',
      per_page: '12',
      page: page,
    };

    ApiService.get(`/order-list`, '', myParams)
      .then(response => {
        console.print(
          'file: order.js | getOrderDetailsApi| response',
          response.data,
        );
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error OrderDetail', e);
        reject(e);
      });
  });
}
export function OrderSearchApi(orderId) {
  return new Promise((resolve, reject) => {
    const myParams = {
      order_id: orderId,
    };

    ApiService.get(`/search-order`, '', myParams)
      .then(response => {
        console.print(
          'file: order.js | OrderSearchApi| response',
          response.data,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error order search', e);
        reject(e);
      });
  });
}

export function OrderListhApi() {
  return new Promise((resolve, reject) => {
    const myParams = {
      month: '0',
      per_page: '100',
      page: '1',
    };

    ApiService.get(`/order-list`, '', myParams)
      .then(response => {
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error order list', e);
        reject(e);
      });
  });
}

export function getEstimatedDaysApi(data) {
  return new Promise((resolve, reject) => {
    ApiService.get('/estimated-days', null, data)
      .then(response => {
        console.print(
          'file: order.js | getEstimatedDays| response',
          response.data,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error order list', e);
        reject(e);
      });
  });
}

export function validateCartItemsApi(data) {
  return new Promise((resolve, reject) => {
    // const errors = [
    //     {
    //         status: false,
    //         message: "Quantity out of range",
    //         product_id: 15,
    //         quantity: "",
    //         available_quantity: 0,
    //     },
    // ];
    ApiService.post('check-product-qty', data)
      .then(response => {
        console.print(
          'file: order.js | validateCartItems| response',
          response.data,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error order list', e);
        reject(e);
      });
  });
}
