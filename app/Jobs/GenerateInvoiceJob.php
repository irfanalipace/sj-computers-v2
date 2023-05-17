<?php

namespace App\Jobs;

use App\Classes\StatusEnum;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Traits\Amazon\AmazonTrait;

class GenerateInvoiceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels,AmazonTrait;
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

            OrderItem::create($data);
        });

        $order['userInfo'] = $this->user;
        //Email to customer
        $email = $this->user->email;
        Mail::send('emails.customer-order', ['data' => $order], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to($email)->subject('Order Placed.');
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
