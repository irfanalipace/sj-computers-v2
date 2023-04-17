<?php

namespace App\Http\Controllers\Api\PayPal;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Classes\StatusEnum;
use App\Traits\PayPalTrait;
use Srmklive\PayPal\Services\ExpressCheckout;
use Srmklive\PayPal\Facades\Paypal as PayPalClient;
use Illuminate\Support\Facades\Auth;
use App\Jobs\GenerateInvoiceJob;

use Illuminate\Support\Facades\DB;

class PaypalController extends Controller
{
    use PayPalTrait;

    private $provider;
    private $userId;

    public function __construct()
    {
        $this->provider = new ExpressCheckout;
        $this->userId = (Auth::check()) ? auth()->user()->id  : 'dummy';
    }
    //
    public function processTransaction(Request $request)
    {
        try{
       
           $response = $this->TransactionInProgress($request,$this->provider,$this->userId);
           
            // This code checks if the 'paypal_link' key exists and is not null in the $response array. 
            // If it does, it returns a JSON response with a status code of 200, a success message, and the value of the 'paypal_link' key as data, which is used to redirect the user to the PayPal payment page.
            if (isset($response['paypal_link']) && $response['paypal_link'] != null) {
                // return to paypal link
                return response()->json(['status' => 200, 'msg' => 'Success', 'data' => $response['paypal_link']]);
            } else {
               // return error if something went wrong.
                return response()->json(['status' => 400,'msg' => 'Something went wrong in paypal generating link']);
            }

        } catch(Exception $e) {
            return response()->json(
                ['status' => 200,'error', 'Something went wrong.' .$e]
            );
        }
    }

    public function successTransaction(Request $request)
    {
        try{
           
            // DB::beginTransaction();
            $data = $request->all();
            $response = $this->provider->getExpressCheckoutDetails($request->token);
            //This code checks if the ACK code of a PayPal API response, is either "SUCCESS" or "SUCCESSWITHWARNING"
            if (in_array(strtoupper($response['ACK']), [StatusEnum::PAYPALSUCCESS,StatusEnum::PAYPALSUCCESSWITHWARNING])) {
                GenerateInvoiceJob::dispatch($data,$response,$this->userId);
                //return successfull message
                return response()->json(['status' => 200, 'msg' => 'Payment Successfully completed']);
    
            } else {
                 // return error if something went wrong.
                return response()->json(
                    ['status' => 400,'msg'=>'Something went wrong while processing transaction.']
                );
            } 
            // DB::commit();
        } catch(Exception $e) {
            // DB::rollBack();
            return response()->json(
                ['status' => 400,'msg', 'Something went wrong.' .$e]
            );
        }
    }

    public function cancelTransaction()
    {
        try{
            return response()->json(
                ['status' => 200,'msg'=> 'something went wrong while transaction.']
            );
        } catch(Exception $e) {
            return response()->json(
                ['status' => 200,'error', 'Something went wrong.' .$e]
            );
        }
    }
}
