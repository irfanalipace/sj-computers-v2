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
    private $squareClient, $userId, $user, $totalAmount, $subTotal, $totalQty, $userType, $estimate_days, $shipment_amount;
    public function __construct(Request $request)
    {
        // Environment value
        $environment = $this->enviromnet();

        // SANDBOX or PRODUCTION
        $this->squareClient = new SquareClient([
            'accessToken' => config('app.square_token') ?? 'EAAAECb1ai32160Bz6Aepr3tfyTPPA_jTpGVMgIclNbbyyUVMA0GoauqveDOpLs7',
            'environment' => $environment,
        ]);
        $this->user = Auth::guard('api')->user();
        if ($this->user) {

            $this->userId = $this->user->id;
            $this->userType = StatusEnum::USER;
            $this->totalAmount = \Cart::session($this->userId)->getTotal();
            $this->subTotal = \Cart::session($this->userId)->getSubTotal();
            $this->totalQty = \Cart::session($this->userId)->getTotalQuantity();
        } else {

            $guestUser = $this->getOrCreateGuestUser($request->shipping_address);
            $this->user = $guestUser;
            $this->userId = $guestUser->email;
            $this->totalAmount = isset($request->details['total']) ? $request->details['total'] : 0.00;
            $this->subTotal = isset($request->details['sub_total']) ? $request->details['sub_total'] : 0.00;
            $this->totalQty = isset($request->details['total_quantity']) ? $request->details['total_quantity'] : 0;
            $this->shipment_amount = isset($request->details['shipment_amount']) ? $request->details['shipment_amount'] : 0.00;
            $this->estimate_days = isset($request->details['estimate_days']) ? $request->details['estimate_days'] : null;
            $this->userType = StatusEnum::GUEST;
        }
    }

    // charge process
    public function chargeCustomer(CardRequest $request, OrderRepository $repository)
    {
        DB::beginTransaction();

        try {
            $idempotencyKey = uniqid();

            //create customer || retrieve customer if already added
            if ($this->user->square_cus_id == null) {
                $customer = $this->createCustomer();
            } else {
                $customer = $this->getCustomer();
            }

            /*if userId is dummy the i will pass guest_user_id else i will pass userId*/
            $userIdToPass = ($this->userType != StatusEnum::GUEST) ? $this->userId : $this->user->id;
            $user_type = ($this->userType != StatusEnum::GUEST) ? StatusEnum::USER : StatusEnum::GUEST;
            $cartItems = ($this->userType == StatusEnum::GUEST) ? $request->cart_items : [];

            $cartContent = Cart::session($this->userId)->getContent();
            $listofItems = ($this->userType == StatusEnum::GUEST) ? $cartItems : $cartContent;

            $check_product_first = $this->checkProduct($listofItems);
            if (!$check_product_first) {
                return response()->json(['code' => 400, "cart_error" => true, 'message' => "Please try again ."]);
            }

            // create invoice along with order
            $orderData = [];

            $orderData['total_amount'] = number_format($this->totalAmount, 2, '.', '');
            $orderData['sub_total'] = number_format($this->subTotal, 2, '.', '');
            $orderData['item_qty'] =  $this->totalQty;


            $orderData['shipment_amount'] =  0;
            $orderData['estimate_day'] =  Carbon::now()->addWeekdays(5)->format('l d-m-Y');

            $cartConditions = Cart::session($this->userId)->getConditions('shipment_days');

            foreach ($cartConditions as $condition) {
                $amount = $condition->getValue(); // the value of the condition
                $orderData['shipment_amount'] = $amount;
                $orderData['estimate_day'] =  $condition->getAttributes()['estimate_day'];
            }
            if ($this->userType == StatusEnum::GUEST) {
                $orderData['shipment_amount'] = $this->shipment_amount ?? 0;
                $orderData['estimate_day'] =  $this->estimate_days ?? Carbon::now()->addWeekdays(5)->format('l d-m-Y');
            }

            $order = $this->createOrder(array(), $userIdToPass, $this->user, StatusEnum::PAYMENTTYPESQUARE, $orderData, $cartContent, $request->shipping_address, $user_type, $cartItems);
            if (!$order) {
                return response()->json(["cart" => 'Please Try Again']);
            }
            $orderData['order'] = $order['order'];

            // Get card Token
            $amount_money = new Money();
            $amount_money->setAmount($this->totalAmount * 100);
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
                GenerateInvoiceJob::dispatch($this->user, $orderData, $order);
                // GenerateInvoiceJob::dispatch(array(), $api_response, $this->userId, $this->user, StatusEnum::PAYMENTTYPESQUARE, $orderData, $cartContent);

                //clear cart after successfull payment
                Cart::session($this->userId)->clear();
                //clear cart condition
                Cart::session($this->userId)->clearCartConditions();
            } else {
                DB::rollBack();
                $errors = $api_response->getErrors();

                return response()->json(['code' => 400, 'message' => $errors[0]->getDetail()]);
            }

            DB::commit();
            return $this->sendResponse(['Order' => $orderData, "cart_data" => $check_product_first], StatusEnum::PAYMENTMESSAGE);
        } catch (Exception $e) {
            DB::rollBack();
            // send error to admin
            SendErrorMail::dispatch($this->user,$orderData,$order);
            return response()->json(['code' => 400, 'message' => "something went wrong." . $e]);
        }
    }

    // create customer
    public function createCustomer()
    {
        try {
            //create customer
            $body = new CreateCustomerRequest();
            $body->setGivenName($this->user->name);
            $body->setEmailAddress($this->user->email);
            $body->setNote('our customer name is ' . $this->user->name . '');

            $api_response = $this->squareClient->getCustomersApi()->createCustomer($body);

            if ($api_response->isSuccess()) {
                $customer_id = $api_response->getResult()->getCustomer()->getId();
                //saving customer id in user table square_cus_id column

                if ($this->userType != StatusEnum::GUEST) {
                    User::whereId($this->userId)->update(['square_cus_id' => $customer_id]);
                } else {
                    Guest::whereId($this->user->id)->update(['square_cus_id' => $customer_id]);
                }
            } else {
                $errors = $api_response->getErrors();
                return response()->json(['Code' => 400, 'message' => "Something went wrong while saving customer key"]);
            }

            return $customer_id;
        } catch (Exception $e) {
            return response()->json(['Code' => 400, 'message' => "Something went wrong" . $e->getMessage()]);
        }
    }
    // retreive customer
    public function getCustomer()
    {
        try {

            $api_response = $this->squareClient->getCustomersApi()->retrieveCustomer($this->user->square_cus_id);

            if ($api_response->isSuccess()) {
                $customer_id = $api_response->getResult()->getCustomer()->getId();
            } else {
                $errors = $api_response->getErrors();
                return response()->json(['Code' => 400, 'message' => "Something went wrong while fetching customer key"]);
            }
            return $customer_id;
        } catch (Exception $e) {
            return response()->json(['Code' => 400, 'message' => "Something went wrong" . $e->getMessage()]);
        }
    }

    private function getOrCreateGuestUser($detail)
    {

        if (isset($detail['email']) && !is_null($detail['email'])) {
            // Check if the email exists in the guest_users table
            $guestUser = Guest::where('email', $detail['email'])->first();
            // If the guest user does not exist, create a new one
            if (!$guestUser) {
                $guestUser = new Guest();
                $guestUser->ip_address = request()->ip();
                $guestUser->full_name = $detail['full_name'] ?? null;
                $guestUser->phone_number = $detail['phone_number'] ?? null;
                $guestUser->email = $detail['email'];
                $guestUser->address = $detail['address'] ?? null;
                $guestUser->city = $detail['city'] ?? null;
                $guestUser->state = $detail['state'] ?? null;
                $guestUser->zip_code = $detail['zip_code'] ?? null;
                $guestUser->country = $detail['country'] ?? null;
                $guestUser->apartment = $detail['apartment'] ?? null;
                $guestUser->save();
            }
        } else {

            return null;
        }
        return $guestUser;
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
    // check cart quantity with product quantity
    public function checkProduct($cart_items)
    {
        try {
            $data = [];
            $cart = Cart::session($this->userId);

            foreach ($cart_items as $value) {
                # code...

                $product_id = ($this->userType == StatusEnum::GUEST) ? $value['product_id'] : $value['id'];
                $quantity = ($this->userType == StatusEnum::GUEST) ? $value['qty'] : $value['quantity'];
                $product = Product::whereId($product_id)->withoutGlobalScopes()->first();

                if ($product->quantity == 0) {

                    (!$cart->isEmpty()) ? $cart->remove($product_id) : true;

                    return false;
                } elseif ($product->quantity < $quantity) {

                    if (!$cart->isEmpty()) {
                        $cart->update($product_id, [
                            'quantity' => array(
                                'relative' => false,
                                'value' => $product->quantity
                            ),
                            'associatedModel' => $product
                        ]);
                    }

                    return false;
                } else {
                    $data[] = [
                        'status' => true,
                        'product_id' => $product->id,
                        'message' => "quantity is available.",
                        'quantity' => $quantity,
                        'available_quantity' => $product->quantity
                    ];
                }
            }

            return $data;
        } catch (Exception $e) {
            return false;
        }
    }
    // Transaction proceed

    // create order ,order item,invoice and update product
    public function createOrder($data, $userId, $user, $payment_type, $cartData, $cartContent = [], $shippingAddreess, $user_type, $cartItems = [])
    {
        try {
            $ids = [];

            $invoice = $this->storeInvoice($payment_type, $data, $cartData['total_amount'], $userId, $user_type, $user);

            //saving order after invoice created
            $order = [];

            $order['total_amount'] = $cartData['total_amount'];
            $order['sub_total'] = $cartData['sub_total'];
            $order[$user_type == StatusEnum::USER ? 'user_id' : 'guest_id'] = $user->id;      //user id or guest id
            $order['invoice_id'] = $invoice->id;
            $order['status'] = StatusEnum::COMPLETE;
            $order['shipment_price'] = $cartData['shipment_amount'];
            $order['shipment_days'] = $cartData['estimate_day'];
            $order['item_qty'] = $cartData['item_qty'];
            $order = Order::create($order);

            if ($user_type == StatusEnum::GUEST) {

                foreach ($cartItems as $item) {
                    # store product_id into ids variable...
                    $ids[] = $item['product_id'];
                }
                //query to lock products
                $check = Product::whereIn('id', $ids)->lockForUpdate()
                    ->get();
                if ($check->isEmpty()) {
                    return false;
                }
                foreach ($cartItems as $item) {
                    $product = Product::whereId($item['product_id'])->first();

                    $data = [
                        'order_id' => $order->id,
                        'product_id' => $item['product_id'],
                        'product_name' => $product->name,
                        'qty' => $item['qty'],
                        'price' => $product->price
                    ];

                    // Update item in product table
                    $update_product = $this->updateProduct($item['product_id'], $item['qty']);

                    // $productInfo = $this->getAmazonInventory($item['product_id']);
                    // if ($productInfo['status']) {
                    //  $this->updateAmazonInventory($productInfo, $item->quantity,'',false); // uncommit it when push to server
                    // }
                    OrderItem::create($data);
                }
            } else {
                foreach ($cartContent as $key => $item) {
                    # store product_id into ids variable...
                    $ids[] = $item->id;
                }
                //query to lock products
                $check = Product::whereIn('id', $ids)->lockForUpdate()
                    ->get();
                if ($check->isEmpty()) {
                    return false;
                }
                foreach ($cartContent as $item) {

                    $data = [
                        'order_id' => $order->id,
                        'product_id' => $item->id,
                        'product_name' => $item->name,
                        'qty' => $item->quantity,
                        'price' => $item->price
                    ];

                    // $productInfo = $this->getAmazonInventory($item->id);

                    // if ($productInfo['status']) {
                    //  $this->updateAmazonInventory($productInfo, $item->quantity,'',false); // uncommit it when push to server
                    // }

                    // Update item in product table
                    $update_product = $this->updateProduct($item->id, $item->quantity);

                    OrderItem::create($data);
                }
            }

            //saving address of order
            $OrderAddress = OrderShippingAddress::Create(
                [
                    'country' => $shippingAddreess['country'],
                    'full_name' => $shippingAddreess['full_name'],
                    'phone_number' => $shippingAddreess['phone_number'],
                    'email' => $shippingAddreess['email'] ?? null,
                    'address' => $shippingAddreess['address'],
                    'city' => $shippingAddreess['city'],
                    'state' => $shippingAddreess['state'],
                    'apartment' => $shippingAddreess['apartment'],
                    'zip_code' => $shippingAddreess['zip_code'],
                    $user_type == StatusEnum::USER ? 'user_id' : 'guest_id' => $user->id,       //user id or guest id
                    'user_type' => $user_type,
                    'order_id' => $order->id
                ]
            );

            $order = Order::find($order->id);

            return [
                "order" => $order,
                "OrderAddress" => $OrderAddress,
                'invoice_id' => $invoice->id

            ];
        } catch (Exception $e) {

            return response()->json(['error' => 'something went wrong child .' . $e]);
        }
    }

    //Invoice create
    protected function storeInvoice($payment_type, $data, $total_amount, $userId, $user_type, $user)
    {
        try {

            switch ($payment_type) {
                case StatusEnum::PAYMENTTYPEPAYPAL:
                    # Paypal data...
                    $payerID = $data['PayerID'];

                    $paymentType = StatusEnum::PAYMENTTYPEPAYPAL;

                    // $amount = $response['AMT'];

                    break;
                case StatusEnum::PAYMENTTYPESQUARE:
                    # Square data...
                    // $payerID = $response->getResult()->getPayment()->getId();

                    $paymentType = StatusEnum::PAYMENTTYPESQUARE;

                    // $amount = $response->getResult()->getPayment()->getApprovedMoney()->getAmount();
                    break;
                default:
                    # code...
                    break;
            }

            $invoice = [];

            $invoice['payment_type'] = $paymentType;
            $invoice[$user_type == StatusEnum::USER ? 'user_id' : 'guest_id'] = $user->id;          //user id or guest id
            $invoice['amount'] =  $total_amount;
            $invoice['status'] = StatusEnum::SUCCESS;
            $invoice = Invoice::create($invoice);

            return $invoice;
        } catch (Exception $e) {
            return false;
        }
    }

    //update product inventory
    public function updateProduct($product_id, $quantity)
    {
        $product = Product::whereId($product_id)->first();

        $totalQty = $product->quantity - $quantity;
        $updateProduct = $product->update(['quantity' => $totalQty]);

        return $updateProduct;
    }
}
