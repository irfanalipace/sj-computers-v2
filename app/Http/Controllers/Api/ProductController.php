<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Product\ProductDetailRequest;
use App\Http\Requests\Product\SearchProductRequest;
use App\Http\Requests\ProductDetailAsinRequest;
use App\Models\CategoryProduct;
use App\Models\IpAddress;
use App\Models\Product;
use App\Models\ProductInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends BaseController
{
    public function getList(request $request){

        $data= Product::where('status',true)->with('brand')->paginate(12);
        return $this->sendResponse($data);
    }

    public function getInventoryData(request $request){

        $data= Product::select('name','price','description')
            ->where('status',true)
            ->get();
        return $this->sendResponse($data);
    }

    public function getProductDetail(ProductDetailRequest $request){
        $data = Product::where('id',$request->product_id)->first();
        return $this->sendResponse($data);
    }
    public function getProductDetailAsin(ProductDetailAsinRequest $request){
        $data = Product::where('asin',$request->asin)->first();
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

        $this->saveSearch($request->ip(), $request->name);
        return $this->sendResponse($data);
    }

    public function saveSearch($ip,$search)
    {
       IpAddress::create(
            [
                'ip' => $ip,
                'search' => $search
            ]);
    }

    public function getProductFilterList(){
        $data =  [];

        $data['processor'] = $this->queryProductInfo('processor');
        $data['ram_memory'] = $this->queryProductInfo('ram_memory');
//        $data['operating_system'] = $this->queryProductInfo('operating_system');
        $data['operating_system'] = [];
        $data['hard_disk'] = $this->queryProductInfo('hard_disk');
//        $data['graphic'] = $this->queryProductInfo('graphic');
        $data['graphic'] = [];
        $data['brand'] = $this->queryProductInfo('brand');

        return $this->sendResponse($data);
    }

    public function queryProductInfo($key){
        if($key == 'ram_memory' || $key == 'hard_disk'){
            $units = ['MB' , 'GB', 'TB'];

            $listArr = [];

            foreach ($units as $unit){
                $data = $this->getLeastHighestValue($key , $unit);

                $listArr['least_'.$unit] = $data['least_'.$unit];
                $listArr['highest_'.$unit] = $data['highest_'.$unit];

            }

           return $listArr;
        }

        return ProductInfo::select('value')->where('key',$key)->groupby('value')->distinct()->get();
    }


    public function getLeastHighestValue($key , $unit ){

        $record = DB::table('product_infos')  ->where('key',$key)
            ->Where('value', 'like', '%' . $unit . '%')
            ->select(DB::raw('CAST(value AS UNSIGNED) AS value') )
            ->get();

        return [
            'least_'.$unit => $record->min('value'),
            'highest_'.$unit => $record->max('value'),
        ];

    }


    public function getFilterProducts(SearchProductRequest $request){

        $perPageRecord = $request->get('per_page') ?? 12;

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

                if(empty($key) || empty($value)){
                    continue;
                }


               if($key == 'ram_memory' || $key == 'hard_disk'){
                    $productIds = $this->getProductFilterIds($key, $value['unit'], (int) $value['min'], (int) $value['max']);

                   $sql = $sql->whereIn('id',$productIds);
               }

               if($key == 'processor' || $key == 'brand'){
                   if(!empty($key) && !empty($value)){
                       $productIds =  ProductInfo::where(['key' => $key, 'value' => $value])->pluck('product_id')->toArray();

                       $sql = $sql->whereIn('id',$productIds);
                   }
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


    public function getProductFilterIds($key,$unit,int $min,int $max)
    {
        $ids = [];

        $query = '';

        if($unit == 'TB') {
            $query = ProductInfo::where(function ($query) use ($key) {
                $query->where('key', $key)
                    ->Where('value', 'LIKE', '%MB%');
            })->orwhere(function ($query) use ($key) {
                $query->where('key', $key)
                    ->Where('value', 'LIKE', '%GB%');
            });

        } elseif($unit == 'GB'){
            $query = ProductInfo::where('key', $key)
                ->Where('value', 'LIKE', '%MB%');
        }

        if(!empty($query)){
            $ids = $query->pluck('product_id')
                ->toArray();
        }

        $record = DB::table('product_infos')  ->where('key',$key)
            ->Where('value', 'like', '%' . $unit . '%')
            ->select(DB::raw('CAST(value AS UNSIGNED) AS value'),'product_id','id' )
            ->get();

        $productInfos = $record->where('value','>=', $min)
            ->where('value','<=',$max)
        ->pluck('product_id')
        ->toArray();

        return array_merge($productInfos,$ids);

    }

}
