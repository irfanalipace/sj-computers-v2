<?php

namespace App\Http\Controllers\Api\PayPal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaypalwebhookController extends Controller
{
    //all events will received here
    public function webhooks(Request $request)
    {

    }
}
