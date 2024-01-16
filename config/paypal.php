<?php
/**
 * PayPal Setting & API Credentials
 * Created by Raza Mehdi <srmk@outlook.com>.
 */

return [
//    'mode'    => env('PAYPAL_MODE', 'sandbox'), // Can only be 'sandbox' Or 'live'. If empty or invalid, 'live' will be used.
//    'sandbox' => [
//        'username'    => env('PAYPAL_SANDBOX_API_USERNAME', ''),
//        'password'    => env('PAYPAL_SANDBOX_API_PASSWORD', ''),
//        'secret'      => env('PAYPAL_SANDBOX_CLIENT_SECRET', ''),
//        'certificate' => env('PAYPAL_SANDBOX_API_CERTIFICATE', ''),
//
//        'client_id' => env('PAYPAL_SANDBOX_CLIENT_ID', ''),
//        'client_secret' => env('PAYPAL_SANDBOX_CLIENT_SECRET', ''),
//
//        'app_id'      => 'APP-80W284485P519543T', // Used for testing Adaptive Payments API in sandbox mode
//    ],
//    'live' => [
//        'username'    => env('PAYPAL_SANDBOX_API_USERNAME', ''),
//
//        'password'    => env('PAYPAL_SANDBOX_API_PASSWORD', ''),
//
//        'secret'      => env('PAYPAL_SANDBOX_API_SECRET', ''),
//
//        'certificate' => env('PAYPAL_SANDBOX_API_CERTIFICATE', ''),
//
//        'client_id' => env('PAYPAL_SANDBOX_CLIENT_ID', ''),
//        'client_secret' => env('PAYPAL_SANDBOX_CLIENT_SECRET', ''),
//
//        'app_id'      => '', // Used for Adaptive Payments API
//    ],
//
//    'payment_action' => 'Sale', // Can only be 'Sale', 'Authorization' or 'Order'
//    'currency'       => env('PAYPAL_CURRENCY', 'USD'),
//    'billing_type'   => 'MerchantInitiatedBilling',
//    'notify_url'     => '', // Change this accordingly for your application.
//    'locale'         => '', // force gateway language  i.e. it_IT, es_ES, en_US ... (for express checkout only)
//    'validate_ssl'   => true, // Validate SSL when creating api client.

    'client_id' => 'ATyvvLVkkD0XtfZHN7zoSEwOI7nZfocyFlspavQEMrg4A8ycbwjrq2i8vcet2MUtlK5Y6U5AYAZWHaJ0',
    'secret' => 'ENAqQGI3ommJAytHc2w1Cra8tB3D8Rom0OZJoKzrXBVc0jb5bRNrltS0KE7JJ1rZQdqwdbYBQ72Eip3o',
    'settings' => array(
        'mode' => 'sandbox',
        'http.ConnectionTimeOut' => 1000,
        'log.LogEnabled' => true,
        'log.FileName' => storage_path() . '/logs/paypal.log',
        'log.LogLevel' => 'FINE'
    ),
];
