<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\PaginateRequest;
use App\Http\Requests\Product\FeatureProductRequest;
use App\Http\Requests\Product\ProductDetailRequest;
use App\Http\Requests\Product\ProductMediaRequest;
use App\Http\Requests\Product\SearchProductRequest;
use App\Http\Requests\ProductCategoryRequest;
use App\Http\Requests\ProductDetailAsinRequest;
use App\Models\CategoryProduct;
use App\Models\IpAddress;
use App\Models\Product;
use App\Models\Product\ProtectivePlan;
use App\Models\ProductInfo;
use App\Models\ProductMedia;
use App\Models\ProductReview;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class ProductController extends BaseController
{
    public function getList(request $request)
    {
        $data = Product::with('brand')->paginate(12);
        return $this->sendResponse($data);
    }

    public function getInventoryData(request $request)
    {

        $data = Product::select('name', 'price', 'description')->get();
        return $this->sendResponse($data);
    }

    public function getProductDetail(ProductDetailRequest $request)
    {
        $data = Product::where('id', $request->product_id)->first();
        $data->load('productMedia');
        return $this->sendResponse($data);
    }

    public function getProductDetailAsin(ProductDetailAsinRequest $request)
    {
        $data = Product::with('productMedia')
            ->where('asin', $request->asin)->first();
        return $this->sendResponse($data);
    }

    public function searchProduct(SearchProductRequest $request)
    {
        $perPageRecord = $request->get('per_page') ?? 12;
        $data = Product::where(function ($query) use ($request) {
            $query->where('name', 'LIKE', '%' . $request->get('name') . '%')
                ->orWhere('sku', 'LIKE', '%' . $request->get('name') . '%')
                ->orWhere('asin', 'LIKE', '%' . $request->get('name') . '%');
        })
            ->with('brand', 'productMedia')
            ->paginate($perPageRecord);

        $this->saveSearch($request->ip(), $request->name);
        return $this->sendResponse($data);
    }

    public function saveSearch($ip, $search)
    {
        IpAddress::create(
            [
                'ip' => $ip,
                'search' => $search
            ]);
    }

    public function getSimilarItem(Product $product)
    {
        return $this->getSuggestedItems($product)->take(2);
    }

    public function productCount(Product $product, Request $request)
    {
        $cpu_family = $product->description->cpu_model[0]->family[0]->value ?? '';
        $ram_value = $product->description->ram_memory[0]->installed_size[0]->value ?? '';
        $graphics_ram = $product->description->graphics_ram[0]->size[0]->value ?? '';
        $hard_disk = $product->description->hard_disk[0]->size[0]->value ?? '';

        $data = Product::whereJsonContains('description->cpu_model', [['family' => ['value' => $cpu_family]]])
            ->orWhereJsonContains('description->ram_memory',[['installed_size'=> ['value' => $ram_value]]])
            ->orWhereJsonContains('description->graphics_ram',[['size'=> ['value' => $graphics_ram]]])
            ->orWhereJsonContains('description->hard_disk',[['size'=> ['value' => $hard_disk]]])
            ->where('quantity', '>', 100)
            ->limit(10)
            ->with('brand:id,name,image')
            ->get();

            return $this->sendResponse($data, 'All product displayed that are above 100 in quantity');
    }
    public function getProductFilterList(Request $request)
    {
        $data = [];
       
        $category = (isset($request->category) && $request->category) ? $request->category : []; 
        
        $data['processor'] = $this->queryProductInfo('processor', $category);
        $data['ram_memory'] = $this->queryProductInfo('ram_memory', $category);
        $data['operating_system'] = $this->queryProductInfo('operating_system', $category);
        // $data['operating_system'] = [];
        $data['hard_disk'] = $this->queryProductInfo('hard_disk', $category);
        // $data['graphic'] = $this->queryProductInfo('graphic');
        // $data['graphic'] = [];
        $data['brand'] = $this->queryProductInfo('brand', $category);
        
        $data['price'] = $this->queryProductInfo('price', $category);

        $data['review'] = $this->queryProductInfo('review', $category);

        // dd($data);

        return $this->sendResponse($data);
    }

    public function queryProductInfo($key,$category = [])
    {
        if(!empty($category)){
            $methodName = $this->getMethodNameFromCategory($category);
            
            if (!method_exists($this, $methodName)) {
                return $this->sendError('error', 'Select a valid category to fetch data.');
            }

            $sql = $this->$methodName();
           
        }
        $sql = (isset($sql) && $sql) ? $sql : [] ;
        
        if ($key == 'ram_memory' || $key == 'hard_disk') {
            $units = ['MB', 'GB', 'TB'];

            $listArr = [];

            foreach ($units as $unit) {
                $data = $this->getLeastHighestValue($key, $unit,$sql);

                $listArr['least_' . $unit] = $data['least_' . $unit];
                $listArr['highest_' . $unit] = $data['highest_' . $unit];

            }
            
            return $listArr;
        } else if($key == 'price'){
            return $this->getPrices($sql);
        } else if($key == 'brand'){
            return $this->getBrands($key,$sql);
        } else if($key == 'review'){
            return $this->getReviews($key,$sql);
        }
        // else if($key == 'processor') {
        //     return [
        //         'Core i3',
                    // 'Core i5'
                    // 'Core i7'
        //     ];
        // }

        if(!empty($sql)){
            $products = $sql->whereHas('productInfo', function ($query) use ($key) {
                $query->where('key', $key);
            })
            ->with(['productInfo' => function ($query) use ($key) {
                $query->where('key', $key)->select(['product_id', 'value']);
            }])
            ->get()
            ->flatMap(function ($product) {
                return $product->productInfo;
            })
            ->unique('value')
            ->values()
            ->map(function ($productInfo) {
                $value = $productInfo->value;
                $backendValue = str_replace(' ', '_', strtolower($value));
                return [
                    'value' => $value,
                    'backend_value' => $backendValue,
                ];
            });

        } else{
            $products = ProductInfo::select('value')->where('key', $key)->groupby('value')->distinct()->get();
        }
        return $products;
    }

    protected function getPrices($sql = [])
    {
        $product = (!empty($sql)) ? $sql :  Product::query();
        $data['min_price'] = $product->min('price');
        $data['max_price'] = $product->max('price');
        
        return $data;
    }

    public function getLeastHighestValue($key, $unit,$sql = [])
    {
        $conversionFactors = ['MB' => 1, 'GB' => 1024, 'TB' => 1048576]; // Conversion factors
        
        if(!empty($sql)) { 
          
            $records = $sql->whereHas('productInfo', function ($query) use ($key) {
                $query->where('key', $key)
                      ->where(function($query) {
                          $query->where('value', 'LIKE', '% MB')
                                ->orWhere('value', 'LIKE', '% GB')
                                ->orWhere('value', 'LIKE', '% TB');
                      });
            })
            ->with(['productInfo' => function ($query) use ($key) {
                $query->where('key', $key)
                      ->where(function($query) {
                          $query->where('value', 'LIKE', '% MB')
                                ->orWhere('value', 'LIKE', '% GB')
                                ->orWhere('value', 'LIKE', '% TB');
                      })
                      ->select('product_id', 'value');
            }])
            ->get();
           
            $values = $records->pluck('productInfo')->flatten()->map(function ($item) use ($conversionFactors) {
                // Extract the numeric part and unit from the value string
                preg_match('/(\d+(\.\d+)?)\s*(MB|GB|TB)/i', $item->value, $matches);
              
                $numericValue = $matches[1];
                $valueUnit = strtoupper($matches[3]);
                // dd($numericValue );
                // Convert the value to MB for a uniform comparison
                return $numericValue * $conversionFactors[$valueUnit];
            });

        } else{
            
            $records = DB::table('product_infos')
            ->where('key', $key)
            ->where('value', 'LIKE', '%' . $unit . '%')
            ->select('value')
            ->get();

            $values = $records->map(function ($item) use ($conversionFactors) {
                // Extract the numeric part and unit from the value string
                preg_match('/(\d+(\.\d+)?)\s*(MB|GB|TB)/i', $item->value, $matches);
                
                $numericValue = $matches[1];
                $valueUnit = strtoupper($matches[3]);
        
                // Convert the value to MB for a uniform comparison
                return $numericValue * $conversionFactors[$valueUnit];
            });
        }        
        // dd($values);
        // Convert all values to the target unit before finding min and max
        $valuesInTargetUnit = $values->map(function ($value) use ($conversionFactors, $unit) {
            
            return $value / ($conversionFactors[$unit] ?: 1);
        });

        $least = $valuesInTargetUnit->min();
        $highest = $valuesInTargetUnit->max();

        return [
            'least_' . $unit => round($least, 2),
            'highest_' . $unit => round($highest, 2),
        ];
    }    

    protected function getBrands($key,$sql = [])
    {
        $brands = ['HP', 'Dell', 'Lenovo', 'BTO'];

        if(!empty($sql)) {

            $products = $sql->whereHas('productInfo', function ($query) use ($key, $brands) {
                $query->where('key', $key)->whereIn('value', $brands);
            })->get();
            
            $brandValues = $products->flatMap(function ($product) use ($key) {
                return $product->productInfo->where('key', $key)->pluck('value');
            })->map(function ($value) {
                return strtolower($value);
            })->unique()->values();

            // Format the output, reverting to the original case for display
            $record = $brandValues->map(function ($value) {
                return [
                    'value' => ucfirst($value),
                    'backend_value' => ucfirst($value),
                ];
            });

        } else {

            $record = ProductInfo::select('value')
            ->where('key', $key)
            ->whereIn('value', $brands)
            ->groupBy('value')
            ->distinct()
            ->get();

        }
        return $record;

    }

    public function getReviews($key, $sql = [])
    {
        if (!empty($sql)) {
            $minRating = PHP_INT_MAX;
            $maxRating = PHP_INT_MIN;

            foreach ($sql->get() as $product) {
                $reviews = $product->productReview;

                // If the product has reviews
                if ($reviews->count() > 0) {
                    $minRating = min($minRating, $reviews->min('rating'));
                    $maxRating = max($maxRating, $reviews->max('rating'));
                }
            }
        } else {
            // If $sql is empty
            $minRating = ProductReview::min('rating');
            $maxRating = ProductReview::max('rating');
        }

        // Format the output
        $record = [
            'min_rating' => $minRating,
            'max_rating' => $maxRating
        ];

        return $record;
    }


    public function getFilterProducts(SearchProductRequest $request)
    {
      
        $perPageRecord = $request->get('per_page') ?? 12;

        if(isset($request->category) && $request->category != 'all'){
            $methodName = $this->getMethodNameFromCategory($request->category);
            
            if (!method_exists($this, $methodName)) {
                return $this->sendError('error', 'Select a valid category to fetch data.');
            }

            $sql = $this->$methodName();

            
        } else {

            $sql = Product::query();

            /*
             * for general search
             */
            if ($request->get('name')) {
    
                $sql = Product::query()->where(function ($query) use ($request) {
                    $query->where('name', 'LIKE', '%' . $request->get('name') . '%')
                        ->orWhere('sku', 'LIKE', '%' . $request->get('name') . '%')
                        ->orWhere('asin', 'LIKE', '%' . $request->get('name') . '%');
                })
                    ->with('brand', 'productMedia');
            }
    
        }
       
        /*
         * for filters
         */
       
        if (isset($request->filter) && !empty($request->filter)) {

            
            $filters = $request->filter;
           
            foreach ($filters as $filter) {
               
                // $filter = json_encode($filter, true);
                $filter = json_decode($filter, true);
               
                $key = $filter['key'] ?? '';
                $value = $filter['value'] ?? '';

                if (empty($key) || empty($value)) {
                    continue;
                }


                if ($key == 'ram_memory' || $key == 'hard_disk') {
                    $productIds = $this->getProductFilterIds($key, $value['unit'], (int)$value['min'], (int)$value['max']);

                    $sql = $sql->whereIn('id', $productIds);
                }

                if ($key == 'processor' || $key == 'brand') {
                    if (!empty($key) && !empty($value)) {

                        $productIds = ProductInfo::where('key' , $key)->whereIn('value' , $value)->pluck('product_id')->toArray();
                       
                        $sql = $sql->whereIn('id', $productIds);
                       
                    }
                }
                
                if($key == 'review' || $key == 'price' || $key == 'operating_system' || $key == 'gpu'){
                   
                    // Apply dynamic filters for price and review.
                    $sql = $this->applyFilters($sql, $key,$value);
                }
                
            }

        }
        
       
        /*
         * for category filters
         */
        $categoryId = $request->get('category_id');
        if (!empty($categoryId)) {
            $productIds = CategoryProduct::where('category_id', $categoryId)->pluck('product_id')->toArray();

            $sql = $sql->whereIn('id', $productIds);
        }

       
        $data = $sql->paginate($perPageRecord);


        return $this->sendResponse($data);


    }


    public function getProductFilterIds($key, $units, int $min, int $max)
    {
        //        $query = '';

        //        if ($unit == 'TB') {
        //            $query = ProductInfo::where(function ($query) use ($key) {
        //                $query->where('key', $key);
        //            });
        //
        //        } elseif ($unit == 'GB') {
        //            $query = ProductInfo::where('key', $key)
        //                ->Where('value', 'LIKE', '%MB%');
        //        }
        //
        //        if (!empty($query)) {
        //            $ids = $query->pluck('product_id')
        //                ->toArray();
        //        }
        if ($min === 0 && $max === 0) {
            // If both min and max are 0, explicitly return null as required.
            return null;
        }
    
        $record = DB::table('product_infos')->where('key', $key)
                    ->where(function ($query) use ($units) {
                        foreach ($units as $unit) {
                            $query->orWhere('value', 'like', '%' . $unit);
                        }
                    })
                    ->select(DB::raw("CAST(REPLACE(REPLACE(value, 'GB', ''), 'TB', '000') AS UNSIGNED) AS value"), 'product_id')
                    ->get();
    
        $productInfos = $record->filter(function ($item) use ($min, $max) {
                            // Convert the item value based on the presence of 'TB' or 'GB' in the string.
                            $valueInGB = strtolower(substr($item->value, -2)) === 'tb' ? ((int)$item->value * 1000) : (int)$item->value;
                            return $valueInGB >= $min && $valueInGB <= $max;
                        })
                        ->pluck('product_id')
                        ->toArray();
    
        return array_unique($productInfos);
    }    
    

    public function getProtectivePlan(Request $request)
    {
        $protectivePlans = ProtectivePlan::all();
        return $this->sendResponse($protectivePlans,'Successfully fetched plans.');
    }

    public function getSuggestedItems(Product $product)
    {
        $cpu_family = $product->description->cpu_model[0]->family[0]->value ?? '';
        $ram_value = $product->description->ram_memory[0]->installed_size[0]->value ?? '';
        $graphics_ram = $product->description->graphics_ram[0]->size[0]->value ?? '';
        $hard_disk = $product->description->hard_disk[0]->size[0]->value ?? '';

        return Product::whereJsonContains('description->cpu_model', [['family' => ['value' => $cpu_family]]])
            ->orWhereJsonContains('description->ram_memory',[['installed_size'=> ['value' => $ram_value]]])
            ->orWhereJsonContains('description->graphics_ram',[['size'=> ['value' => $graphics_ram]]])
            ->orWhereJsonContains('description->hard_disk',[['size'=> ['value' => $hard_disk]]])
            ->limit(5)
            ->get();
    }

    public function getBudgetFriendlyDesktop(PaginateRequest $request)
    {
        $products =  Product::whereHas('categories' , function($category){
            $category->where('slug','desktop');
            })->where('price','>',250)            
            ->paginate($request->per_page ?? 10);
        return $this->sendResponse($products,'Successfully fetched budget friendly products.');
    }

    public function getWorkstationsBudget(PaginateRequest $request)
    {
        $products =  Product::where('name', 'like', '%workstation%')->where('price','>',400)            
            ->paginate($request->per_page ?? 10);
        return $this->sendResponse($products,'Successfully fetched workstations systems products.');
    }

    public function getPorfessionalLaptop(PaginateRequest $request)
    {
        $products =  Product::whereHas('categories' , function ($query) {
             $query->where('slug', 'laptop');
             $query->OrWhere('slug', '2_in_1_laptops');
            })->where('price','>',400)            
            ->paginate($request->per_page ?? 10);
        return $this->sendResponse($products,'Successfully fetched professional laptops products.');
    }

    public function getTouchScreenLaptop(PaginateRequest $request)
    {
        $products =  Product::whereHas('categories',function($category){
            $category->where('slug','touch_screen');
            })            
            ->paginate($request->per_page ?? 10);
        return $this->sendResponse($products,'Successfully fetched touch laptops products.');
    }

    public function getTopRatedProduct(PaginateRequest $request)
    {
        $products = Product::whereHas('productReview', function ($query) {
                $query->where('rating', '>=', 4);
            })
            ->select('products.*', DB::raw('(
                SELECT ROUND(AVG(rating), 1)
                FROM product_reviews 
                WHERE product_reviews.product_id = products.id
            ) AS average_rating'))
            ->orderByDesc('average_rating')
            ->inRandomOrder()
            ->paginate($request->per_page ?? 10);
    
        return $this->sendResponse($products, 'Successfully fetched top-rated products.');
    }

    public function getProductCategory(ProductCategoryRequest $request)
    {
        try {
            $methodName = $this->getMethodNameFromCategory($request->category);
            
            if (!method_exists($this, $methodName)) {
                return $this->sendError('error', 'Select a valid category to fetch data.');
            }

            $query = $this->$methodName();
             // Apply dynamic filters for price and review.
            // $query = $this->applyFilters($query, $request->input('filter', []));

            $products = $query->paginate($request->per_page ?? 10);

            return $this->sendResponse($products, 'Successfully fetched ' . $request->category . ' data');
        } catch (Exception $e) {
            return $this->sendError('error', 'Something went wrong ' . $e->getMessage());
        }
    }

    protected function applyFilters($query,$key,$value)
    {
       
        // Apply price filter
        if ($key == 'price' && !empty($value)) {
            $priceFilter = $value;
           
            $query->whereBetween('price', [$priceFilter['min'], $priceFilter['max']]);          
        }

        // Apply review filter
        if ($key == 'review' && !empty($value)) {
            $reviewFilter = $value;
            $query->whereHas('productReview', function ($query) use ($reviewFilter) {
                $query->whereBetween('rating', [$reviewFilter['min'], $reviewFilter['max']]);
            });
        }

        // Apply brand filter
        if($key == 'brand'  && !empty($value)){
            $brandFilter = $value;
           
            $query->whereHas('brand', function ($query) use ($brandFilter) {
                $query->whereIn('name', $brandFilter);
            }); 
           
        }

        // Apply OS filter
         if($key == 'operating_system'  && !empty($value)){
            $operatingSystemFilter = $value;

            $query->whereHas('productInfo', function ($query) use ($operatingSystemFilter) {
                $query->where('key','operating_system')->whereIn('value', $operatingSystemFilter);
            }); 
        }

        // Apply Internal memory filter
        if($key == 'internal_memory'  && !empty($value)){
            $internalMemoryFilter = $value;
           
            $query->whereHas('productInfo', function ($query) use ($internalMemoryFilter) {
                $query->where('key','hard_disk')->whereIn('value', $internalMemoryFilter);
            }); 
           
        }

        // Apply RAM filter
         if($key == 'ram'  && !empty($value)){
            $ramFilter = $value;
           
            $query->whereHas('productInfo', function ($query) use ($ramFilter) {
                $query->where('key','ram_memory')->whereIn('value', $ramFilter);
            }); 
        }

         // Apply RAM filter
         if($key == 'gpu'  && !empty($value)){
            $gpuFilters = $value;
           
            $query->where(function ($query) use ($gpuFilters) {
                foreach ($gpuFilters as $filter) {
                    $query->orWhere('name', 'like', '%'.$filter.'%');
                }
            });
        }

        return $query;
}

    protected function getMethodNameFromCategory($category)
    {
        $methodMapping = [
            'budget-friendly' => 'getBudgetFriendlyDesktops',
            'workstation' => 'getWorkstations',
            'professional-laptop' => 'getProfessionalLaptops',
            'touch-screen' => 'getTouchScreenLaptops',
            'top-rated-product' => 'getTopRatedProducts',
            'best-sellers' => 'getBestSellerProducts',
            'new-arrival' => 'getNewArrivalProducts'
            // 'featured-products' => 'getFeaturedProducts'
        ];

        return $methodMapping[$category] ?? null;
    }

    protected function getBudgetFriendlyDesktops()
    {
        return Product::whereHas('categories', function ($category) {
            $category->where('slug', 'desktop');
        })->where('price', '<', 250)->orderBy('price', 'asc');
    }

    protected function getWorkstations()
    {
        return Product::where('name', 'like', '%workstation%')->where('price', '>', 400);
    }

    protected function getProfessionalLaptops()
    {
        return Product::whereHas('categories', function ($query) {
            $query->where('slug', 'laptop');
            $query->orWhere('slug', '2_in_1_laptops');
        })->where('price', '>', 400);
    }

    protected function getTouchScreenLaptops()
    {
        return Product::whereHas('categories', function ($category) {
            $category->where('slug', 'touch_screen');
        });
    }

    protected function getTopRatedProducts()
    {
        return Product::whereHas('productReview', function ($query) {
            $query->where('rating', '>=', 4);
        })
        ->select('products.*', DB::raw('(
            SELECT ROUND(AVG(rating), 1)
            FROM product_reviews 
            WHERE product_reviews.product_id = products.id
        ) AS average_rating'))
        ->orderByDesc('average_rating')
        ->inRandomOrder();
    }

    protected function getBestSellerProducts()
    {
        // First, get the product IDs with an average rating above 4.7
        $ratedProductIds = ProductReview::select('product_id')
        ->groupBy('product_id')
        ->havingRaw('AVG(rating) > 4.7')
        ->pluck('product_id');
        return Product::whereIn('id', $ratedProductIds)
        ->whereHas('orderItems', function ($query) {
            $query->whereHas('order'); 
        });
    }

    protected function getNewArrivalProducts()
    {
        return Product::where('created_at', '>=', Carbon::now()->subDays(15));
    }

    protected function getFeaturedProducts()
    {
        return Product::where('is_feature',1);
    }

    public function featureProduct(FeatureProductRequest $request)
    {
        try {
            $product = Product::findOrFail($request->productId);

            $product->is_feature = ($product->is_feature == 1) ? 0 : 1;
            $product->save();

            return $this->sendResponse($product, 'Product feature status updated successfully ');
        } catch (Exception $e) {
            return $this->sendError('error', 'Something went wrong ' . $e->getMessage());
        }

    }
}
