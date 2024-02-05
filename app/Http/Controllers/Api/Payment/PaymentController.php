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
use App\Models\Invoice;
use App\Models\Product;

class PaymentController extends BaseController
{
    private $userId, $user, $totalAmount, $subTotal, $totalQty, $userType, $estimate_days, $shipment_amount,$repository,$cartDetails;
    public function __construct(Request $request,OrderRepository $repository)
    {
        $this->user = Auth::guard('api')->user();
        $this->repository = $repository;
        if ($this->user) {
            $this->userId = $this->user->id;
            $this->userType = StatusEnum::USER;
            $this->totalAmount = \Cart::session($this->userId)->getTotal();
            $this->subTotal = \Cart::session($this->userId)->getSubTotal();
            $this->totalQty = \Cart::session($this->userId)->getTotalQuantity();
        } else {

            $guestUser = $this->guestUser($request->shipping_address);
            $this->user = $guestUser;
            $this->userId = $guestUser->email;
            $this->totalAmount = isset($request->details['total']) ? $request->details['total'] : 0.00;
            $this->subTotal = isset($request->details['sub_total']) ? $request->details['sub_total'] : 0.00;
            $this->totalQty = isset($request->details['total_quantity']) ? $request->details['total_quantity'] : 0.00;
            $this->userType = StatusEnum::GUEST;
            $this->shipment_amount = isset($request->details['shipment_amount']) ? $request->details['shipment_amount'] : 0.00;
            $this->estimate_days = isset($request->details['estimate_days']) ? $request->details['estimate_days'] : null;  
        }
        
        $this->cartDetails = $this->cartDetails($request);
       
        
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
                    $response = $paypal->processPayment($request,$this->user,$this->userType,$this->cartDetails);
                    return $this->sendResponse($response,'Successfully generated url.');
                    break;
                case StatusEnum::PAYMENTTYPESQUARE:
                    
                    $square = new SquareController(new OrderRepository);
                    $response = $square->processPayment($request,$this->user,$this->userType,$this->cartDetails);
                    break;
                default:
                    # code..                  
                    return $this->sendError('Please choose one option .',400);
                    break;
            }
            DB::commit();
            return $this->sendResponse($response, StatusEnum::PAYMENTMESSAGE);
        } catch (\Exception $e) {
          DB::rollBack();
            return $this->sendError('Something went wrong.'. $e->getMessage(),400);
        }
    }

    /* Cart details for user and guest */
    private function cartDetails($request)
    {       
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

}
