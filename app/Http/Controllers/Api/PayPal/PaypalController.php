<?php

namespace App\Http\Controllers\Api\PayPal;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use App\Classes\StatusEnum;
use App\Traits\PayPalTrait;
use Srmklive\PayPal\Services\ExpressCheckout;
use Srmklive\PayPal\Facades\Paypal as PayPalClient;
use Illuminate\Support\Facades\Auth;
use App\Jobs\GenerateInvoiceJob;
use App\Repositories\OrderRepository;
use Cart;

use Illuminate\Support\Facades\DB;

class PaypalController extends Controller
{
    use PayPalTrait;

    private $provider;
    private $userId;
    private $user;

    const DUMMY = "dummy";

    public function __construct()
    {
        $this->provider = new ExpressCheckout;
        $this->user = auth('api')->user();

        if ($this->user) {
            $this->userId = $this->user->id;
        } else {
            $this->userId = StatusEnum::DUMMY;
        }
    }
    //
    public function processTransaction(Request $request)
    {
        try {

            $response = $this->TransactionInProgress($request, $this->provider, auth()->user()->id);

            // This code checks if the 'paypal_link' key exists and is not null in the $response array.
            // If it does, it returns a JSON response with a status code of 200, a success message, and the value of the 'paypal_link' key as data, which is used to redirect the user to the PayPal payment page.
            if (isset($response['paypal_link']) && $response['paypal_link'] != null) {
                // return to paypal link
                return response()->json(['status' => 200, 'msg' => 'Success', 'data' => $response['paypal_link']]);
            } else {
                // return error if something went wrong.
                return response()->json(['status' => 400, 'msg' => 'Something went wrong in paypal generating link']);
            }
        } catch (Exception $e) {

            return response()->json(
                ['status' => 200, 'error', 'Something went wrong.' . $e]
            );
        }
    }

    public function successTransaction(Request $request)
    {

        try {
            // DB::beginTransaction();
            $data = $request->all();
            $response = $this->provider->getExpressCheckoutDetails($request->token);

            if ($this->userId == self::DUMMY) {
                $this->user = User::find($request->id);
                $this->userId = $this->user->id;
            }

            $orderData = [];

            $orderData['total_amount'] = \Cart::session($this->userId)->getTotal();
            $orderData['sub_total'] = \Cart::session($this->userId)->getSubTotal();
            $orderData['item_qty'] = \Cart::session($this->userId)->getTotalQuantity();


            $orderData['shipment_amount'] =  0;
            $orderData['estimate_day'] =  Carbon::now()->addWeekdays(5)->format('l d-m-Y');

            $cartConditions = Cart::session($this->userId)->getConditions('shipment_days');

            foreach ($cartConditions as $condition) {
                $amount = $condition->getValue(); // the value of the condition
                $orderData['shipment_amount'] = $amount;
                $orderData['estimate_day'] =  $condition->getAttributes()['estimate_day'];
            }

            $cartContent = Cart::session($this->userId)->getContent();

            //This code checks if the ACK code of a PayPal API response, is either "SUCCESS" or "SUCCESSWITHWARNING"
            if (isset($response['ACK']) && !empty($response['ACK']) &&  in_array(strtoupper($response['ACK']), [StatusEnum::SUCCESS, StatusEnum::PAYPALSUCCESSWITHWARNING])) {
                $repository = new OrderRepository;
                $order = $repository->createOrder($data, $response, $this->userId, $this->user, StatusEnum::PAYMENTTYPEPAYPAL, $orderData, $cartContent, $request->address);

                $orderData['order'] =$order['order'];
                //sending invoice email of the payment to user
                GenerateInvoiceJob::dispatch($this->user, $orderData, $order);
                // GenerateInvoiceJob::dispatch($data, $response, $this->userId,$this->user, StatusEnum::PAYMENTTYPEPAYPAL, $orderData, $cartContent);
                //return successfull message
                //clear cart after successfull payment
                Cart::session($this->userId)->clear();
                //clear cart condition
                Cart::session($this->userId)->clearCartConditions();

                return redirect('success-transaction')->with('Order', $orderData);
            } else {

                return redirect('cancel-transaction?error' . 'Something went wrong while processing transaction.');
                // return error if something went wrong.
                //     return response()->json(
                //                    ['status' => 400,'msg'=>'Something went wrong while processing transaction.']
                //                );
            }
            // DB::commit();
        } catch (Exception $e) {
            // DB::rollBack();
            return response()->json(
                ['status' => 400, 'msg', 'Something went wrong.' . $e]
            );
        }
    }

    public function cancelTransaction($error = 'Something went wrong!')
    {

        return redirect('checkout?error=' . $error);

        //        try{
        //            return response()->json(
        //                ['status' => 200,'msg'=> 'something went wrong while transaction.']
        //            );
        //        } catch(Exception $e) {
        //            return response()->json(
        //                ['status' => 200,'error', 'Something went wrong.' .$e]
        //            );
        //        }
    }
}
