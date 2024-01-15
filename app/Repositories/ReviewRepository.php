<?php

namespace App\Repositories;

use App\Classes\StatusEnum;
use App\Models\ProductReview;
use Illuminate\Http\Request;

class ReviewRepository
{
    protected $productReviewModel;
    public function __construct(ProductReview $reviewModel)
    {
        $this->productReviewModel = $reviewModel;
    }
    public function paginate(Request $request, $orderBy = [],)
    {
        $orderByKey = $orderBy['key'] ?? 'id';
        $orderByValue = $orderBy['value'] ?? 'desc';

        $query = $this->productReviewModel->query();

        return $query->orderBy($orderByKey, $orderByValue)
            ->paginate($request->input('per_page', 10));
    }

    public function store($request)
    {       
       
        $store = $this->productReviewModel->create(
            [
                'user_id' =>  $request->user_id ?? null,
                'guest_id' => $request->guest_id ?? null,
                'product_id' => $request->product_id,
                'body' => $request->body,
                'rating' => $request->rating
            ]
        );
       $this->uploadMedia($store,$request);
       
        return $store;
    }

    /* Update review  */
    public function update($request,$id)
    {
       $update = $this->productReviewModel->findOrFail($id);
       $update->update([
            'user_id' =>  $request->user_id ?? null,
            'guest_id' => $request->guest_id ?? null,
            'product_id' => $request->product_id,
            'body' => $request->body,
            'rating' => $request->rating
       ]);

       $this->uploadMedia($update,$request);
       return $update;
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
                $productReview->productMedia()->updateOrCreate(
                    ['id' => $request->media[$key]->id ?? null],
                    [
                        'product_review_id' => $productReview->id,
                        'media_type' => $request->media_type,
                        'file_name' => $file['file_name'],
                        'file_path' => asset('storage/' . $file['file_path']),
                    ]
                );
            }
        }
    }
}
