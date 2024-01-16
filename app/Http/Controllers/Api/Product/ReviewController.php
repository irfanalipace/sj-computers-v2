<?php

namespace App\Http\Controllers\Api\Product;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Product\StoreProductReview;
use App\Services\ReviewService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends BaseController
{
    protected $service;
    public function __construct(ReviewService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $getProductReview = $this->service->getProductReviews($request);
        
        return $this->sendResponse($getProductReview,'Successfully feteched Product reviews.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductReview $request)
    {
        try{
            DB::beginTransaction();
            $storeProductReview = $this->service->storeProductReview($request);

            DB::commit();
            return $this->sendResponse($storeProductReview,'Successfully product review created.');
        } catch(Exception $e) {
            DB::rollBack();
            return $this->sendError('error','Something went wrong ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    { 
        try{       
            $getProductReview = $this->service->specificProductReview($id);

            return $this->sendResponse($getProductReview,'Successfully fetched detail of product review.');
        } catch(ModelNotFoundException $e) {
            DB::rollBack();
            return $this->sendError('error','Product Review not found.');
        } catch(Exception $e) {
        DB::rollBack();
        return $this->sendError('error','Something went wrong ' . $e->getMessage());
    }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{          
            
            DB::beginTransaction();
            $updateProductReview = $this->service->updateProductReview($request,$id);

            DB::commit();
            return $this->sendResponse($updateProductReview,'Successfully product review updated.');
        } catch(ModelNotFoundException $e) {
            DB::rollBack();
            return $this->sendError('error','Product Review not found.');
        } catch(Exception $e) {
            DB::rollBack();
            return $this->sendError('error','Something went wrong ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function destroy($id)
    // {
    //     //
    // }
}
