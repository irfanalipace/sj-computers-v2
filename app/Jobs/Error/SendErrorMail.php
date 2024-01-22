<?php

namespace App\Jobs\Error;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendErrorMail implements ShouldQueue
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
          //order mail for admin
          Mail::send('emails.order.error.error-order-admin', ['data' => $order], function ($m) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to(config('mail.from.address'))->subject('Error in Order Placed.');
        });
    }
}
