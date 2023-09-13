<?php

namespace App\Repositories;

use App\Classes\StatusEnum;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\OrderItem;
use App\Traits\Amazon\AmazonTrait;
use App\Jobs\GenerateInvoiceJob;
use App\Models\OrderShippingAddress;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderRepository
{
    use AmazonTrait;

    public function createOrder($data, $response, $userId, $user, $payment_type, $cartData, $cartContent = [], $shippingAddreess, $user_type, $cartItems = [])
    {
        try {
            $data = DB::transaction(function () use ($data, $response, $userId, $user, $payment_type, $cartData, $cartContent, $shippingAddreess, $user_type, $cartItems) {
                $invoice = $this->storeInvoice($payment_type, $data, $response, $userId, $user_type, $user);

                //saving order after invoice created
                $order = [];
                // dd($cartContent, $cartData, $cartItems);
                $order['total_amount'] = $cartData['total_amount'];
                $order['sub_total'] = $cartData['sub_total'];
                $order[$user_type == StatusEnum::USER ? 'user_id' : 'guest_id'] = $user->id;          //user id or guest id
                $order['invoice_id'] = $invoice->id;
                $order['status'] = StatusEnum::COMPLETE;
                $order['shipment_price'] = $cartData['shipment_amount'];
                $order['shipment_days'] = $cartData['estimate_day'];
                $order['item_qty'] = $cartData['item_qty'];
                $order = Order::create($order);

                if ($user_type == StatusEnum::GUEST) {
                    foreach ($cartItems as $item) {
                        $product = Product::whereId($item['product_id'])->first();
                        $data = [
                            'order_id' => $order->id,
                            'product_id' => $item['product_id'],
                            'product_name' => $product->name,
                            'qty' => $product->quantity,
                            'price' => $product->price
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

                    $cartContent->each(function ($item) use ($order) {
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
                        $this->updateProduct($item->id, $item->quantity);
                        OrderItem::create($data);
                    });
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
                        'zip_code' => $shippingAddreess['zip_code'],
                        $user_type == StatusEnum::USER ? 'user_id' : 'guest_id' => $user->id,       //user id or guest id
                        'user_type' => $user_type,
                        'order_id' => $order->id
                    ]
                );

                $order = Order::find($order->id);

                return [
                    "order" => $order,
                    "OrderAddress" => $OrderAddress

                ];
            });

            DB::commit();
            return $data;
        } catch (Exception $e) {
            DB::rollBack();
            return $e;
        }
    }

    //Invoice create
    protected function storeInvoice($payment_type, $data, $response, $userId, $user_type, $user)
    {

        switch ($payment_type) {
            case StatusEnum::PAYMENTTYPEPAYPAL:
                # Paypal data...
                $payerID = $data['PayerID'];

                $paymentType = StatusEnum::PAYMENTTYPEPAYPAL;

                $amount = $response['AMT'];

                break;
            case StatusEnum::PAYMENTTYPESQUARE:
                # Square data...
                $payerID = $response->getResult()->getPayment()->getId();

                $paymentType = StatusEnum::PAYMENTTYPESQUARE;

                $amount = $response->getResult()->getPayment()->getApprovedMoney()->getAmount();
                break;
            default:
                # code...
                break;
        }

        $invoice = [];
        $invoice['payer_id'] = $payerID;
        $invoice['payment_type'] = $paymentType;
        $invoice[$user_type == StatusEnum::USER ? 'user_id' : 'guest_id'] = $user->id;          //user id or guest id
        $invoice['amount'] =  $amount;
        $invoice['status'] = StatusEnum::SUCCESS;
        $invoice = Invoice::create($invoice);

        return $invoice;
    }

    //update product inventory
    public function updateProduct($productID, $quantity)
    {
        $product = Product::whereId($productID)->first();
        $totalQty = $product->quantity - $quantity;
        $updateProduct = $product->update(['quantity' => $totalQty]);
        return $updateProduct;
    }
}
