<?php

namespace App\Http\Controllers\Api\Square;

use App\Classes\StatusEnum;
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

class SquareController extends Controller
{
    //
    private $squareClient;
    private $userId;
    public function __construct()
    {
        $this->squareClient = new SquareClient([
            'accessToken' => env('SQUARE_TOKEN'),
            'environment' => Environment::SANDBOX,
        ]);
       
    }
    // charge process
    public function chargeCustomer(CardRequest $request)
    {
        try {
            
            $idempotencyKey = uniqid();

            //create customer || retrieve customer if already added
            (auth()->user()->square_cus_id == null) ? $customer = $this->createCustomer() : $customer = $this->getCustomer();

            // Get card Token
            // $cardToken = $this->customerCardToken($request, $customer);

            $amount_money = new Money();
            $amount_money->setAmount(Cart::session(auth()->user()->id)->getSubTotal());
            $amount_money->setCurrency(StatusEnum::currency);
            //create payment Request
            $body = new CreatePaymentRequest($request->source_id, $idempotencyKey);
            $body->setAmountMoney($amount_money);
            $body->setAutocomplete(true);
            $body->setCustomerId($customer);
            $body->setLocationId(env('SQUARE_LOCATION_ID'));
            $body->setReferenceId('user-' . auth()->user()->id);

            $api_response = $this->squareClient->getPaymentsApi()->createPayment($body);
           
            if ($api_response->isSuccess()) {
                $orderData = [];

                $orderData['total_amount'] = Cart::session(auth()->user()->id)->getTotal();
                $orderData['sub_total'] = Cart::session(auth()->user()->id)->getSubTotal();
                $orderData['item_qty'] =Cart::session(auth()->user()->id)->getTotalQuantity();
    
                $cartContent = Cart::session(auth()->user()->id)->getContent();

                $result = $api_response->getResult();
               
                GenerateInvoiceJob::dispatch(array(), $api_response, auth()->user()->id, StatusEnum::PAYMENTTYPESQUARE, $orderData , $cartContent);

                Cart::session(auth()->user()->id)->clear();
            } else {
                $errors = $api_response->getErrors();
                return response()->json(['code' => 400, 'msg' => "Something went wrong in square payment."]);
            }

            return response()->json(['code' => 200, 'msg' => StatusEnum::PAYMENTMESSAGE]);
        } catch (Exception $e) {
            
            return response()->json(['code' => 400, 'msg' => "something went wrong." . $e]);
        }
    }

    // create customer
    public function createCustomer()
    {
        try {

            //set address
            // $address = new Address();
            // $address->setAddressLine1('500 Electric Ave');
            // $address->setAddressLine2('Suite 600');
            // $address->setLocality('New York');
            // $address->setAdministrativeDistrictLevel1('NY');
            // $address->setPostalCode('10003');
            // $address->setCountry('US');
            //create customer
            $body = new CreateCustomerRequest();
            $body->setGivenName(auth()->user()->name);
            $body->setEmailAddress(auth()->user()->email);
            // $body->setAddress($address);
            $body->setPhoneNumber('+1-212-555-4240');
            $body->setNote('our customer name is ' . auth()->user()->name . '');

            $api_response = $this->squareClient->getCustomersApi()->createCustomer($body);

            if ($api_response->isSuccess()) {
                $customer_id = $api_response->getResult()->getCustomer()->getId();
                //saving customer id in user table square_cus_id column
                User::whereId(auth()->user()->id)->update(['square_cus_id' => $customer_id]);
            } else {
                $errors = $api_response->getErrors();
            }

            return $customer_id;
        } catch (Exception $e) {
            return response()->json(['Code' => 400, 'msg' => "Something went wrong" . $e]);
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
            }
            return $customer_id;
        } catch (Exception $e) {
            return response()->json(['Code' => 400, 'msg' => "Something went wrong" . $e]);
        }
    }

    //get card customer token
    // public function customerCardToken($data, $customerID)
    // {
    //     try {
    //         //unique identify value
    //         $idempotencyKey = uniqid();
    //         //card info get from customer
    //         $card = new Card();
    //         $card->setId($idempotencyKey);
    //         $card->setCardBrand($data->card_brand);
    //         $card->setCardholderName($data->card_holder_name);
    //         $card->setBin($data->card_bin);
    //         $card->setLast4($data->card_last_4);
    //         $card->setExpMonth($data->card_expiry_month);
    //         $card->setExpYear($data->card_expiry_year);
    //         $card->setCardType($data->card_type);
    //         $card->setCustomerId($customerID);
    //         $card->setReferenceId('user-id-' . auth()->user()->id);

    //         $body = new CreateCardRequest(
    //             $idempotencyKey,
    //             'cnon:card-nonce-ok',
    //             $card
    //         );

    //         $api_response = $this->squareClient->getCardsApi()->createCard($body);

    //         if ($api_response->isSuccess()) {
    //             $result = $api_response->getResult()->getCard()->getId();
    //         } else {
    //             $errors = $api_response->getErrors();
    //         }
    //         return $result;
    //     } catch (Exception $e) {
    //         return response()->json(['Code' => 400, 'msg' => "Something went wrong" . $e]);
    //     }
    // }
}
