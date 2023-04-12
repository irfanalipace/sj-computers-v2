<?php

namespace App\Http\Controllers\Api;


use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends BaseController
{
    public function getList(request $request){
        $data= Brand::all();
        return $this->sendResponse($data);
    }
}
