export const toArray = (data) => {
    if (Array.isArray(data)) {
        return data;
    } else {
        return [data];
    }
};

export const addItemToLocalCart = ({ cartItem, cartDetails }) => {
    let cartItems = getCartItems();
    let itemExists = cartItems?.find((item) => item.id === cartItem.id);
    if (!itemExists) {
        cartItems
            ? (cartItems = JSON.stringify([...cartItems, cartItem]))
            : (cartItems = JSON.stringify([cartItem]));
        window.localStorage.setItem("cart", cartItems);
        window.localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
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
    else return { total_items: 0, total: 0 };
};

export const setCartDetails = (cartDetails) => {
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
    temp_cart_items?.forEach((item, index) => {
        if (item?.notLocal) {
            let cartTotalQuantity = cartDetails?.total_items - 1;

            let cartTotal =
                parseFloat(cartDetails?.total) -
                parseFloat(
                    cartItems[index]?.price * cartItems[index]?.quantity
                );

            cartDetails = {
                total_items: cartTotalQuantity > 0 ? cartTotalQuantity : 0,
                total: cartTotal > 0 ? cartTotal.toFixed(2) : 0,
            };
            if (index >= 0) {
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
    // missingObjects1 iexport const toArray = (data) => {
    if (Array.isArray(data)) {
        return data;
    } else {
        return [data];
    }
};

export const addItemToLocalCart = ({ cartItem, cartDetails }) => {
    let cartItems = getCartItems();
    let itemExists = cartItems?.find((item) => item.id === cartItem.id);
    if (!itemExists) {
        cartItems
            ? (cartItems = JSON.stringify([...cartItems, cartItem]))
            : (cartItems = JSON.stringify([cartItem]));
        window.localStorage.setItem("cart", cartItems);
        window.localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
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
    else return { total_items: 0, total: 0 };
};

export const setCartDetails = (cartDetails) => {
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
    temp_cart_items?.forEach((item, index) => {
        if (item?.notLocal) {
            let cartTotalQuantity = cartDetails?.total_items - 1;

            let cartTotal =
                parseFloat(cartDetails?.total) -
                parseFloat(
                    cartItems[index]?.price * cartItems[index]?.quantity
                );

            cartDetails = {
                total_items: cartTotalQuantity > 0 ? cartTotalQuantity : 0,
                total: cartTotal > 0 ? cartTotal.toFixed(2) : 0,
            };
            if (index >= 0) {
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

export const clearCartLocally = () => {
    window.localStorage.deleteItem("cart");
    window.localStorage.deleteItem("cartDetails");
};

export const objectToArray = (obj) => {
    let items = [];
    for (let key in obj) {
        items.push(obj[key]);
    }
    return items;
};
s an array of objects that are present in array_1 but not in array_2.

    const missingObjects2 = array_2?.filter(
        (obj2) =>
            !obj2.notLocal && !array_1?.some((obj1) => obj2.id === obj1.id)
    );
    // missingObjects2 is an array of objects that are present in array_2 but not in array_1 or local objects of array_2.

    return [missingObjects1, missingObjects2];
};

export const clearCartLocally = () => {
    window.localStorage.deleteItem("cart");
    window.localStorage.deleteItem("cartDetails");
};

export const objectToArray = (obj) => {
    let items = [];
    for (let key in obj) {
        items.push(obj[key]);
    }
    return items;
};
