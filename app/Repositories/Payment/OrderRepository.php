<?php

namespace App\Repositories\Payment;

use App\Models\Guest;

class OrderRepository
{
    public function getOrCreateGuestUser($data)
    {
        $guestUser = Guest::where('email', $data['email'])->first();
          // If the guest user does not exist, create a new one
        if (!$guestUser) {
            $guestUser = new Guest();
            $guestUser->ip_address = request()->ip();
            $guestUser->full_name = $detail['full_name'] ?? null;
            $guestUser->phone_number = $detail['phone_number'] ?? null;
            $guestUser->email = $data['email'];
            $guestUser->address = $detail['address'] ?? null;
            $guestUser->city = $detail['city'] ?? null;
            $guestUser->state = $detail['state'] ?? null;
            $guestUser->zip_code = $detail['zip_code'] ?? null;
            $guestUser->country = $detail['country'] ?? null;
            $guestUser->apartment = $detail['apartment'] ?? null;
            $guestUser->save();
        }

        return $guestUser;
    }
}