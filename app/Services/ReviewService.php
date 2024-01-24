<?php

namespace App\Services;

use App\Models\ProductReview;
use App\Models\ProductStatistic;
use App\Repositories\ReviewRepository;

class ReviewService
{
    protected $repository;
    public function __construct(ReviewRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getProductReviews($request)
    {
        return $this->repository->paginate($request);
    }

    public function storeProductReview($request)
    {      
       $store = $this->repository->store($request);  
       $this->uploadMedia($store,$request);
       return $store;
    }

    private function uploadMedia($productReview,$request)
    {
       
        $media = $request->hasFile('media') ?? '';
        if($media) {
            $productReviewMedia = $request->file('media');

            // Ensure $productReviewMedia is always a collection
            if (!is_array($productReviewMedia)) {
                $productReviewMedia = [$productReviewMedia];
            }
            
            foreach ($productReviewMedia as $key => $file) {
                $directory = 'uploads/productReviews';
                $file = uploadMediaStorage($file,$directory);
                $this->repository->createProductMedia($file,$request,$productReview);               
            }
        }
    }

    /* update product review */
    public function updateProductReview($request,$id)
    {
        $update = $this->repository->update($request,$id);

        $this->uploadMedia($update,$request);
        return $update;
    }

    /* show detail of product review */
    public function specificProductReview($id)
    {
        $with = ['productMedia:id,product_review_id,media_type,file_path','user:id,name'];
        return $this->repository->show($id,$with );
    }
    
    /* Show detials with media and statistics */
    public function getProductDetails($product_id)
    {
        $with = ['productMedia:id,product_review_id,media_type,file_path','user:id,name'];
        $review = ProductReview::where('product_id',$product_id)->with('productMedia:id,product_review_id,media_type,file_path','user:id,name')->select('id','user_id','product_id','title','body','rating')->first();
        $stats = ProductStatistic::where('product_id',$product_id)->select('product_id','statistics')->first();
        $details = [
            'product_detail' => $review,
            'product_stats' => $stats
        ];
       
        return $details;
    }
}
