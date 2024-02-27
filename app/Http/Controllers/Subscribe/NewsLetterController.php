<?php

namespace App\Http\Controllers\Subscribe;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Subscribe\SubscribeRequest;
use App\Services\NewsLetterService;
use Exception;
use Illuminate\Http\Request;

class NewsLetterController extends BaseController
{
    protected $service;
    public function __construct(NewsLetterService $service)
    {
        $this->service = $service;
    }

    public function subscription(SubscribeRequest $request)
    {
        try{           
            $subscribe = $this->service->subscribeNewsletter($request);
            return $this->sendResponse($subscribe,'Successfully Subscribe your Email.');
        } catch(Exception $e){
            return $this->sendError('error','Something went wrong '.$e->getMessage());
        }
    }
}
