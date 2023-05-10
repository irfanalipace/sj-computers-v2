<?php
namespace App\Classes;

class StatusEnum{

    public const currency = "USD";
    public const SUCCESS = "SUCCESS";
    public const PAYPALSUCCESSWITHWARNING = "SUCCESSWITHWARNING";
    public const SHIPPINGADDRESSCREATED = "Shipping address created successfully";
    public const SHIPPINGADDRESSUPDATED = "Shipping address updated successfully";

    public const PAYMENTTYPEPAYPAL = "PAYPAL";
    public const PAYMENTTYPESQUARE = "SQUARE";
    public const COMPLETE = "COMPLETE";

    public const PAYMENTMESSAGE = "Payment Successfully completed";

    public const DUMMY = "dummy";

    public const FREE_DELIVERY_DAY = 5;
    public const TWO_DELIVERY_DAY = 2;
    public const ONE_DELIVERY_DAY = 1;

}
