export const PAYMENT_METHODS = {
    PAYPAL: "PAYPAL",
    SQUARE: "SQUARE",
};

export const FILE_TYPES = {
    pdf: {
        label: "PDF",
        contentType: "application/pdf",
    },
    xls: { label: "XLS", contentType: "application/vnd.ms-excel" },
    xlsx: {
        label: "XLSX",
        contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    doc: { label: "DOC", contentType: "application/msword" },
    docx: {
        label: "DOCX",
        contentType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    csv: {
        label: "CSV",
        contentType: "text/csv",
    },
    png: {
        label: "PNG",
        contentType: "image/png",
    },
    jpeg: {
        label: "JPEG",
        contentType: "image/jpeg",
    },
    jpg: {
        label: "JPG",
        contentType: "image/jpeg",
    },
    gif: {
        label: "GIF",
        contentType: "image/gif",
    },
    svg: {
        label: "SVG",
        contentType: "image/svg+xml",
    },
    webp: {
        label: "WebP",
        contentType: "image/webp",
    },
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
    // {
    //     id: 2,
    //     label: "2 day shipping",
    //     cost: 15,
    // },
    // {
    //     id: 1,
    //     label: "Next day delivery",
    //     cost: 30,
    // },
];
export const PLAN_ENUM = {
    THREE_YEAR: {
        value: 1,
        label: "3-Year Warranty",
        price: 23.99,
        durationInYears: 3,
    },
    FOUR_YEAR: {
        value: 2,
        label: "4-Year Warranty",
        price: 32.99,
        durationInYears: 4,
    },
    // DEFAULT: {
    //     value: 3,
    //     label: "Tech Unlimited – Protect Eligible Past and Future Purchases with 1 Plan (Renews Monthly Until Cancelled)",
    //     price: 16.99,
    //     durationInYears: 0,
    // },
};
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

export const IS_CHRISTMAS_HOLIDAYS = false;
