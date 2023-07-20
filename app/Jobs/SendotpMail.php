<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Mail\LoginOtpMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendotpMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $email, $otp, $type;
    public function __construct($email, $otp, $type = [])
    {
        //       
        $this->otp = $otp;
        $this->email = $email;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->email)->send(new LoginOtpMail($this->otp, $this->type));
    }
}
