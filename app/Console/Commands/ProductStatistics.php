<?php

namespace App\Console\Commands;

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
        ProductReview::select('product_id', 'rating')
            ->get()
            ->groupBy('product_id')
            ->each(function ($reviews, $productId) {
                $totalReviews = $reviews->count();
                $ratingsCount = $reviews->groupBy('rating')
                    ->mapWithKeys(function ($group, $rating) {
                        return [$rating => $group->count()];
                    });

                $rateStatistics = [];
                for ($rating = 5; $rating >= 1; $rating--) {
                    $rateStatistics[$rating] = $totalReviews > 0 ? round(($ratingsCount->get($rating, 0) / $totalReviews) * 100) . '%' : '0%';
                }

                $rateStatistics['overall_rate'] = $totalReviews > 0 ? round($reviews->avg('rating'), 1) : '0';
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
}
