<?php

namespace App\Services;

use App\Classes\StatusEnum;
use App\Models\ProductReview;
use App\Models\ProductReviewReport;
use App\Models\ProductStatistic;
use App\Repositories\ReviewRepository;
use Exception;
use Illuminate\Support\Facades\DB;

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
    public function getProductDetails($product_id,$request)
    {
        $with = ['productMedia:id,product_review_id,media_type,file_path','user:id,name,profile_pic,avatar','productReviewReport'];
        $review = ProductReview::where('product_id',$product_id)->with($with)->select('id','user_id','product_id','title','body','rating','created_at')->paginate($request->per_page ?? 10);

        $getHelpfulReview = ProductReviewReport::whereIn('product_review_id',  $review->pluck('id'))->get();

        $helpfulCount = $getHelpfulReview->where('status', StatusEnum::HELPFUL)->count();
        $reportCount = $getHelpfulReview->where('status', StatusEnum::REPORT)->count();

        $stats = ProductStatistic::where('product_id',$product_id)->select('product_id','statistics')->first();
        $details = [
            'product_review' => $review,
            'product_stats' => $stats,
            'total_helpful' => $helpfulCount,
            'total_report' => $reportCount
        ];

        return $details;
    }

    public function getReviewMedia($product_id)
    {
        $review = ProductReview::where('product_id',$product_id)->with('productMedia:id,product_review_id,media_type,file_path')->select('id')->get();
        if($review->isEmpty()){
            throw new Exception('Product Review not found');
        }
        return $review;
    }

    /* Store review report */
    public function storeReviewReports($request)
    {
        $buttonType = $request->button_type;

        $storeReview = ($buttonType == StatusEnum::HELPFUL) ? 'this is helpful' : implode(", ", $request->review_report);

        $reportData = [
            'product_review_id' => $request->product_review_id,
            'status' => $buttonType,
            'report' => $storeReview
        ];

        return $this->repository->storeReviewReport($reportData);
    }

    public function calculateReviewStatistics()
    {
       ProductReview::select('product_id', 'rating')
        ->get()
        ->map(function ($review) {
            // Round the rating to the nearest whole number
            $review->rating = round($review->rating);
            return $review;
        })
        ->groupBy('product_id')
        ->each(function ($reviews, $productId) {
            $totalReviews = $reviews->count();
            $ratingsCount = $reviews->groupBy('rating')
                ->mapWithKeys(function ($group, $rating) {
                    return [$rating => $group->count()];
                });

            $rateStatistics = [];
            for ($rating = 5; $rating >= 1; $rating--) {
                $rateStatistics[$rating] = $totalReviews > 0 ? round(($ratingsCount->get($rating, 0) / $totalReviews) * 100) : '0';
            }

             // Ensure overall_rating is calculated to a float with 1 decimal place, then format to 2 decimal places
            $overallRating = $totalReviews > 0 ? round($reviews->avg('rating'), 1) : 0;
            $rateStatistics['overall_rating'] = number_format($overallRating, 2);
            $rateStatistics['total_rating'] =  $totalReviews ?? 0;
            $rateStatistics['global_rating'] =  0;
            $statistics = [
                'rate' => $rateStatistics
            ];
            ProductStatistic::updateOrCreate(
                ['product_id' => $productId],
                ['statistics' => json_encode($statistics)]
            );
        });
        
        return true;
    }

    public function indexReviewReports()
    {
        return $this->repository->indexReviewReport();
    }

    public function showReviewReports($id)
    {
        return $this->repository->showReviewReport($id);
    }

}
