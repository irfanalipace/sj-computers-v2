<?php

namespace App\Http\Controllers\Api\Payment;

use App\Classes\StatusEnum;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Api\Payment\PaypalController;
use App\Http\Controllers\Api\Square\SquareController;
use App\Http\Controllers\Controller;
use App\Models\Guest;
use App\Repositories\Payment\OrderRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Cart;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use App\Http\Requests\Square\CardRequest;

class PaymentController extends BaseController
{
    private $userId, $user, $totalAmount, $subTotal, $totalQty, $userType, $estimate_days, $shipment_amount,$repository;
    public function __construct(Request $request,OrderRepository $repository)
    {
        $this->user = Auth::guard('api')->user();
        $this->repository = $repository;

        $guestUser = $this->guestUser($request->shipping_address);
        $this->user = ($this->user) ? $this->user : $guestUser;
        $this->userType = ($this->user) ? StatusEnum::USER : StatusEnum::GUEST;
        $this->userId = ($this->user) ? $this->user->id : $guestUser->email;
            
        $this->shipment_amount = isset($request->details['shipment_amount']) ? $request->details['shipment_amount'] : 0.00;
        $this->estimate_days = isset($request->details['estimate_days']) ? $request->details['estimate_days'] : null;
        
        dd($this->cartDetails($request));
    }
    // chechout
    public function checkout(CardRequest $request)
    {
        try { 
            DB::beginTransaction();
            switch ($request->payment_type) {
                case StatusEnum::PAYMENTTYPEPAYPAL:
                    # Paypal Route ...
                    $paypal = new PaypalController;
                    $response = $paypal->processPayment($request);
                    return $this->sendResponse($response,'Successfully generated url.');
                    break;
                case StatusEnum::PAYMENTTYPESQUARE:

                    $square = new SquareController;
                    $response = $square->processPayment($request);
                    break;
                default:
                    # code..                  
                    return $this->sendError('Please choose one option .',400);
                    break;
            }
            DB::commit();
            return $this->sendResponse($response,'Successfully created payment.');
        } catch (\Exception $e) {
          DB::rollBack();
            return $this->sendError('Something went wrong.'. $e,400);
        }
    }

    /* Cart details for user and guest */
    private function cartDetails($request)
    {        
        $this->totalAmount = ($this->user) ? Cart::session($this->userId)->getTotal() : $request->details['total'] ;
        $this->subTotal = ($this->user) ? Cart::session($this->userId)->getSubTotal() : $request->details['sub_total'];
        $this->totalQty = ($this->user) ? Cart::session($this->userId)->getTotalQuantity() : $request->details['total_quantity'] ;        
        
      
        return [
            'totalAmount' => $this->totalAmount ?? 0.00,
            'subTotal' =>  $this->subTotal ?? 0.00,
            'totalQty' => $this->totalQty ?? 0
        ];
    }

    /* Guest user get if exist otherwise create guest user */
    private function guestUser($detail)
    {
        if (isset($detail['email']) && !is_null($detail['email'])) {
            // Check if the email exists in the guest_users table
            $guestUser = $this->repository->getOrCreateGuestUser($detail);
          
        } else {

            throw new Exception('Guest User is not found.');
        }
        return $guestUser;
    }

    /* success method called after paypal payment successfull */
    public function paypalSuccess(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request->token);
        if(isset($response['status']) && $response['status'] == 'COMPLETED') {

            // Insert data into database
            // $payment = new Payment();
            // $payment->payment_id = $response['id'];
            // $payment->product_name = session()->get('product_name') ?? 'aaa';
            // $payment->quantity = session()->get('quantity') ?? 1;
            // $payment->amount = $response['purchase_units'][0]['payments']['captures'][0]['amount']['value'];
            // $payment->currency = $response['purchase_units'][0]['payments']['captures'][0]['amount']['currency_code'];
            // $payment->payer_name = $response['payer']['name']['given_name'];
            // $payment->payer_email = $response['payer']['email_address'];
            // $payment->status = $response['status'];
            // $payment->method = "PayPal";
            // $payment->save();

            return redirect()->to('thank-you');

            unset($_SESSION['product_name']);
            unset($_SESSION['quantity']);

        } else {
            return redirect()->route('cancel');
        }
    }

    /* cancel method called when user cancel payment */
    public function paypalCancel($error = 'Payment is cancelled.')
    {
        return redirect('checkout?error=' . $error);
    }
}
