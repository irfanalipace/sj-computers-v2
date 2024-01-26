<?php

namespace App\Classes;

class StatusEnum
{

    public const USER = "user";
    public const GUEST = "guest";

    public const currency = "USD";
    public const SUCCESS = "SUCCESS";
    public const PAYPALSUCCESSWITHWARNING = "SUCCESSWITHWARNING";
    public const SHIPPINGADDRESSCREATED = "Shipping address created successfully";
    public const SHIPPINGADDRESSUPDATED = "Shipping address updated successfully";

    public const PAYMENTTYPEPAYPAL = "PAYPAL";
    public const PAYMENTTYPESQUARE = "SQUARE";
    public const COMPLETE = "COMPLETE";

    public const PAYMENTMESSAGE = "Payment Successfully completed";

    public const REFUND = "refund";
    public const LOGIN = "login";

    public const PENDING = "pending";
    public const CANCELED = "canceled";
    public const APPROVED = "approved";

    public const DUMMY = "dummy";

    public const FREE_DELIVERY_DAY = 5;
    public const TWO_DELIVERY_DAY = 2;
    public const ONE_DELIVERY_DAY = 1;

    public const PARTIAL = "partial";
    public const FULL = "full";

    //Amazon inventory
    public const HOLD = 'hold';
    public const RELEASE = 'release';

    //Inventory
    public const SKU = "sku";
    public const ASIN = "asin";

    //Environment
    public const ENV_PRODUCTION = 'production';

    public const INACTIVE = "inactive";
    public const ACTIVE = "active";
}
