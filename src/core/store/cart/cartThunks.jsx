import {
  LOADING,
  ADD_TO_CART,
  ADD_LIST_TO_CART,
  SET_CART_DETAILS,
  DELETE_ITEM,
  CLEAR_CART,
  UPDATE_QUANTITY,
  UPDATING,
  API_ERROR,
  UPDATED_QUANTITY,
  SET_OUT_OF_STOCK,
  SET_CART_ERRORS,
} from '@store/cart/cartSlice';

import {
  SET_PRODUCT_LOADING,
  SET_PRODUCT_CLEAR_LOADING,
} from '@store/products/productsSlice';

import {
  addToCartApi,
  addListToCartApi,
  fetchCartApi,
  deleteItemApi,
  updateQuantityApi,
  getDetailsApi,
} from '@api/cart';
import {
  deleteCartItem,
  addItemToLocalCart,
  updateCartDetails,
  updateCartItem,
  getCartItems,
  updateItemLocalProperty,
  mapResponse,
} from '@utils/cartHelpers';

import { toast } from 'react-toastify';
import {
  calculateGuestCartPriceAfterError,
  clearCartLocally,
  setCartItemAfterError,
} from '../../utils/cartHelpers';
import { getGuestUserEmail } from '../../services/authService';
import { validateCartItemsApi } from '../../api/order';
import { makeDataLayerItemObject } from '../../utils/helpers';

export const addToCart = (data, cb) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_PRODUCT_LOADING,
        payload: { id: data?.cartItem?.id },
      });
      let param = {
        product_id: data?.cartItem?.id,
        qty: data.cartItem.quantity,
        protective_plan_id: data?.cartItem?.plan?.value,
      };
      let response = await addToCartApi(param);
      data.cartDetails = { ...response.details };
      data.cartItem.notLocal = true; //this property identifies that this cart item is also present in database so we know that which items in our local storage are also stored in database to manage deletion of cart items
      dispatch({
        type: ADD_TO_CART,
        payload: data,
      });
      toast.success('Item Added In Cart');
      console.log('add to cart login user');
      // adding add_to_cart evnet to datalayer when login user added item to cart and add to cart api is successful
      if (!window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
      }
      window.dataLayer.push({
        event: 'add_to_cart',
        currency: 'USD',
        value: data.cartItem.price,
        items: makeDataLayerItemObject([{ ...data }]),
      });
      if (typeof cb === 'function') cb();
      // addItemToLocalCart(data);
    } catch (error) {
      console.print('Something went wrong in carts', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }

    dispatch({
      type: SET_PRODUCT_CLEAR_LOADING,
      payload: { id: data?.cartItem?.id },
    });
  };
};

export const deleteItem = data => {
  return async dispatch => {
    try {
      dispatch({ type: UPDATING, payload: data });
      let response = await deleteItemApi(data.cartItem);
      data.cartDetails = { ...response.details };
      deleteCartItem(data);
      dispatch({
        type: DELETE_ITEM,
        payload: data,
      });
      if (!window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
      }

      console.log(
        'remove_from_cart',
        data,
        makeDataLayerItemObject([{ ...data }]),
      );
      window.dataLayer.push({
        event: 'remove_from_cart',
        currency: 'USD',
        value: data.cartItem.price,
        items: makeDataLayerItemObject([{ ...data }]),
      });
    } catch (error) {
      console.print('Something went wrong in carts', error);
      dispatch({
        type: UPDATED_QUANTITY,
        payload: data.cartItem,
      });
    }
  };
};

export const updateQuantity = data => {
  return async dispatch => {
    try {
      dispatch({ type: UPDATING, payload: data });
      let response = await updateQuantityApi(data.cartItem);
      data.cartDetails = { ...response.details };
      let in_stock = response.in_stock;
      updateCartItem(data);
      dispatch({
        type: UPDATE_QUANTITY,
        payload: {
          cartItem: { ...data.cartItem, in_stock, error: false },
          cartDetails: { ...data?.cartDetails },
        },
      });
    } catch (error) {
      if (error?.data?.in_stock === false) {
        dispatch({
          type: SET_OUT_OF_STOCK,
          payload: { ...data, in_stock: false },
        });
        toast.error(error?.data?.message);
      } else dispatch({ type: UPDATED_QUANTITY, payload: data.cartItem });
    }
  };
};

