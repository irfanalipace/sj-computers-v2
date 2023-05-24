<?php

namespace App\Http\Controllers\Api\Square;

use App\Classes\StatusEnum;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Square\CardRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
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
use Illuminate\Support\Facades\Artisan;

class SquareController extends BaseController
{
    //
    private $squareClient;
    private $userId;
    private $user;
    public function __construct()
    {
        // SANDBOX or PRODUCTION
        $this->squareClient = new SquareClient([
            'accessToken' => config('app.square_token'),
            'environment' => Environment::SANDBOX,
        ]);
        $this->user = auth('api')->user();

        if ($this->user) {
            $this->userId = $this->user->id;
        } else {
            $this->userId = StatusEnum::DUMMY;
        }
    }
    // charge process
    public function chargeCustomer(CardRequest $request, OrderRepository $repository)
    {
        try {

            $idempotencyKey = uniqid();
            // Clear the all cache
            // Artisan::call('optimize:clear');
            // Clear the application cache
            // Artisan::call('cache:clear');
            // Clear the configuration cache           
            // Artisan::call('config:clear');

            //create customer || retrieve customer if already added
            if (auth()->user()->square_cus_id == null) {                
                $customer = $this->createCustomer();
            } else {               
               
                $customer = $this->getCustomer();
            }

            // Get card Token
            $amount_money = new Money();
            $amount_money->setAmount(Cart::session($this->userId)->getTotal());
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
                $orderData = [];


                $orderData['total_amount'] = number_format(\Cart::session($this->userId)->getTotal(), 2, '.', '');
                $orderData['sub_total'] = number_format(\Cart::session($this->userId)->getSubTotal(), 2, '.', '');
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

                $result = $api_response->getResult();
                $order = $repository->createOrder(array(), $api_response, $this->userId, $this->user, StatusEnum::PAYMENTTYPESQUARE, $orderData, $cartContent, $request->shipping_address);

                $orderData['order'] = $order['order'];

                //sending invoice email of the payment to user
                GenerateInvoiceJob::dispatch($this->user, $orderData, $order);
                // GenerateInvoiceJob::dispatch(array(), $api_response, $this->userId, $this->user, StatusEnum::PAYMENTTYPESQUARE, $orderData, $cartContent);

                //clear cart after successfull payment
                Cart::session($this->userId)->clear();
                //clear cart condition
                Cart::session($this->userId)->clearCartConditions();
            } else {

                $errors = $api_response->getErrors();

                return response()->json(['code' => 400, 'message' => $errors[0]->getDetail()]);
            }
            return $this->sendResponse(['Order' => $orderData], StatusEnum::PAYMENTMESSAGE);
        } catch (Exception $e) {

            return response()->json(['code' => 400, 'message' => "something went wrong." . $e]);
        }
    }

    // create customer
    public function createCustomer()
    {
        try {
            //create customer
            $body = new CreateCustomerRequest();
            $body->setGivenName(auth()->user()->name);
            $body->setEmailAddress(auth()->user()->email);
            $body->setNote('our customer name is ' . auth()->user()->name . '');

            $api_response = $this->squareClient->getCustomersApi()->createCustomer($body);

            if ($api_response->isSuccess()) {
                $customer_id = $api_response->getResult()->getCustomer()->getId();
                //saving customer id in user table square_cus_id column
                User::whereId($this->userId)->update(['square_cus_id' => $customer_id]);
            } else {
                $errors = $api_response->getErrors();
                return response()->json(['Code' => 400, 'message' => "Something went wrong while saving customer key"]);
            }

            return $customer_id;
        } catch (Exception $e) {
            return response()->json(['Code' => 400, 'message' => "Something went wrong" . $e]);
        }
    }
    // retreive customer
    public function getCustomer()
    {
        try {

            $api_response = $this->squareClient->getCustomersApi()->retrieveCustomer(auth()->user()->square_cus_id);

            if ($api_response->isSuccess()) {
                $customer_id = $api_response->getResult()->getCustomer()->getId();
            } else {
                $errors = $api_response->getErrors();
                return response()->json(['Code' => 400, 'message' => "Something went wrong while fetching customer key"]);
            }
            return $customer_id;
        } catch (Exception $e) {
            return response()->json(['Code' => 400, 'message' => "Something went wrong" . $e]);
        }
    }
}
