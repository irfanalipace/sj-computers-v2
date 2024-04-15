<?php

namespace App\Jobs;

use App\Classes\StatusEnum;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class OrderPlacedEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $user;
    protected $orderData;
    protected $paymentType;
    protected $order;
    protected $userType;

    public function __construct($user, $orderData, $paymentType, $order, $userType)
    {
        $this->user = $user;
        $this->orderData = $orderData;
        $this->paymentType = $paymentType;
        $this->order = $order;
        $this->userType = $userType;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $AdminEmail = 'orders@sjcomputers.us';

        // Now, modify the initial code to integrate this change
        $order['OrderDetail'] = $this->orderData;
        $order['PaymentType'] = $this->paymentType;
//        $order['Order'] = $this->order['order']->toArray();

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

//        dd($order);
        Mail::send('emails.order.order-placed', ['data' => $order], function ($m) use ($AdminEmail) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to($AdminEmail)->subject('Order Placed.');
        });
    }
}
