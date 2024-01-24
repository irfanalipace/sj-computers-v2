<?php

namespace App\Http\Controllers\Api\Payment;

use App\Contracts\PaymentGateway;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
//use Srmklive\PayPal\Services\ExpressCheckout;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PayPalController  implements PaymentGateway
{
    private $provide;
    public function __construct()
    {
        $this->provide = new PayPalClient;
    }
    /**
     * Responds with a welcome message with instructions
     *
     * @return \Illuminate\Http\Response
     */

    public function processPayment($request)
    {
       
        $this->provide->setApiCredentials(config('paypal'));
        $paypalToken = $this->provide->getAccessToken();
        $response = $this->provide->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('success'),
                "cancel_url" => route('cancel')
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $request->price
                    ]
                ]
            ]
        ]);

        if(isset($response['id']) && $response['id']!=null) {
            foreach($response['links'] as $link) {
                if($link['rel'] === 'approve') {
                    return $link['href'];
                }
            }
        } else {
            return redirect()->route('cancel');
        }
    }

    // public function success(Request $request)
    // {
    //     $provider = new PayPalClient;
    //     $provider->setApiCredentials(config('paypal'));
    //     $paypalToken = $provider->getAccessToken();
    //     $response = $provider->capturePaymentOrder($request->token);
    //     if(isset($response['status']) && $response['status'] == 'COMPLETED') {

    //         // Insert data into database
    //         $payment = new Payment();
    //         $payment->payment_id = $response['id'];
    //         $payment->product_name = session()->get('product_name') ?? 'aaa';
    //         $payment->quantity = session()->get('quantity') ?? 1;
    //         $payment->amount = $response['purchase_units'][0]['payments']['captures'][0]['amount']['value'];
    //         $payment->currency = $response['purchase_units'][0]['payments']['captures'][0]['amount']['currency_code'];
    //         $payment->payer_name = $response['payer']['name']['given_name'];
    //         $payment->payer_email = $response['payer']['email_address'];
    //         $payment->status = $response['status'];
    //         $payment->method = "PayPal";
    //         $payment->save();

    //         return redirect()->to('thank-you');

    //         unset($_SESSION['product_name']);
    //         unset($_SESSION['quantity']);

    //     } else {
    //         return redirect()->route('cancel');
    //     }
    // }
    // public function cancel($error = 'Payment is cancelled.')
    // {
    //     return redirect('checkout?error=' . $error);
    // }
}
