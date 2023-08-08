<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LoginOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otp, $type;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($otp, $type)
    {

        $this->otp = $otp;
        $this->type = $type;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        //        return $this->view('view.name');
        return $this->subject('Verify OTP Code')->view('emails.otp');
    }
}
