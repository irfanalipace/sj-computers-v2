<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class CartReminderEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    private $cart, $user, $total, $subTotal;
    public function __construct($cart, $user, $total, $subTotal)
    {
        $this->cart = $cart;
        $this->user = $user;
        $this->total = $total;
        $this->subTotal = $subTotal;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $cart['items'] = $this->cart;
        $cart['user'] = $this->user;
        $cart['total'] = $this->total;
        $cart['subTotal'] = $this->subTotal;

        $email =  $this->user['email'];

        Mail::send('emails.order.cart-reminder', ['data' => $cart], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to($email)->subject('Cart Reminder.');
        });
    }
}
