<?php

namespace App\Providers;

use App\Models\Guest;
use App\Models\Order;
use App\Providers\RegisterUser;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class StoreUserInOrder
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param \App\Providers\RegisterUser $event
     * @return void
     */
    public function handle(RegisterUser $event)
    {
        $guestUser = Guest::query()->where('email', '=', $event->user->email)->first();

        if ($guestUser) {
            Order::query()->where('guest_id', '=', $guestUser->id)->update([
                'user_id' => $event->user->id
            ]);
        }
    }
}
