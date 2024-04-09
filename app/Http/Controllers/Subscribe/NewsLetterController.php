<?php

namespace App\Http\Controllers\Subscribe;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Subscribe\SubscribeRequest;
use App\Jobs\SubscribeNewsLatterJob;
use App\Services\NewsLetterService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            DB::beginTransaction();
            $subscribe = $this->service->subscribeNewsletter($request);
            SubscribeNewsLatterJob::dispatch($subscribe);
            DB::commit();
            return $this->sendResponse($subscribe,'Successfully Subscribe your Email.');
        } catch(Exception $e){
            DB::rollBack();
            return $this->sendError('error','Something went wrong '.$e->getMessage());
        }
    }
}
