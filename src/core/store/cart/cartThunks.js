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
} from "@store/cart/cartSlice";

import { SET_PRODUCT_LOADING,  SET_PRODUCT_CLEAR_LOADING } from "@store/products/productsSlice";

import {
    addToCartApi,
    addListToCartApi,
    fetchCartApi,
    deleteItemApi,
    updateQuantityApi,
    getDetailsApi,
} from "@api/cart";
import {
    deleteCartItem,
    addItemToLocalCart,
    updateCartDetails,
    updateCartItem,
    getCartItems,
    compareLocalCartWithDBCart,
    deleteNotLocalCartItem,
    objectToArray,
    updateItemLocalProperty,
} from "@utils/cartHelpers";

import { toast } from "react-toastify";

export const addToCart = (data, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SET_PRODUCT_LOADING, payload: {id: data?.cartItem?.id} });
            let param = {
                product_id: data?.cartItem?.id,
                qty: data.cartItem.quantity,
            };
            let response = await addToCartApi(param);
            data.cartDetails = { ...response.data.details };
            data.cartItem.notLocal = true; //this property identifies that this cart item is also present in database so we know that which items in our local storage are also stored in database to manage deletion of cart items
            dispatch({
                type: ADD_TO_CART,
                payload: data,
            });
            toast.success("Item Added In Cart");
            if (typeof cb === "function") cb();
            addItemToLocalCart(data);
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }

        dispatch({ type:  SET_PRODUCT_CLEAR_LOADING, payload: {id: data?.id} });
      
    };
};

export const deleteItem = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATING, payload: data });
            let response = await deleteItemApi(data.cartItem);
            data.cartDetails = { ...response.data.details };
            deleteCartItem(data);
            dispatch({
                type: DELETE_ITEM,
                payload: data,
            });
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const updateQuantity = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATING, payload: data });
            let response = await updateQuantityApi(data.cartItem);
            data.cartDetails = { ...response.data.details };
            updateCartItem(data);
            dispatch({
                type: UPDATE_QUANTITY,
                payload: data,
            });
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const getCartDetails = (data) => {
    return async (dispatch) => {
        try {
            let response = await getDetailsApi();
            console.log("response", response);
            let data = { ...response.data };
            updateCartDetails(data);
            dispatch({
                type: SET_CART_DETAILS,
                payload: data,
            });
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const syncCartItems = () => {
    return async (dispatch) => {
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
                cartItems = localCartItems?.map((item) => {
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
                let response = await addListToCartApi({ cartItems }); // posting local storage cart items in database
                let items = { ...response.data.original.data };
                delete items.details;
                items = objectToArray(items);
                const cartDetails = {
                    ...response.data.original.data.details,
                };
                cartItems = items?.map((item) => {
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
            } else {
                let response = await fetchCartApi();
                let items = { ...response.data };
                delete items.details;
                items = objectToArray(items);
                cartItems = items?.map((item) => {
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
                const cartDetails = { ...response.data.details };
                dispatch({
                    //adds existing cart items of local storage in the redux store
                    type: ADD_LIST_TO_CART,
                    payload: {
                        cartItems,
                        cartDetails,
                    },
                });
            }
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const addToLocalCart = (data, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            let param = {
                product_id: data.cartItem.id,
                qty: data.cartItem.quantity,
            };
            let response = await addToCartApi(param);
            data.cartDetails = { ...response.data.details };
            dispatch({
                type: ADD_TO_CART,
                payload: data,
            });
            // toast.success("Item Added In Cart");
            if (typeof cb === "function") cb();
            addItemToLocalCart(data);
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }

        // addItemToLocalCart(data);
        // dispatch({
        //     type: ADD_TO_CART,
        //     payload: data,
        // });
        if (typeof cb === "function") cb();
        // toast.success("Item Added In Cart");
    };
};

export const deleteLocalItem = (data) => {
    return async (dispatch) => {
        deleteCartItem(data);
        dispatch({
            type: DELETE_ITEM,
            payload: data,
        });
    };
};

export const updateLocalQuantity = (data) => {
    return async (dispatch) => {
        updateCartItem(data);
        dispatch({
            type: UPDATE_QUANTITY,
            payload: data,
        });
    };
};

export const setCartDetails = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_CART_DETAILS,
            payload: data,
        });
    };
};

export const clearCart = () => {
    return async (dispatch) => {
        deleteNotLocalCartItem(); // remove db cart items from local storage so they are not compared again (in syncing process)
        dispatch({
            type: CLEAR_CART,
            payload: {},
        });
    };
};
