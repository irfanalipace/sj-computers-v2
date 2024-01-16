<?php

namespace App\Services;

use App\Contracts\PaymentGateway;

class PayPalGateway implements PaymentGateway
{
    public function charge($amount)
    {
        // Implement charging logic for PayPal
    }
}
