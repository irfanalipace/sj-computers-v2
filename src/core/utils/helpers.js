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
    else return { total_quantity: 0, total: 0 };
};

export const updateCartItem = ({ cartItem, cartDetails }) => {
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    let index = cartItems?.findIndex((item) => item.id === cartItem.id);
    if (index !== -1) {
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
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
    window.localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
};

export const findMissingObjects = (array_1, array_2) => {
    const missingObjects1 = array_1?.filter(
        (obj1) => !array_2?.some((obj2) => obj1.id === obj2.id)
    );
    const missingObjects2 = array_2?.filter(
        (obj2) => !array_1?.some((obj1) => obj2.id === obj1.id)
    );
    return [missingObjects1, missingObjects2];
};
