<?php

namespace App\Jobs;

use App\Classes\StatusEnum;
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
    private $user, $cartData,$order,$paymentType,$userType;
    public function __construct($user, $cartData, $order,$paymentType,$userType)
    {
        $this->cartData = $cartData;
        $this->user = $user;
        $this->order = $order;
        $this->paymentType = $paymentType;
        $this->userType = $userType;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Now, modify the initial code to integrate this change
        $order['orderDetail'] = $this->cartData;
        $order['OrderAddress'] = $this->order['OrderAddress']->toArray();
        $order['order'] = $this->order['order']->toArray();

        if ($this->paymentType == StatusEnum::PAYMENTTYPEPAYPAL ) {
            $userInfoForPayPal = [
                'id' => $this->user->id,
                'name' => ($this->userType == StatusEnum::GUEST) ? $this->user->full_name : $this->user->name,
                'email' => $this->user->email,
                // Add more fields as required
            ];
            // Use the transformed userInfo for PayPal
            $order['userInfo'] = $userInfoForPayPal;
        } else {
            // Assuming you want to keep the original object format for other payment types
            $order['userInfo'] = $this->user;
        }

        //Email to customer
        $email = $this->user->email;
        $ccEmail = 'orders@sjcomputers.us';
        //order mail for customer

        Mail::send('emails.order.customer-order', ['data' => $order], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to($email)->subject('Order Placed.');
        });
        Mail::send('emails.order.order-send-to-admin', ['data' => $order], function ($m) use ($email, $ccEmail) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to(config('mail.from.address'))->subject('Order Placed.');
            $m->cc($ccEmail);
        });
        Mail::send('emails.order.thank-you-page', ['data' => $order], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to(config($email))->subject('Thank you for Purchase.');
        });
    }
}
