<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendShippedEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $order;
    public function __construct($order)
    {
        //
        $this->order = $order;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $email = (!empty($this->order['user'])) ?$this->order['user']['email'] : $this->order['guest']['email'];
        $order = $this->order;
        
        Mail::send('emails.order.customer-shipped', ['data' => $order], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to($email)->subject('Order Shipped.');
        });
    }
}
