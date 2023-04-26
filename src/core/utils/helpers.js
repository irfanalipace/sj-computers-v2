export const toArray = (data) => {
    if (Array.isArray(data)) {
        return data;
    } else {
        return [data];
    }
};

export const addItemToLocalCart = (cartItem) => {
    let cartItems = getCartItems();
    let itemExists = cartItems?.find((item) => item.id === cartItem.id);
    if (!itemExists) {
        cartItems
            ? (cartItems = JSON.stringify([...cartItems, cartItem]))
            : (cartItems = JSON.stringify([cartItem]));
        window.localStorage.setItem("cart", cartItems);
    }
};

export const getCartItems = () => {
    return JSON.parse(window.localStorage.getItem("cart"));
};
