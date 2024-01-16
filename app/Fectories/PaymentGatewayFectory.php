<?php

namespace App\Fectories;

use App\Classes\StatusEnum;
use Illuminate\Http\RedirectResponse;
use Exception;
use Illuminate\Http\Request;



class PaymentGatewayFectory
{
    public function placeOrder(Request $request)
    {
        try {
            switch ($request->payment_type) {
                case StatusEnum::PAYMENTTYPEPAYPAL:
                    # code...
                    $url = route('paypal');
                    $response = new RedirectResponse($url, 307);
                    return $response;
                    break;
                case StatusEnum::PAYMENTTYPESQUARE:
                    $url = route('squreCharge');
                    $response = new RedirectResponse($url, 307);
                    return $response;
                    break;
                default:
                    # code...
                    return response()->json(['code' => 400, 'msg' => "Please choose one option"]);
                    break;
            }
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'msg', 'Something went wrong.' . $e]);
        }
    }
}



