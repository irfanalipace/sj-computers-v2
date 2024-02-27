<?php

namespace App\Repositories;

use App\Classes\StatusEnum;
use App\Models\Subscriber;
use Exception;

class NewsLetterRepository
{
    /* Store Subscribe */
    public function storeSubscriber($email)
    {       
       return Subscriber::create([
            'email' => $email,
            'is_subscribe' => 1, 
        ]);
    }

    /* check email if exist in subscribe */
    public function findSubscriberByEmail($email)
    {
       $checkSubscriber = Subscriber::where('email',$email)->first();
      
        if(isset($checkSubscriber) && $checkSubscriber->exists && $checkSubscriber->is_subscribe == 1) {
            throw new Exception('Email already Subscribe.');
        } elseif(isset($checkSubscriber) && $checkSubscriber->is_subscribe == 1) {
            $checkSubscriber = true;
        }
        return $checkSubscriber;
    }

    /* update subscribe status */
    public function updateSubscribe($email)
    {
        return Subscriber::where('email',$email)->update([
            'is_subscribe' => 1, 
        ]);
    }
}
