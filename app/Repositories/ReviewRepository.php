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
       
        return $store;
    }

    /* save path of product review */
    public function createProductMedia($file,$request,$productReview)
    {
       
        $productReview->productMedia()->updateOrCreate(
            ['id' => $request->media->id ?? null],
            [
                'product_review_id' => $productReview->id,
                'media_type' => $request->media_type,
                'file_name' => $file['file_name'],
                'file_path' => $file['file_path'],
            ]
        );
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
       return $update;
    }

    public function show($id,$with = [])
    {
        $query = $this->productReviewModel->query();
        return $query->with($with)->findOrFail($id);
    }
}
