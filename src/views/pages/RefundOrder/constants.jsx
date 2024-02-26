export const USER_TYPE_ENUM = {
  CUSTOMER: 'customer',
  SALE_PERSON: 'sale_person',
};

export const REFUND_TYPES = [
  {
    label: 'Partial Refund',
    key: 'partial',
  },
  {
    label: 'Fully Refund',
    key: 'full',
  },
];

export const ORDER_DETAILS_KEYS_ENUMS = {
  WEBSITE: {
    items: 'order_item',
    singleItem: 'item',
  },
  SALE_PERSON: {
    items: 'invoice_items',
  },
};
