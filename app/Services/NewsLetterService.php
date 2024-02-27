<?php

namespace App\Services;

use App\Repositories\NewsLetterRepository;

class NewsLetterService
{

    protected $repository;
    public function __construct(NewsLetterRepository $repository)
    {
        $this->repository = $repository;
    }

    public function subscribeNewsletter($request)
    {
        $email = $request->input('email');
        /* check email if subcribe or not */
       $checkSubscriber = $this->repository->findSubscriberByEmail($email);
       
        if(isset($checkSubscriber) && $checkSubscriber == true){     
           return $this->repository->updateSubscribe($email);
        }       
     
        return $this->repository->storeSubscriber($email);
    }
}