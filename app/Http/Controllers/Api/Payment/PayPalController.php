<?php

namespace App\Http\Controllers\Api\Payment;

use App\Classes\StatusEnum;
use App\Http\Controllers\Controller;
use App\Jobs\Error\SendErrorMail;
use App\Models\Invoice;
use App\Models\Payment;
use App\Repositories\Payment\OrderRepository;
use Carbon\Carbon;
use Darryldecode\Cart\Cart;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
//use Srmklive\PayPal\Services\ExpressCheckout;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use App\Jobs\GenerateInvoiceJob;
use Illuminate\Support\Facades\DB;

class PayPalController extends Controller
{
    private $provide,$user;
    public function __construct()
    {
        $this->provide = new PayPalClient;
    }
    /**
     * Responds with a welcome message with instructions
     *
     * @return \Illuminate\Http\Response
     */

    public function processPayment($request,$user,$userType,$cartDetails)
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
                        "value" => 100
                    ]
                ]
            ]
        ]);
        
        if(isset($response['id']) && $response['id']!=null) {
            session()->put('shippping_address', $request->shipping_address);      
            session()->put('user', $user);
            session()->put('user_type', $userType); 
            session()->put('cart_details', $cartDetails);         
            // Session::put('shippping_address', $request->shipping_address);
            (isset($request->cart_items)) ??   session()->put('cart_item', $request->cart_items);
            foreach($response['links'] as $link) {
                if($link['rel'] === 'approve') {
                    return $link['href'];
                }
            }
        } else {
            
            return redirect()->route('cancel');
        }
    }

    public function paypalSuccess(Request $request,OrderRepository $repository)
    {
        DB::beginTransaction();
        $this->provide->setApiCredentials(config('paypal'));
        $paypalToken = $this->provide->getAccessToken();
        $response = $this->provide->capturePaymentOrder($request->token);
        $shippingAddress = session()->get('shippping_address');      
        $user =  session()->get('user'); 
        $userType =  session()->get('user_type'); 
        $cartDetails =  session()->get('cart_details');  
         /*if userId is dummy the i will pass guest_user_id else i will pass userId*/
         $userIdToPass = ($userType != StatusEnum::GUEST) ? $user->id : $user->email;
         $userType = ($userType != StatusEnum::GUEST) ? StatusEnum::USER : StatusEnum::GUEST;
         $cartItems = ($userType == StatusEnum::GUEST) ? session()->get('cart_item') : [];
        
         $cartContent = Cart::session($userIdToPass)->getContent();
         $listofItems = ($userType == StatusEnum::GUEST) ? $cartItems : $cartContent;
         
         $check_product_first =  $repository->checkProduct($listofItems,$userIdToPass,$userType);
         if (!$check_product_first) { 
             throw new Exception('Please try again.');
         }

         // create invoice along with order
         $orderData = [];

         $orderData['total_amount'] = number_format($cartDetails['[totalAmount]'], 2, '.', '');
         $orderData['sub_total'] = number_format($cartDetails['subTotal'], 2, '.', '');
         $orderData['item_qty'] =  $$cartDetails['totalQty'];


         $orderData['shipment_amount'] =  0;
         $orderData['estimate_day'] =  Carbon::now()->addWeekdays(5)->format('l d-m-Y');

         $cartConditions = Cart::session($userIdToPass)->getConditions('shipment_days');

         foreach ($cartConditions as $condition) {
             $amount = $condition->getValue(); // the value of the condition
             $orderData['shipment_amount'] = $amount;
             $orderData['estimate_day'] =  $condition->getAttributes()['estimate_day'];
         }
         if ($userType == StatusEnum::GUEST) {
             $orderData['shipment_amount'] =  0;
             $orderData['estimate_day'] =   Carbon::now()->addWeekdays(5)->format('l d-m-Y');
         }

        if(isset($response['status']) && $response['status'] == 'COMPLETED') {

            $order = $repository->createOrder(array(), $userIdToPass, $this->user, StatusEnum::PAYMENTTYPEPAYPAL, $orderData, $cartContent, $request->shipping_address, $userType, $cartItems);
            if (!$order) {
                throw new Exception('Please Try Again.');
             }    

            $orderData['order'] = $order['order'];
            Invoice::where('id', $order['invoice_id'])->update(['payer_id' => $response['id'] ]);
            GenerateInvoiceJob::dispatch($user, $orderData, $order);

            //clear cart after successfull payment
            Cart::session($userIdToPass)->clear();
            //clear cart condition
            Cart::session($userIdToPass)->clearCartConditions();
            DB::commit();
            return redirect()->to('thank-you',['Order' => $orderData, "cart_data" => $check_product_first]);
            
            unset($_SESSION['shippping_address']);
            unset($_SESSION['user']);
            unset($_SESSION['user_type']);
            unset($_SESSION['cart_details']);

        } else {
            DB::rollBack();
            return redirect()->route('cancel');
        }
    }
    public function paypalCancel($error = 'Payment is cancelled.')
    { 
        return redirect('checkout?error=' . $error.'&payment_type=paypal');
       
    }
}
