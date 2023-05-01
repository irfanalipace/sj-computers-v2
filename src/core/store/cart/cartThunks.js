import {
    LOADING,
    ADD_TO_CART,
    ADD_LIST_TO_CART,
    SET_CART_DETAILS,
    DELETE_ITEM,
    UPDATE_QUANTITY,
    UPDATING,
    API_ERROR,
} from "@store/cart/cartSlice";
import {
    addToCartApi,
    addListToCartApi,
    fetchCartApi,
    deleteItemApi,
    updateQuantityApi,
} from "@api/cart";
import {
    deleteCartItem,
    addItemToLocalCart,
    updateCartItem,
    getCartItems,
    getCartDetails,
    compareLocalCartWithDBCart,
    objectToArray,
    updateItemLocalProperty,
} from "@utils/helpers";

export const addToCart = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            let param = {
                product_id: data.cartItem.id,
                qty: data.cartItem.quantity,
            };
            await addToCartApi(param);
            data.cartItem.notLocal = true; //this property identifies that this cart item is also present in database so we know that which items in our local storage are also stored in database to manage deletion of cart items
            dispatch({
                type: ADD_TO_CART,
                payload: data,
            });
            addItemToLocalCart(data);
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const deleteItem = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATING, payload: data });
            await deleteItemApi(data.cartItem);
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
            await updateQuantityApi(data.cartItem);
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

export const syncCartItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            let response = await fetchCartApi();
            let items = { ...response.data.data };
            delete items.details;
            items = objectToArray(items);
            const localCartItems = getCartItems() || [];
            let cartItems = [];
            const localCartDetails = getCartDetails();
            const cartDetails = localCartDetails;

            dispatch({
                //adds existing cart items in local storage in the redux store
                type: ADD_LIST_TO_CART,
                payload: { cartItems: localCartItems, cartDetails },
            });

            const [missingLocalItems, missingDBItems] =
                compareLocalCartWithDBCart(items, localCartItems); // compares items in local storage and DB
            if (missingLocalItems?.length > 0) {
                cartItems = missingLocalItems?.map((item) => {
                    let cartItem = {
                        ...item,
                        price: item?.price * item.quantity,
                        notLocal: true, //this property identifies that this cart item is also present in database so we know that which items in our local storage are also stored in database to manage deletion of cart items
                        product: {
                            ...item.associatedModel,
                        },
                    };

                    delete cartItem.associatedModel;

                    let cartTotalQuantity = cartDetails?.total_quantity + 1;
                    let cartTotal =
                        cartDetails?.total + item?.price * item.quantity;
                    cartDetails.total_quantity = cartTotalQuantity;
                    cartDetails.total = cartTotal;
                    addItemToLocalCart({ cartItem, cartDetails });
                    return cartItem;
                });
            }
            dispatch({
                //adds fetched cart items from DB in the redux store
                type: ADD_LIST_TO_CART,
                payload: { cartItems, cartDetails },
            });
            if (missingDBItems?.length > 0) {
                cartItems = missingDBItems?.map((item) => {
                    let cartItem = {
                        id: cartItems.id,
                        product_id: item.id,
                        qty: item?.quantity,
                    };

                    updateItemLocalProperty(cartItem); //this function adds no local property on cart item is also present in database so we know that which items in our local storage are also stored in database to manage deletion of cart items
                    return cartItem;
                });
            }

            await addListToCartApi({ cartItems });
        } catch (error) {
            console.log("Something went wrong in carts", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const addToLocalCart = (data) => {
    return async (dispatch) => {
        addItemToLocalCart(data);
        dispatch({
            type: ADD_TO_CART,
            payload: data,
        });
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
