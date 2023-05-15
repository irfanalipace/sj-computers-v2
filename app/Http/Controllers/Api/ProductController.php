<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Product\ProductDetailRequest;
use App\Http\Requests\Product\SearchProductRequest;
use App\Models\Product;
use App\Models\ProductInfo;
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

    public function searchProduct(SearchProductRequest $request){
        $perPageRecord = $request->get('per_page') ?? 12;
        $data = Product::where('status',true)
            ->where(function ($query)use ($request) {
                $query->where('name', 'LIKE', '%'.$request->get('name').'%')
                    ->orWhere('sku', 'LIKE', '%'.$request->get('name').'%');
            })
            ->with('brand')
            ->paginate($perPageRecord);
        return $this->sendResponse($data);
    }


    public function getProductFilterList(){
        $data =  [];

        $data['processor'] = $this->queryProductInfo('processor');
        $data['ram_memory'] = $this->queryProductInfo('ram_memory');
        $data['operating_system'] = $this->queryProductInfo('operating_system');
        $data['hard_disk'] = $this->queryProductInfo('hard_disk');
        $data['graphic'] = $this->queryProductInfo('graphic');
        $data['brand'] = $this->queryProductInfo('brand');

        return $this->sendResponse($data);
    }

    public function queryProductInfo($key){
        return ProductInfo::select('value')->where('key',$key)->groupby('value')->distinct()->get();
    }

}
