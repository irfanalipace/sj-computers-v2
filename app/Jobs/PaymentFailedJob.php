<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class PaymentFailedJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    private $order, $errorMessage;
    public function __construct($order, $errorMessage)
    {
        $this->order = $order;
        $this->errorMessage = $errorMessage;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $order['order'] = $this->order['order']->toArray();
        $order['ErrorMessage'] = $this->errorMessage;

        //Email to customer
        $email = $order['order']['user']['email'];
//        $ccEmail = 'orders@sjcomputers.us';

        Mail::send('emails.payment.payment-failed', ['data' => $order], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to($email)->subject('Payment Canceled.');
        });

//        Mail::send('emails.order.order-send-to-admin', ['data' => $order], function ($m) use ($email, $ccEmail) {
//            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
//            $m->to(config('mail.from.address'))->subject('Order Placed.');
//            $m->cc($ccEmail);
//        });
    }
}
