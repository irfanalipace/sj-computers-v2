<?php
namespace App\Classes;

class StatusEnum{

    public const currency = "USD";
    public const PAYPALSUCCESS = "SUCCESS";
    public const PAYPALSUCCESSWITHWARNING = "SUCCESSWITHWARNING";
    public const SHIPPINGADDRESSCREATED = "Shipping address created successfully";
    public const SHIPPINGADDRESSUPDATED = "Shipping address updated successfully";
    
    public const PAYMENTTYPEPAYPAL = "PAYPAL";
    public const PAYMENTTYPESQUARE = "SQUARE";
    public const COMPLETE = "COMPLETE";
}
