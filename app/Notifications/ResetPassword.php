<?php
namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;

class ResetPassword extends BaseResetPassword
{
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

