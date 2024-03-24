<?php

namespace App\Console\Commands;

use App\Classes\StatusEnum;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\ProductStatistic;
use Illuminate\Console\Command;

class ProductStatistics extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'product-statistics';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creat Product statistics';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
       $product = Product::withoutGlobalScopes()->get();
       $requestsCount = 0; // Initialize a variable to count requests
       
       foreach ($product as $key => $value) {
        # code...
           $response = $this->curlResponse($value->asin);
           $json_decode = json_decode($response);
            
           if(is_object($json_decode) && property_exists($json_decode,'data') && $json_decode->data != null){
            $this->storeReviews($json_decode->data->reviews,$value->id);
           }        
         
           $requestsCount++;

           // Check if 1 requests have been made
           if ($requestsCount % 1 === 0) {
               sleep(5); 
           }  
           echo "product ". $value->id ."\n";
       }
        
        // echo $response;
        
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

    /* Curl Response */
    private function curlResponse($asin)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://reviews.sjcomputers.us/scrape-asin-reviews',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
            "asin":"'.$asin.'"
        }',
        CURLOPT_HTTPHEADER => array(
            'key: k___y90h8hkb8hf5g9139gg323varju000fe',
            'Content-Type: application/json'
        ),
        ));
       
        $response = curl_exec($curl);
        curl_close($curl);
        return  $response;
    }

    private function storeReviews($reviews,$productId)
    {
        foreach ($reviews as $review) {
            
            # store reviews in product reviews...
           $productReview = ProductReview::updateOrCreate(
            ['author'=> $review->author],
            [
                'product_id' => $productId,
                'author' => $review->author,
                'title' => $review->title,
                'body' => $review->text,
                'rating' => $review->rating,
                'status' => ($review->verified == true) ? StatusEnum::ACTIVE : StatusEnum::INACTIVE
            ]
            );
            
             /* store media url in product media */
            if(property_exists($review, 'image_urls')){
                foreach ($review->image_urls as $url) {
                    $productReview->productMedia()->updateOrCreate(
                        ['product_review_id' => $productReview->id],
                        [
                            'product_review_id' => $productReview->id,
                            'media_type' => "image",
                            'file_path' => $url
                        ]
                    );
                }
            }   
        }
    }
}
