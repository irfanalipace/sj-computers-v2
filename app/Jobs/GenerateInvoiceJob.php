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
    public function __construct($data,$response,$userId)
    {
        $this->response = $response;
        $this->userId = $userId;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::info('Generate Invoice');
        //saving invoice for the payment
        $invoice = $this->storeInvoice();

        //saving order after invoice created
        $items = [];
        Cart::session($this->userId)->getContent()->each(function ($item) use (&$items) {
            $items = ['item_id' => $item->id,'item_name' => $item->name,'item_qty' => $item->quantity];
        });
        $items['amount'] = $this->response['AMT'];
        $items['user_id'] = 2;
        $items['invoice_id'] = $invoice->id;
        $items['status'] = StatusEnum::COMPLETE;
        Order::create($items);
       
    }

    protected function storeInvoice()
    {
        $invoice = [];
        $invoice['payer_id'] = $this->data['PayerID'];
        $invoice['payment_type'] = StatusEnum::PAYMENTTYPEPAYPAL;
        $invoice['user_id'] = 2;
        $invoice['amount'] = $this->response['AMT']; 
        $invoice['status'] = StatusEnum::PAYPALSUCCESS;
        $invoice = Invoice::create($invoice);
        return $invoice;
    }
}
