<?php

namespace App\Jobs;

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
    private $user, $cartData,$order;
    public function __construct($user, $cartData, $order)
    {
        $this->cartData = $cartData;
        $this->user = $user;
        $this->order = $order;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $order['orderDetail'] = $this->cartData;
        $order['userInfo'] = $this->user;
        $order['OrderAddress'] = $this->order['OrderAddress'];
        $order['order'] = $this->order['order'];
        //Email to customer
        $email = $this->user->email;
        $ccEmail = 'orders@sjcomputers.us';
        //order mail for customer
        Mail::send('emails.order.customer-order', ['data' => $order], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to($email)->subject('Order Placed.');
        });
        //order mail for adminFF
        Mail::send('emails.order.order-send-to-admin', ['data' => $order], function ($m) use ($email, $ccEmail) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to(config('mail.from.address'))->subject('Order Placed.');
            $m->cc($ccEmail);
        });
    }
}
