<?php

namespace App\Jobs;

use App\Classes\StatusEnum;
use App\Models\Invoice;
use App\Models\Order;
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
        $items = [];
        Cart::session($this->userId)->getContent()->each(function ($item) use (&$items) {
            $items = ['item_id' => $item->id, 'item_name' => $item->name, 'item_qty' => $item->quantity];
        });
        $items['amount'] = Cart::session($this->userId)->getSubTotal();
        $items['user_id'] = 2;
        $items['invoice_id'] = $invoice->id;
        $items['status'] = StatusEnum::COMPLETE;
        Order::create($items);
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
        $invoice['user_id'] = 2;
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
