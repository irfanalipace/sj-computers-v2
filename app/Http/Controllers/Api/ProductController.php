<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product;
use Illuminate\Http\Request;

class ProductController extends BaseController
{
    public function getList(request $request){
        $data= Product::all();
        $this->sendResponse($data);
    }

}
