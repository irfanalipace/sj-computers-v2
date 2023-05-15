<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Category\CategoryProductRequest;
use App\Http\Resources\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends BaseController
{
    public function getList(request $request){

        $data= Category::all();

        return $this->sendResponse($data);
    }

    public function getCategoryProduct(CategoryProductRequest $request){
        $perPageRecord = $request->get('per_page') ?? 12;
        $category = Category::where('id',$request->get('category_id'))->first();
        $products = $category->products()->paginate($perPageRecord);

        return $this->sendResponse($products);
    }
}