export const getCartDetails = data => {
  return async dispatch => {
    try {
      let response = await getDetailsApi();
      let data = { ...response.data };
      updateCartDetails(data);
      dispatch({
        type: SET_CART_DETAILS,
        payload: data,
      });
    } catch (error) {
      console.print('Something went wrong in carts', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const syncCartItems = () => {
  return async dispatch => {
    const fetchItems = async cartItems => {
      let response = await fetchCartApi();
      let items = response?.data;
      cartItems = mapResponse(items); // maps items according to redux format
      const cartDetails = { ...response?.details };
      dispatch({
        //adds existing cart items of local storage in the redux store
        type: ADD_LIST_TO_CART,
        payload: {
          cartItems,
          cartDetails,
        },
      });
    };
    try {
      dispatch({ type: LOADING, payload: {} });
      // let response = await fetchCartApi();
      // let items = { ...response.data };
      // delete items.details;
      // items = objectToArray(items);
      const localCartItems = getCartItems() || [];
      let cartItems = [];
      // const cartDetails = { ...response.data.details };
      // dispatch({
      //     //adds existing cart items of local storage in the redux store
      //     type: ADD_LIST_TO_CART,
      //     payload: { cartItems: localCartItems, cartDetails },
      // });
      // const [missingLocalItems, missingDBItems] =
      //     compareLocalCartWithDBCart(items, localCartItems); // compares items of local storage and DB
      // if (missingLocalItems?.length > 0) {
      //     cartItems = missingLocalItems?.map((item) => {
      //         let cartItem = {
      //             ...item,
      //             price: item?.price, // item total price which need to be paid in case of checkout
      //             notLocal: true, //this property identifies that this cart item is also present in database so we know that which items in our local storage are also stored in database to manage deletion of cart items
      //             product: {
      //                 ...item.associatedModel,
      //                 price: item.associatedModel.price, // cost of one unit of product
      //             },
      //         };

      //         delete cartItem.associatedModel;
      //         addItemToLocalCart({ cartItem }); // adding item in local storage that were not there before
      //         return cartItem;
      //     });
      // }
      // updateCartDetails(cartDetails);
      // dispatch({
      //     //adds fetched cart items from DB in the redux store
      //     type: ADD_LIST_TO_CART,
      //     payload: {
      //         cartItems,
      //         cartDetails,
      //     },
      // });
      if (localCartItems?.length > 0) {
        cartItems = localCartItems
          ?.filter(item => !item.notLocal)
          ?.map(item => {
            // converting cart items according to api payload
            let cartItem = {
              id: item.id,
              product_id: item.id,
              qty: item?.quantity,
            };

            updateItemLocalProperty(cartItem); //this function adds no local property on cart item in localStorage because now it is also added in database cart so we know that which items in our local storage are also stored in database to manage deletion of cart items
            return cartItem;
          });
      }
      if (cartItems.length > 0) {
        try {
          let response = await addListToCartApi({ cartItems }); // posting local storage cart items in database
          let items = response?.data;
          // items = objectToArray(items);
          const cartDetails = {
            ...response?.details,
          };
          cartItems = items?.map(item => {
            let cartItem = {
              ...item,
              price: item?.price, // item total price which need to be paid in case of checkout
              notLocal: true, //this property identifies that this cart item is also present in database so we know that which items in our local storage are also stored in database to manage deletion of cart items
              product: {
                ...item.associatedModel,
                price: item.associatedModel.price, // cost of one unit of product
              },
            };

            delete cartItem.associatedModel;
            return cartItem;
          });
          updateCartDetails(cartDetails);
          dispatch({
            //adds existing cart items of local storage in the redux store
            type: ADD_LIST_TO_CART,
            payload: {
              cartItems,
              cartDetails,
            },
          });
        } catch (error) {
          fetchItems(cartItems);
        }
      } else {
        fetchItems(cartItems);
      }
    } catch (error) {
      console.print('Something went wrong in carts', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const addToLocalCart = (data, cb, sync = false) => {
  return async dispatch => {
    addItemToLocalCart(data);
    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });
    if (!sync) {
      console.log('local add to cart', data);

      // adding add_to_cart evnet to datalayer when login user added item to cart and add to cart api is successful
      if (!window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
      }

      console.log('add_to_cart', data, makeDataLayerItemObject([{ ...data }]));
      window.dataLayer.push({
        event: 'add_to_cart',
        currency: 'USD',
        value: data.cartItem.price,
        items: makeDataLayerItemObject([{ ...data }]),
      });
    }

    if (typeof cb === 'function') cb();
    // toast.success("Item Added In Cart");
  };
};

export const syncGuestUserCart = cartDetails => {
  return async dispatch => {
    // const email = getGuestUserEmail();
    // if (email) {
    //     try {
    //         let response = await fetchCartApi(email);
    //         let items = { ...response.data };
    //         console.print("response: ", response.data);
    //         delete items.details;
    //         console.print("items: ", items);
    //         items = objectToArray(items);
    //         const cartDetails = {
    //             ...response.data.details,
    //         };
    //         cartItems = items?.map((item) => {
    //             let cartItem = {
    //                 ...item,
    //                 price: item?.price, // item total price which need to be paid in case of checkout
    //                 notLocal: true, //this property identifies that this cart item is also present in database so we know that which items in our local storage are also stored in database to manage deletion of cart items
    //                 product: {
    //                     ...item.associatedModel,
    //                     price: item.associatedModel.price, // cost of one unit of product
    //                 },
    //             };

    //             delete cartItem.associatedModel;
    //             return cartItem;
    //         });
    //         console.print("cartItems:", cartItems);
    //         setLocalCart(cartItems);
    //         updateCartDetails(cartDetails);
    //         dispatch({
    //             //adds existing cart items of local storage in the redux store
    //             type: ADD_LIST_TO_CART,
    //             payload: {
    //                 cartItems,
    //                 cartDetails,
    //             },
    //         });
    //     } catch (e) {}
    // }
    let cartItems = getCartItems() || [];
    if (cartItems?.length > 0 && cartDetails?.total_items > 0) {
      cartItems.forEach(cartItem => {
        dispatch(addToLocalCart({ cartItem }, '', true)); // adds local cart items to redux store
      });
      dispatch(setCartDetails(cartDetails)); // add local store details to redux store
    } else {
      clearCartLocally();
    }
  };
};

export const deleteLocalItem = data => {
  return async dispatch => {
    deleteCartItem(data);
    dispatch({
      type: DELETE_ITEM,
      payload: data,
    });
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
    }

    console.log(
      'remove_from_cart',
      data,
      makeDataLayerItemObject([{ ...data }]),
    );
    window.dataLayer.push({
      event: 'remove_from_cart',
      currency: 'USD',
      value: data.cartItem.price,
      items: makeDataLayerItemObject([{ ...data }]),
    });
  };
};

export const updateLocalQuantity = data => {
  return async dispatch => {
    updateCartItem(data);
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { ...data, cartItem: { ...data.cartItem, error: false } },
    });
  };
};

export const setCartDetails = data => {
  return async dispatch => {
    dispatch({
      type: SET_CART_DETAILS,
      payload: data,
    });
  };
};

export const clearCart = () => {
  return async dispatch => {
    // deleteNotLocalCartItem(); // remove db cart items from local storage so they are not compared again (in syncing process)
    dispatch({
      type: CLEAR_CART,
      payload: {},
    });
  };
};

export const validateCartItems = args => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      if (!state.auth.isAuthenticated)
        args.cart_items.email = state.orders.shippingDetails.email;
      let errors = await validateCartItemsApi({
        cart_items: args.cart_items,
      });
      const failedItems = errors.filter(err => !err.status);
      if (failedItems?.length > 0) {
        let response = await fetchCartApi();
        const cartDetails = { ...response?.details };
        let cartItems = [...response?.data];
        cartItems = mapResponse(cartItems);
        cartItems = setCartItemAfterError(cartItems, errors, true);

        if (state.auth.isAuthenticated)
          dispatch({
            type: SET_CART_ERRORS,
            payload: {
              cartItems,
              cartDetails,
            },
          });
        else {
          const cart = calculateGuestCartPriceAfterError(
            state.cart.cart,
            errors,
          );

          dispatch({
            type: SET_CART_ERRORS,
            payload: cart,
          });
        }
        if (args.onFailure) args.onFailure();
      } else if (args.onSuccess) args.onSuccess();
    } catch (error) {
      console.print('Something went wrong in orders', error);
    }
    if (typeof cb === 'function') cb();
  };
};
