<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CareerApplicationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $jobTitle;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($jobTitle)
    {
        $this->jobTitle = $jobTitle;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        //        return $this->view('view.name');
        return $this->subject('New CV Submission for ' . $this->jobTitle . ' Position ')->view('emails.career-email');
    }
}
