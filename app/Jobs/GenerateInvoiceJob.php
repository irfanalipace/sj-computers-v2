<?php

namespace App\Jobs;

use App\Classes\StatusEnum;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Cart;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class GenerateInvoiceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $data;
    public $response;
    private $user;
    private $userId;
    public $payment_type;

    public $cartData;

    public $cartContent;
    public function __construct($data, $response, $userId, $user, $payment_type, $cartData, $cartContent = [])
    {
        $this->response = $response;
        $this->userId = $userId;
        $this->data = $data;
        $this->payment_type = $payment_type;
        $this->cartData = $cartData;
        $this->cartContent = $cartContent;
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        //saving invoice for the payment
        $invoice = $this->storeInvoice();

        //saving order after invoice created
        $order = [];

        $order['total_amount'] = $this->cartData['total_amount'];
        $order['sub_total'] = $this->cartData['sub_total'];
        $order['user_id'] = $this->userId;
        $order['invoice_id'] = $invoice->id;
        $order['status'] = StatusEnum::COMPLETE;
        $order['shipment_price'] = $this->cartData['shipment_amount'];
        $order['shipment_days'] = $this->cartData['estimate_day'];
        $order['item_qty'] = $this->cartData['item_qty'];
        $order = Order::create($order);

        $this->cartContent->each(function ($item) use ($order) {
            $item = [
                'order_id' => $order->id,
                'product_id' => $item->id,
                'product_name' => $item->name,
                'qty' => $item->quantity,
                'price' => $item->price
            ];
            $producttInfo = $this->getAmazonInventory($item->id);
            if($producttInfo['status']){
                $this->updateAmazonInventory($producttInfo, $item->quantity);
            }
            

            OrderItem::create($item);
        });
        $order['userInfo'] = $this->user;
        //Email to customer
        $email = $this->user->email;
        Mail::send('emails.customer-order', ['data' => $order], function ($m) use ($email) {
            $m->from(env('MAIL_FROM_ADDRESS'), config('app.name', 'APP Name'));
            $m->to("hariskh5512@gmail.com")->subject('Order Placed.');
        });
    }
    //Invoice create
    protected function storeInvoice()
    {
        switch ($this->payment_type) {
            case StatusEnum::PAYMENTTYPEPAYPAL:
                # Paypal data...
                $payerID = $this->data['PayerID'];

                $paymentType = StatusEnum::PAYMENTTYPEPAYPAL;

                $amount = $this->response['AMT'];

                break;
            case StatusEnum::PAYMENTTYPESQUARE:
                # Square data...
                $payerID = $this->response->getResult()->getPayment()->getId();

                $paymentType = StatusEnum::PAYMENTTYPESQUARE;

                $amount = $this->response->getResult()->getPayment()->getApprovedMoney()->getAmount();
                break;
            default:
                # code...
                Log::info('something went wrong.');
                break;
        }
        $invoice = [];
        $invoice['payer_id'] = $payerID;
        $invoice['payment_type'] = $paymentType;
        $invoice['user_id'] = $this->userId;
        $invoice['amount'] =  $amount;
        $invoice['status'] = StatusEnum::SUCCESS;
        $invoice = Invoice::create($invoice);
        return $invoice;
    }

    protected function getAmazonInventory($productId)
    {
        $status = false;
        $quantity = 0;
        $product = Product::find($productId);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://server5.sjops.us/api/inventory/data/get/Prod_05162023/',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode(array('SKU' => $product->sku)),
            CURLOPT_HTTPHEADER => array(
                'apikey: 810f8ad0-8585-4845-9954-9a82bdbc18bc',
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $response = json_decode($response, true);
        if(isset($response['message']) && !empty($response['message'])){

            $data = json_decode($response['message'], true);
            $quantity = (int) $data['attributes']['fulfillment_availability'][0]['quantity'];
            $status = true;
        }
        
        return [
            'sku' => $product->sku ?? '',
            'quantity' => $quantity ,
            'status' => $status
        ];
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
