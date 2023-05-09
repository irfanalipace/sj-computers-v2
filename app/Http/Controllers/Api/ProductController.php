<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Product\ProductDetailRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends BaseController
{
    public function getList(request $request){
        $data= Product::where('status',true)->with('brand')->paginate(12);
        return $this->sendResponse($data);
    }

    public function getProductDetail(ProductDetailRequest $request){
        $data = Product::where('id',$request->product_id)->first();
        return $this->sendResponse($data);
    }

    public function searchProduct($request){
        $data = Product::where('status',true)
            ->where(function ($query)use ($request) {
                $query->where('name', 'LIKE', '%'.$request->get('name').'%')
                    ->orWhere('sku', 'LIKE', '%'.$request->get('name').'%');
            })
            ->with('brand')
            ->paginate(12);
        return $this->sendResponse($data);
    }

}
