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
    public $files;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($jobTitle, $files)
    {
        $this->jobTitle = $jobTitle;
        $this->files = $files;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $email = $this->subject('New CV Submission for ' . $this->jobTitle . ' Position ')->view('emails.career-email');
        foreach ($this->files as $file) {
            $email->attach($file);
        }
    }
}
