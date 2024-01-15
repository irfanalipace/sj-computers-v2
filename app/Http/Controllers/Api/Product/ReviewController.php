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

    public function getProductReview(Request $request)
    {
        $getProductReview = $this->service->getProductReviews($request);
        
        return $this->sendResponse($getProductReview,'Successfully feteched Product reviews.');
    }

    public function createProductReview(StoreProductReview $request)
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

    /* Update product review */
    public function updateProductReview(Request $request,$id)
    {
        try{
          
            DB::beginTransaction();
            $storeProductReview = $this->service->updateProductReview($request,$id);

            DB::commit();
            return $this->sendResponse($storeProductReview,'Successfully product review updated.');
        } catch(ModelNotFoundException $e) {
            DB::rollBack();
            return $this->sendError('error','Product Review not found.');
        } catch(Exception $e) {
            DB::rollBack();
            return $this->sendError('error','Something went wrong ' . $e->getMessage());
        }
    }
}
