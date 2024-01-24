<?php

namespace App\Contracts;

interface PaymentGateway {
    
    public function processPayment($request);
}