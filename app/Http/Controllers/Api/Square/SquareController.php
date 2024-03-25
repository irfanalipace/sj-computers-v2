<?php

namespace App\Http\Controllers\Api\Square;

use App\Classes\StatusEnum;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Square\CardRequest;
use App\Jobs\Error\SendErrorMail;
use App\Models\Guest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Square\SquareClient;
use Square\LocationsApi;
use Square\Exceptions\ApiException;
use Square\Http\ApiResponse;
use Square\Environment;
use Square\Models\CreateCardRequest;
use Square\Models\CreateCustomerRequest;
use Square\Models\Card;
use \Square\Models\Money;
use Cart;
use Square\Models\CreatePaymentRequest;
use App\Jobs\GenerateInvoiceJob;
use App\Models\Order;
use Carbon\Carbon;
use App\Repositories\OrderRepository;
use App\Models\Invoice;
use App\Models\OrderItem;
use App\Traits\Amazon\AmazonTrait;
use App\Models\OrderShippingAddress;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class SquareController extends BaseController
{
    use AmazonTrait;
    //
    private $squareClient, $userId, $user, $totalAmount, $subTotal, $totalQty, $userType, $estimate_days, $shipment_amount,$repository;
    public function __construct($repository)
    {
        // Environment value
        $environment = $this->enviromnet();

        // SANDBOX or PRODUCTION
        $this->squareClient = new SquareClient([
            'accessToken' => config('app.square_token') ?? 'EAAAECb1ai32160Bz6Aepr3tfyTPPA_jTpGVMgIclNbbyyUVMA0GoauqveDOpLs7',
            'environment' => $environment,
        ]);

        $this->repository = $repository;
    }

    // charge process
    public function processPayment($request,$user,$userType,$cartDetails)
    {
       

        try {
            $idempotencyKey = uniqid();
            
            // /*if userId is dummy the i will pass guest_user_id else i will pass userId*/
            $userIdToPass = $user->id;
            $user_type = ($userType != StatusEnum::GUEST) ? StatusEnum::USER : StatusEnum::GUEST;
            $cartItems = ($userType == StatusEnum::GUEST) ? $request->cart_items : [];
          
            //create customer || retrieve customer if already added
            if ($user->square_cus_id == null) {
                $customer = $this->createCustomer($user,$user_type);
            } else {
                $customer = $this->getCustomer($user);
            }           
          
            DB::beginTransaction();
         
            $cartContent = \Cart::session($userIdToPass)->getContent();
            $listofItems = ($userType == StatusEnum::GUEST) ? $cartItems : $cartContent;
           
            $check_product_first = $this->repository->checkProduct($listofItems,$userIdToPass,$userType);
            if (!$check_product_first) {
                $error = ['cartError' => 'Product quantity is invalid.'];
                throw new Exception(json_encode($error));
            }
           
            // create invoice along with order
            $orderData = [];
            
            $orderData['total_amount'] = number_format($cartDetails['totalAmount'], 2, '.', '');
            $orderData['sub_total'] = number_format($cartDetails['subTotal'], 2, '.', '');
            $orderData['item_qty'] =  $cartDetails['totalQty'];


            $orderData['shipment_amount'] =  0;
            $orderData['estimate_day'] =  Carbon::now()->addWeekdays(5)->format('l d-m-Y');

            $cartConditions = Cart::session($userIdToPass)->getConditions('shipment_days');
         
            foreach ($cartConditions as $condition) {
                $amount = $condition->getValue(); // the value of the condition
                $orderData['shipment_amount'] = $amount;
                $orderData['estimate_day'] =  $condition->getAttributes()['estimate_day'];
            }
            if ($userType == StatusEnum::GUEST) {
                $orderData['shipment_amount'] = $this->shipment_amount ?? 0;
                $orderData['estimate_day'] =  $this->estimate_days ?? Carbon::now()->addWeekdays(5)->format('l d-m-Y');
            }
            
            $order = $this->repository->createOrder(array(), $userIdToPass, $user, StatusEnum::PAYMENTTYPESQUARE, $orderData, $cartContent, $request->shipping_address, $user_type, $cartItems);
            if (!$order) {
               throw new Exception('Please Try Again.');
            }
            
            $orderData ['order_detail']= $order['order'];
           
            // Get card Token
            $amount_money = new Money();
            $amount_money->setAmount($cartDetails['totalAmount'] * 100);
            $amount_money->setCurrency(StatusEnum::currency);
            //create payment Request
            $body = new CreatePaymentRequest($request->source_id, $idempotencyKey);
            $body->setAmountMoney($amount_money);
            $body->setAutocomplete(true);
            $body->setCustomerId($customer);
            $body->setLocationId(env('SQUARE_LOCATION_ID'));
            $body->setReferenceId('user-' . $this->userId);

            $api_response = $this->squareClient->getPaymentsApi()->createPayment($body);
            
            if ($api_response->isSuccess()) {

                $result = $api_response->getResult();
                // update invoice column payer_id
                Invoice::where('id', $order['invoice_id'])->update(['payer_id' => $api_response->getResult()->getPayment()->getId()]);
                //sending invoice email of the payment to user
                GenerateInvoiceJob::dispatch($user, $orderData, $order,StatusEnum::PAYMENTTYPESQUARE,$userType);

                //clear cart after successfull payment
                (isset($request->is_buy_now ) && $request->is_buy_now == true) ? \Cart::session($userIdToPass)->remove($request->cart_id): Cart::session($userIdToPass)->clear();
                //clear cart condition
                Cart::session($userIdToPass)->clearCartConditions();
            } else {
                DB::rollBack();
                $errors = $api_response->getErrors();

                throw new Exception($errors[0]->getDetail());
            }

            DB::commit();
            return ['Order' => $orderData, "cart_data" => $check_product_first];
        } catch (Exception $e) {
            DB::rollBack();
            // send error to admin
            // SendErrorMail::dispatch($user,$orderData,$order);
            throw new Exception($e->getMessage());
        }
    }

    // create customer
    public function createCustomer($user,$userType)
    {
        try {
            //create customer
            $body = new CreateCustomerRequest();
            $body->setGivenName($user->name);
            $body->setEmailAddress($user->email);
            $body->setNote('our customer name is ' . $user->name . '');

            $api_response = $this->squareClient->getCustomersApi()->createCustomer($body);

            if ($api_response->isSuccess()) {
                $customer_id = $api_response->getResult()->getCustomer()->getId();
                //saving customer id in user table square_cus_id column
              
                if ($userType != StatusEnum::GUEST) {
                    User::whereId($user->id)->update(['square_cus_id' => $customer_id]);
                } else {
                    Guest::whereId($user->id)->update(['square_cus_id' => $customer_id]);
                }
            } else {
                $errors = $api_response->getErrors();
               throw new Exception("Something went wrong while saving customer key");
            }

            return $customer_id;
        } catch (Exception $e) {
            throw new Exception( $e->getMessage());
        }
    }

    // retreive customer
    public function getCustomer($user)
    {
        try {

            $api_response = $this->squareClient->getCustomersApi()->retrieveCustomer($user->square_cus_id);

            if ($api_response->isSuccess()) {
                $customer_id = $api_response->getResult()->getCustomer()->getId();
            } else {
                $errors = $api_response->getErrors();
                throw new Exception("Something went wrong while fetching customer key");
            }
            return $customer_id;
        } catch (Exception $e) {
            throw new Exception( $e->getMessage());
        }
    }

    //enviromnet
    public function enviromnet()
    {
        if (config('app.env') != StatusEnum::ENV_PRODUCTION) {
            $environment = Environment::SANDBOX;
        } else {
            $environment = Environment::PRODUCTION;
        }
        return $environment;
    }
}
