export const toArray = (data) => {
    if (Array.isArray(data)) {
        return data;
    } else {
        return [data];
    }
};
const initCartDetails = { total_items: 0, sub_total: 0, total: 0 };

export const addItemToLocalCart = ({ cartItem, cartDetails }) => {
    let cartItems = getCartItems();
    let itemExists = cartItems?.find((item) => item.id === cartItem.id);
    if (!itemExists) {
        cartItems
            ? (cartItems = JSON.stringify([...cartItems, cartItem]))
            : (cartItems = JSON.stringify([cartItem]));
        window.localStorage.setItem("cart", cartItems);
        console.print("cartDetails: ", cartDetails);
        if (cartDetails?.total) {
            window.localStorage.setItem(
                "cartDetails",
                JSON.stringify(cartDetails)
            );
        }
    }
};

export const getCartItems = () => {
    let cartItems = window.localStorage.getItem("cart");
    if (cartItems) return JSON.parse(cartItems);
    return [];
};

export const getCartDetails = () => {
    let cartDetails = JSON.parse(window.localStorage.getItem("cartDetails"));
    if (cartDetails) return cartDetails;
    else return initCartDetails;
};

export const setCartItems = (cartItemsArray) => {
    window.localStorage.setItem("cart", JSON.stringify(cartItemsArray));
};

export const updateCartDetails = (cartDetails) => {
    window.localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
};

export const updateCartItem = ({ cartItem, cartDetails }) => {
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    let index = cartItems?.findIndex((item) => item.id === cartItem.id);
    if (index >= 0) {
        cartItems[index] = {
            ...cartItems[index],
            quantity: cartItem.quantity,
            price: cartItem.price,
            error: false,
        };
    }
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
    window.localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
};

export const deleteCartItem = ({ cartItem, cartDetails }) => {
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    let index = cartItems?.findIndex((item) => item.id === cartItem.id);
    if (index >= 0) {
        cartItems.splice(index, 1);
    }
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
    window.localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
};

export const deleteNotLocalCartItem = () => {
    let cartDetails = getCartDetails();
    let cartItems = getCartItems();
    let temp_cart_items = [...cartItems];
    let cartTotalQuantity = cartDetails?.total_items;
    temp_cart_items?.forEach((item, index) => {
        if (item?.notLocal) {
            cartTotalQuantity = cartDetails?.total_items - 1;

            let cartTotal =
                parseFloat(cartDetails?.total) - cartItems[index]?.price;

            let cartSubTotal =
                parseFloat(cartDetails?.sub_total) - cartItems[index]?.price;

            if (index >= 0) {
                cartDetails = {
                    total_items: cartTotalQuantity > 0 ? cartTotalQuantity : 0,
                    total: cartTotal > 0 ? cartTotal.toFixed(2) : 0,
                    sub_total: cartSubTotal > 0 ? cartSubTotal.toFixed(2) : 0,
                };
                cartItems.splice(index, 1);
            }
        }
    });

    window.localStorage.setItem("cart", JSON.stringify(cartItems));
    window.localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
};

export const updateItemLocalProperty = (cartItem) => {
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    let index = cartItems?.findIndex((item) => item.id === cartItem.id);
    if (index >= 0) {
        cartItems[index].notLocal = true;
    }
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const compareLocalCartWithDBCart = (array_1, array_2) => {
    const missingObjects1 = array_1?.filter(
        (obj1) => !array_2?.some((obj2) => obj1.id === obj2.id)
    );
    // missingObjects1 is an array of objects that are present in array_1 but not in array_2.

    const missingObjects2 = array_2?.filter(
        (obj2) =>
            !obj2.notLocal && !array_1?.some((obj1) => obj2.id === obj1.id)
    );
    // missingObjects2 is an array of objects that are present in array_2 but not in array_1 or local objects of array_2.

    return [missingObjects1, missingObjects2];
};

export const getTotalQuantity = () => {
    const cartItems = getCartItems();
    const total_quantity = cartItems.reduce((acc, item) => {
        if (acc.id) return acc.quantity + item.quantity;
        else return acc + item.quantity;
    });
    return total_quantity;
};

export const clearCartLocally = () => {
    window.localStorage.removeItem("cart");
    window.localStorage.removeItem("cartDetails");
};

export const objectToArray = (obj) => {
    let items = [];
    for (let key in obj) {
        items.push(obj[key]);
    }
    return items;
};

export const calculateGuestCartPriceAfterError = (cart, errors) => {
    const cartItems = setCartItemAfterError(cart, errors);
    const cartDetails = calculateGuestCartPrice(cartItems);
    return {
        cartItems,
        cartDetails,
    };
};

export const calculateGuestCartPrice = (cart) => {
    let tempArray = [...cart];
    let cartDetails = initCartDetails;
    tempArray?.forEach((item) => {
        const total = cartDetails.sub_total + item.price;
        cartDetails = {
            total_items: cartDetails.total_items + 1,
            sub_total: total,
            total,
        };
    });
    updateCartDetails(cartDetails);
    return cartDetails;
};

export const setCartItemAfterError = (
    cart,
    itemsWithErrors,
    isAuthenticated
) => {
    let tempArray = [];
    itemsWithErrors?.forEach((errorItem) => {
        let cartItem = cart?.find(
            (_item) => _item?.id === errorItem?.product_id
        );
        if (errorItem?.status) {
            tempArray.push(cartItem);
        } else {
            if (
                (isAuthenticated &&
                    cartItem?.quantity === errorItem?.available_quantity) ||
                (cartItem?.quantity > errorItem?.available_quantity &&
                    errorItem?.available_quantity > 0)
            ) {
                const itemPrice =
                    cartItem?.product.price * errorItem?.available_quantity;
                const planPrice =
                    cartItem?.plan?.price * errorItem?.available_quantity;
                cartItem = {
                    ...cartItem,
                    product: {
                        ...cartItem.product,
                        quantity: errorItem?.available_quantity,
                    },
                    error: "Selected Quantity is greater than available quantity",
                    quantity: errorItem?.available_quantity,
                    price: itemPrice,
                    plan_price: planPrice,
                };
                tempArray.push(cartItem);
            }
        }
    });
    setCartItems(tempArray);
    return tempArray;
};

export const mapResponse = (items) => {
    let cartItems = items?.map((item) => {
        let cartItem = {
            ...item,
            // price: item?.price, // item total price which need to be paid in case of checkout
            notLocal: true, //this property identifies that this cart item is also present in database so we know that which items in our local storage are also stored in database to manage deletion of cart items
            product: {
                ...item.associatedModel,
                // price: item.associatedModel.price, // cost of one unit of product
            },
        };

        delete cartItem.associatedModel;
        return cartItem;
    });

    if (cartItems?.length > 0) return cartItems;
    else return [];
};
