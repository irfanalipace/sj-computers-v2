export const PAYMENT_METHODS = {
    PAYPAL: "PAYPAL",
    SQUARE: "SQUARE",
};

export const STATUS_COLOR_ENUM = {
    paid: "success",
    pending: "primary",
    cancelled: "danger",
};

export const shippingMethods = [
    {
        id: 0,
        label: "Free Shipping (3 - 5 days)",
        cost: 0,
    },
    {
        id: 2,
        label: "2 day shipping",
        cost: 15,
    },
    {
        id: 1,
        label: "Next day delivery",
        cost: 30,
    },
];

export const dummyCategories = [
    { name: "ALL", id: null, slug: "" },
    { name: "1", id: 1, slug: "1" },
    { name: "2", id: 2, slug: "2" },
    { name: "3", id: 3, slug: "3" },
    { name: "category 4", id: 4, slug: "category-4" },
    { name: "tablet", id: 5, slug: "tablet" },
    { name: "monitor", id: 5, slug: "monitor" },
    { name: "category 1", id: 6, slug: "category-1" },
    { name: "category 2", id: 7, slug: "category-2" },
];
