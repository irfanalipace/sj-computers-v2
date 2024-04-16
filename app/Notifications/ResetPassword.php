<?php
namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPassword extends BaseResetPassword
{
    public function toMail($notifiable)
    {
        $url = $this->resetUrl($notifiable);
        $name = $notifiable->name;

        return (new MailMessage())
            ->subject('Reset Password')
            ->view('auth.reset_password', [
                'actionUrl' => $url,
                'name' => $name
            ]);
    }
    protected function resetUrl($notifiable)
    {

        // Customize the URL generation logic here
//        return url('/password/reset?token=' . $this->token . '&email=' . urlencode($notifiable->getEmailForPasswordReset()));
        $path = 'https://sjcomputers.us';
        $token = $this->token;
        $email = urlencode($notifiable->getEmailForPasswordReset());
        return $path . '/forgot_password?token=' . $token . '&email=' . $email;
    }
}

