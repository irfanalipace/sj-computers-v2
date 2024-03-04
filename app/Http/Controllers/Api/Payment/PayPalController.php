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
                        "value" => number_format($cartDetails['totalAmount'], 2, '.', '') * 100
                    ],
                ],
            ],

        ]);
        $cartItems = (isset($request->cart_items)) ?  $request->cart_items : [];
      
        if(isset($response['id']) && $response['id']!=null) {
            $detail = [
                "shippping_address" =>$request->shipping_address,
                "user" => $user,
                "user_type" => $userType,
                "cart_details" => $cartDetails,
                "cart_items" => $cartItems,
                "is_buy_now" => (isset($request->is_buy_now ) && $request->is_buy_now == true) ? true : false,
                "cart_id" => (isset($request->cart_id )) ? $request->cart_id : null,
            ];
            \Cache::put("paypal_transaction_".$response['id'],$detail, 1800); // 1800 seconds = 30 minutes
              
            // Session::put('shippping_address', $request->shipping_address);
           
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

        $getCache = \Cache::get("paypal_transaction_".$request->token);
        $shippingAddress = $getCache['shippping_address'];      
        $user =  $getCache['user']; 
        $userType =  $getCache['user_type']; 
        $cartDetails = $getCache['cart_details'];  
        
         /*if userId is dummy the i will pass guest_user_id else i will pass userId*/
         $userIdToPass = ($userType != StatusEnum::GUEST) ? $user->id : $user->email;
         $userType = ($userType != StatusEnum::GUEST) ? StatusEnum::USER : StatusEnum::GUEST;
         $cartItems = ($userType == StatusEnum::GUEST) ? $getCache['cart_items'] : [];
        
         $cartContent = (isset($getCache['is_buy_now'] ) && $getCache['is_buy_now'] == true) ? \Cart::session($userIdToPass)->get($getCache['cart_id']) : \Cart::session($userIdToPass)->getContent();
       
         $listofItems = ($userType == StatusEnum::GUEST) ? $cartItems : $cartContent;
        
         $check_product_first =  $repository->checkProduct($listofItems,$userIdToPass,$userType,(isset($getCache['is_buy_now'] ) && $getCache['is_buy_now'] == true));
         if (!$check_product_first) { 
            DB::rollBack();
             return redirect('cart?error='."Product quantity is invalid");
         }
        
         // create invoice along with order
         $orderData = [];

         $orderData['total_amount'] = number_format($cartDetails['totalAmount'], 2, '.', '');
         $orderData['sub_total'] = number_format($cartDetails['subTotal'], 2, '.', '');
         $orderData['item_qty'] =  $cartDetails['totalQty'];


         $orderData['shipment_amount'] =  0;
         $orderData['estimate_day'] =  Carbon::now()->addWeekdays(5)->format('l d-m-Y');

         $cartConditions = \Cart::session($userIdToPass)->getConditions('shipment_days');

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

            $order = $repository->createOrder(array(), $userIdToPass, $user, StatusEnum::PAYMENTTYPEPAYPAL, $orderData, $cartContent, $shippingAddress, $userType, $cartItems,(isset($getCache['is_buy_now'] ) && $getCache['is_buy_now'] == true));
            if (!$order) {
                return redirect()->route('cancel');
             }    

            $orderData['order_detail'] = $order['order'];
            $orderData['payer_id'] = $response['id'];

            $orderDetailOutput['order_no'] = $order['order']['id'];
            $orderDetailOutput['order_date'] = $order['order']['created_at']->format('Y-m-d H:i:s');
            $orderDetailOutput['delivery_date'] = $orderData['estimate_day']; // Delivery Details
            $orderDetailOutput['payment_type'] = 'PayPal'; 
            $orderDetailOutput['id'] = $response['id'];
            $orderDetailOutput['subtotal'] = $orderData['sub_total'];
            $orderDetailOutput['total'] = $orderData['total_amount'];

             // Iterate through each order item to get product details
             $orderDetailOutput['order_item'] = $order['order']['orderItem']->map(function ($item) {
                return [
                    'product_name' => $item->product_name,
                    'qty' => $item->qty,
                    'price' => $item->price
                ];
            });
           
            Invoice::where('id', $order['invoice_id'])->update(['payer_id' => $response['id'] ]);
            GenerateInvoiceJob::dispatch($user, $orderData, $order);           
           
            // If you need to display more details, add them here accordingly

             //clear cart after successfull payment
            (isset($getCache['is_buy_now'] ) && $getCache['is_buy_now'] == true) ? \Cart::session($userIdToPass)->remove($getCache['cart_id']) : \Cart::session($userIdToPass)->clear();
            
            //clear cart condition            
           \Cart::session($userIdToPass)->clearCartConditions();
            DB::commit();

            // Convert to JSON if necessary for API response
            $jsonResponse = json_encode($orderDetailOutput);
            
            return redirect()->to('thank-you?orderSuccess='.$jsonResponse);
            \Cache::forget("paypal_transaction_".$request->token);

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
