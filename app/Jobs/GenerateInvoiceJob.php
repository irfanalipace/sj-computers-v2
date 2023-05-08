<?php

namespace App\Jobs;

use App\Classes\StatusEnum;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\OrderItem;
use Cart;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

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
    private $userId;
    public $payment_type;
    public function __construct($data, $response, $userId, $payment_type)
    {
        $this->response = $response;
        $this->userId = $userId;
        $this->data = $data;
        $this->payment_type = $payment_type;
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
//        Cart::session($this->userId)->getContent()->each(function ($item) use (&$items) {

        $order['total_amount'] = Cart::session($this->userId)->getSubTotal();
        $order['sub_total'] = Cart::session($this->userId)->getSubTotal();
        $order['shipment_price'] = '';
        $order['shipment_days'] = '';
        $order['user_id'] = $this->userId;
        $order['invoice_id'] = $invoice->id;
        $order['status'] = StatusEnum::COMPLETE;
        $order['item_qty'] = '';
        $order = Order::create($order);

        Cart::session($this->userId)->getContent()->each(function ($item) use ($order) {
            $item = [
                'order_id' => $order->id,
                'product_id' => $item->id,
                'product_name' => $item->name,
                'qty' => $item->quantity,
                'price' => $item->price
            ];

            OrderItem::create($item);
        });

        $this->clearCartItems();
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
    //After Successfull payment cart items cleared
    protected function clearCartItems()
    {
        $cart = Cart::session($this->userId)->clear();
        return  $cart;
    }
}
