<?php

namespace App\Services;

use App\Contracts\PaymentGateway;

class SquareGateway implements PaymentGateway
{
    public function charge($amount)
    {
        // Implement charging logic for Stripe
    }
}
