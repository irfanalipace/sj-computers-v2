<?php

namespace App\Http\Controllers\Api\Blog;


use App\Http\Controllers\Api\BaseController;
use App\Models\Blog;
use App\Models\Brand;
use Illuminate\Http\Request;

class BlogController extends BaseController
{
    public function getList(request $request){
        $data= Blog::all();
        return $this->sendResponse($data);
    }
}
