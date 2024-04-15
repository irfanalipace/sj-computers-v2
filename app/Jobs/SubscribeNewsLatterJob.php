<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SubscribeNewsLatterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    private $subscribe;
    public function __construct($subscribe)
    {
        $this->subscribe = $subscribe;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $subscribe = $this->subscribe;
        $email = $subscribe->email;

        Mail::send('emails.subscription.subscribe-newslatter', ['data' => $subscribe], function ($m) use ($email) {
            $m->from(config('mail.from.address'), config('app.name', 'APP Name'));
            $m->to($email)->subject('Subscription Confirmed.');
        });
    }
}
