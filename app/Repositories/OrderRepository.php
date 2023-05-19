<?php

namespace App\Repositories;

use App\Classes\StatusEnum;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\OrderItem;
use App\Traits\Amazon\AmazonTrait;
use App\Jobs\GenerateInvoiceJob;
use App\Models\OrderShippingAddress;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderRepository
{
    use AmazonTrait;

    public function createOrder($data, $response, $userId, $user, $payment_type, $cartData, $cartContent = [], $shippingAddreess)
    {
        try {
            $data = DB::transaction(function () use ($data, $response, $userId, $user, $payment_type, $cartData, $cartContent, $shippingAddreess) {
                $invoice = $this->storeInvoice($payment_type, $data, $response, $userId);

                //saving order after invoice created
                $order = [];

                $order['total_amount'] = $cartData['total_amount'];
                $order['sub_total'] = $cartData['sub_total'];
                $order['user_id'] = $userId;
                $order['invoice_id'] = $invoice->id;
                $order['status'] = StatusEnum::COMPLETE;
                $order['shipment_price'] = $cartData['shipment_amount'];
                $order['shipment_days'] = $cartData['estimate_day'];
                $order['item_qty'] = $cartData['item_qty'];
                $order = Order::create($order);

                $cartContent->each(function ($item) use ($order) {
                    $data = [
                        'order_id' => $order->id,
                        'product_id' => $item->id,
                        'product_name' => $item->name,
                        'qty' => $item->quantity,
                        'price' => $item->price
                    ];
                    $productInfo = $this->getAmazonInventory($item->id);
                    // if ($productInfo['status']) {
                    //     $this->updateAmazonInventory($productInfo, $item->quantity);
                    // }
                    $order['orderItem'] =  OrderItem::create($data);
                });



                //saving address of order
                $OrderAddress = OrderShippingAddress::Create(['country' => $shippingAddreess['country'], 'full_name' => $shippingAddreess['full_name'], 'phone_number' => $shippingAddreess['phone_number'], 'address' => $shippingAddreess['address'], 'city' => $shippingAddreess['city'], 'state' => $shippingAddreess['state'], 'zip_code' => $shippingAddreess['zip_code'], 'user_id' => $userId, 'order_id' => $order->id]);

                $order = Order::find($order->id);

                return [
                    "order" => $order,
                    "OrderAddress" => $OrderAddress
                    
                ];
            });
            return $data;
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return $e;
        }
    }

    //Invoice create
    protected function storeInvoice($payment_type, $data, $response, $userId)
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
        $invoice['user_id'] = $userId;
        $invoice['amount'] =  $amount;
        $invoice['status'] = StatusEnum::SUCCESS;
        $invoice = Invoice::create($invoice);
        return $invoice;
    }

    //update amzaon inventory
    protected function updateAmazonInventory($productInfo, $qty)
    {

        $totalQuantity = (int) $productInfo['quantity'] - (int) $qty;
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://server5.sjops.us/api/inventory/data/update/Prod_05162023/',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode(array('SKU' => $productInfo['sku'], 'quantity' => $totalQuantity)),
            CURLOPT_HTTPHEADER => array(
                'apikey: 810f8ad0-8585-4845-9954-9a82bdbc18bc',
                'Content-Type: application/json',

            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return true;
    }
}
