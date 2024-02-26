import {
  LOADING,
  SETTING_ADDRESS,
  SET_SHIPPING_DETAILS,
  SET_ORDER_ESTIMATE,
  SET_ORDER_DETAILS,
  PLACING_ORDER,
  ORDER_PLACED,
  API_ERROR,
} from '@store/orders/ordersSlice';
import {
  getShippingAddressApi,
  setShippingAddressApi,
  placeOrderApi,
} from '@api/checkout';

import { getOrderDetailsApi, getEstimatedDaysApi } from '@api/order';

import { clearCartLocally } from '@utils/cartHelpers';

export const getShippingDetails = () => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      let response = await getShippingAddressApi();

      dispatch({
        type: SET_SHIPPING_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.print('Something went wrong in orders', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};
export const getOrderDetails = (page = 1) => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      let response = await getOrderDetailsApi(page);
      const { success_orders, cancel_orders } = response.data;
      console.print(success_orders, 'so before dispatch ');
      console.print(cancel_orders, 'co before dispatch ');

      dispatch({
        type: SET_ORDER_DETAILS,
        payload: response.data,
      });
      // dispatch(setCancelOrders(cancelOrders.data));
    } catch (error) {
      console.print('Something went wrong in orders', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const setShippingDetails = (data, cb) => {
  return async dispatch => {
    try {
      dispatch({ type: SETTING_ADDRESS, payload: {} });
      await setShippingAddressApi(data);
      if (typeof cb === 'function') cb();
      dispatch({
        type: SET_SHIPPING_DETAILS,
        payload: data,
      });
    } catch (error) {
      console.print('Something went wrong in orders', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const placeOrder = (data, cb) => {
  return async dispatch => {
    try {
      dispatch({ type: PLACING_ORDER, payload: {} });
      let response = await placeOrderApi(data);
      clearCartLocally();

      if (typeof cb === 'function') cb(response.data);
      dispatch({ type: ORDER_PLACED, payload: {} });
    } catch (error) {
      console.print('Something went wrong in orders', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const getEstimatedDelivery = state_id => {
  return async dispatch => {
    try {
      let response = await getEstimatedDaysApi({ state_id });
      dispatch({ type: SET_ORDER_ESTIMATE, payload: response });
    } catch (error) {
      console.print('Something went wrong in orders', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};
