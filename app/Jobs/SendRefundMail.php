<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendRefundMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    private $user, $refund;

    public function __construct($user, $refund)
    {
        //
        $this->user = $user;
        $this->refund = $refund;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //

        $email = $this->user->email;
        $data = [
            'refund' => $this->refund,
            'user' => $this->user
        ];
        //order mail for customer
        Mail::send('emails.refund.customer-refund-order', ['data' => $data], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to($email)->subject('Refund Order.');
        });
        //order mail for admin
        Mail::send('emails.refund.refund-send-to-admin', ['data' => $data], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to(config('mail.from.address'))->subject('Redund Order.');
        });
    }
}
