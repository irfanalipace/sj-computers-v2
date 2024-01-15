<?php

namespace App\Services;

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
       return $store;
    }

    public function updateProductReview($request,$id)
    {
        $update = $this->repository->update($request,$id);
        return $update;
    }
}
