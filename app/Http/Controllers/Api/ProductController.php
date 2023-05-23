<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Product\ProductDetailRequest;
use App\Http\Requests\Product\SearchProductRequest;
use App\Models\CategoryProduct;
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


    public function getFilterProducts(SearchProductRequest $request){
        $perPageRecord = $request->get('per_page') ?? 12;

        // return $request->all();
        // dd($request->all());

        $sql = Product::query();


        /*
         * for general search
         */
        if($request->get('name'))
        {
            $sql = $sql->where('status',true)
                ->where(function ($query)use ($request) {
                    $query->where('name', 'LIKE', '%'.$request->get('name').'%')
                        ->orWhere('sku', 'LIKE', '%'.$request->get('name').'%')
                        ->orWhere('asin', 'LIKE', '%'.$request->get('name').'%');
                })
                ->with('brand');
        }

        /*
         * for filters
         */

        if(isset($request->filter)  && !empty($request->filter)){


            $filters = $request->filter;

            foreach ($filters as $filter) {


                $filter = json_decode($filter, true);

                $key = $filter['key'] ?? '';
                $value = $filter['value'] ?? '';

                if(!empty($key) && !empty($value)){
                    $productIds =  ProductInfo::where(['key' => $key, 'value' => $value])->pluck('product_id')->toArray();

                    $sql = $sql->whereIn('id',$productIds);
                }
            }

        }

        /*
         * for category filters
         */
        $categoryId = $request->get('category_id');
        if(!empty($categoryId)){
            $productIds =  CategoryProduct::where('category_id',$categoryId)->pluck('product_id')->toArray();

            $sql = $sql->whereIn('id',$productIds);
        }


        $data = $sql->paginate($perPageRecord);


        return $this->sendResponse($data);


    }

}
