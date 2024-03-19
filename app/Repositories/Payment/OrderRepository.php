<?php

namespace App\Repositories\Payment;

use App\Classes\StatusEnum;
use App\Models\Guest;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderShippingAddress;
use App\Models\Product;
use App\Models\UserAddress;
use Cart;
use Exception;

class OrderRepository
{
    public function getOrCreateGuestUser($data)
    {
        $guestUser = Guest::where('email', $data['email'])->first();
          // If the guest user does not exist, create a new one
        if (!$guestUser) {
            $guestUser = new Guest();
            $guestUser->ip_address = request()->ip();
            $guestUser->full_name = $data['full_name'] ?? null;
            $guestUser->phone_number = $data['phone_number'] ?? null;
            $guestUser->email = $data['email'];
            $guestUser->address = $data['address'] ?? null;
            $guestUser->city = $data['city'] ?? null;
            $guestUser->state = $data['state'] ?? null;
            $guestUser->zip_code = $data['zip_code'] ?? null;
            $guestUser->country = $data['country'] ?? null;
            $guestUser->apartment = $data['apartment'] ?? null;
            $guestUser->save();
        }
       
        return $guestUser;
    }

    /* Create order */
    public function createOrder($data, $userId, $user, $payment_type, $cartData, $cartContent = [], $shippingAddreess, $user_type, $cartItems = [],$isBuyNow = false)
    {
       
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
                throw new Exception('product is not found.');
            }
            foreach ($cartItems as $item) {
                $product = Product::whereId($item['product_id'])->first();
                
                $data = [
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'product_name' => $product->name,
                    'qty' => $item['qty'],
                    'price' => $product->price,
                    'protective_price' => $item['attributes']['protective_price'] ?? null,
                    'protective_plan_id' => $item['attributes']['protective_id'] ?? null
                ];

                // Update item in product table
                $this->updateProduct($item['product_id'], $item['qty']);

                // $productInfo = $this->getAmazonInventory($item['product_id']);
                // if ($productInfo['status']) {
                //  $this->updateAmazonInventory($productInfo, $item->quantity,'',false); // uncommit it when push to server
                // }
                OrderItem::create($data);
            }
        } else {
            if($isBuyNow){
                $ids[] = $cartContent['id'];
                 //query to lock products
                 $check = Product::whereIn('id', $ids)->lockForUpdate()
                 ->get();
                if ($check->isEmpty()) {
                    throw new Exception('product is not found.');
                }
                $data = [
                    'order_id' => $order->id,
                    'product_id' => $cartContent['id'],
                    'product_name' => $cartContent['name'],
                    'qty' => $cartContent['quantity'],
                    'price' => $cartContent['price'],
                    'protective_price' => $cartContent['attributes']['protective_price'] ?? null,
                    'protective_plan_id' => $cartContent['attributes']['protective_id'] ?? null
                ];
                $this->updateProduct($cartContent['id'], $cartContent['quantity']);

                OrderItem::create($data);            
            } else {
                foreach ($cartContent as $key => $item) {
                    # store product_id into ids variable...
                    $ids[] = $item->id;
                }
                //query to lock products
                $check = Product::whereIn('id', $ids)->lockForUpdate()
                    ->get();
                if ($check->isEmpty()) {
                    throw new Exception('product is not found.');
                }
                foreach ($cartContent as $item) {

                    $data = [
                        'order_id' => $order->id,
                        'product_id' => $item->id,
                        'product_name' => $item->name,
                        'qty' => $item->quantity,
                        'price' => $item->price,
                        'protective_price' => $item['attributes']['protective_price'] ?? null,
                        'protective_plan_id' => $item['attributes']['protective_id'] ?? null
                    ];

                    // $productInfo = $this->getAmazonInventory($item->id);

                    // if ($productInfo['status']) {
                    //  $this->updateAmazonInventory($productInfo, $item->quantity,'',false); // uncommit it when push to server
                    // }

                    // Update item in product table
                $this->updateProduct($item->id, $item->quantity);

                    OrderItem::create($data);            
                }
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
                'apartment' => $shippingAddreess['apartment'] ?? null,
                'zip_code' => $shippingAddreess['zip_code'],
                ($user_type == StatusEnum::USER) ? 'user_id' : 'guest_id' => $user->id,       //user id or guest id
                'user_type' => $user_type,
                'order_id' => $order->id
            ]
        );

        if(isset($shippingAddreess['permanent_address']) && $shippingAddreess['permanent_address'] == true && $user_type == StatusEnum::USER){
            UserAddress::updateOrCreate(
                ['user_id' =>  $user->id ],
                [
                'country' => $shippingAddreess['country'],
                'full_name' => $shippingAddreess['full_name'],
                'phone_number' => $shippingAddreess['phone_number'],
                'address' => $shippingAddreess['address'],
                'city' => $shippingAddreess['city'],
                'state' => $shippingAddreess['state'],
                'apartment' => $shippingAddreess['apartment'] ?? null,
                'zip_code' => $shippingAddreess['zip_code'],
                'user_id' => $user->id, 
                'status' => StatusEnum::ACTIVE,
            ]);
        }
        $order = Order::find($order->id);

        return [
            "order" => $order,
            "OrderAddress" => $OrderAddress,
            'invoice_id' => $invoice->id

        ];
    }

    //Invoice create
    protected function storeInvoice($payment_type, $data, $total_amount, $userId, $user_type, $user)
    {
        try {
            
            switch ($payment_type) {
                case StatusEnum::PAYMENTTYPEPAYPAL:
                    # Paypal data...
                    // $payerID = $data['PayerID'];

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
           throw new Exception($e->getMessage());
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

    /*  check product quantity run time */
    public function checkProduct($cart_items,$userId,$userType,$isBuyNow = false)
    {        
       
        $data = [];
        $cart = \Cart::session($userId);
        
        if($isBuyNow){
            $product_id = ($userType == StatusEnum::GUEST) ? $cart_items['product_id'] : $cart_items['id'];
            $quantity = ($userType == StatusEnum::GUEST) ? $cart_items['qty'] : $cart_items['quantity'];
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
        } else {
        
            foreach ($cart_items as $value) {
                # code...
                
                $product_id = ($userType == StatusEnum::GUEST) ? $value['product_id'] : $value['id'];
                $quantity = ($userType == StatusEnum::GUEST) ? $value['qty'] : $value['quantity'];
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
        }
        return $data;
    }
}