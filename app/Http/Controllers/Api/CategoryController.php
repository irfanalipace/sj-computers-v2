<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends BaseController
{
    public function getList(request $request){

        $data= Category::all();

        return $this->sendResponse($data);
    }
}
