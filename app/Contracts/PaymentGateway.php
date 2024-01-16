<?php

namespace App\Contracts;

interface PaymentGateway
{
    public function charge($amount);
// Additional common methods for payment gateways
}
