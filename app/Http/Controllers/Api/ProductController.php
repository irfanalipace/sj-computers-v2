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
use App\Models\ProductDetail;
use App\Models\ProductInfo;
use App\Models\ProductMedia;
use App\Models\ProductReview;
use App\Models\ProductStatistic;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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

    public function productCount($product)
    {
        try {
            $product = Product::findOrFail($product);
            $cpu_family = $product->description->cpu_model[0]->family[0]->value ?? '';
            $ram_value = $product->description->ram_memory[0]->installed_size[0]->value ?? '';
            $graphics_ram = $product->description->graphics_ram[0]->size[0]->value ?? '';
            $hard_disk = $product->description->hard_disk[0]->size[0]->value ?? '';

            $data = $product->whereJsonContains('description->cpu_model', [['family' => ['value' => $cpu_family]]])
                ->orWhereJsonContains('description->ram_memory',[['installed_size'=> ['value' => $ram_value]]])
                ->orWhereJsonContains('description->graphics_ram',[['size'=> ['value' => $graphics_ram]]])
                ->orWhereJsonContains('description->hard_disk',[['size'=> ['value' => $hard_disk]]])
                ->where('quantity', '>', 100)
                ->limit(10)
                ->with('brand:id,name,image')
                ->get();

            return $this->sendResponse($data, 'All products displayed that have a quantity above 100.');
        } catch (ModelNotFoundException $e) {
            return $this->sendError('error', 'Product not found.');
        } catch (\Exception $e) {
            return $this->sendError('error', 'Something went wrong: ' . $e->getMessage());
        }
    }

    public function getProductFilterList(Request $request)
    {
        $data = [];

        $category = (isset($request->category) && $request->category) ? $request->category : [];

        if ($category == 'bto') {
            $data['brand'] = $this->queryProductInfo('brand', $category);

            $data['price'] = $this->queryProductInfo('price', $category);

            $data['review'] = $this->queryProductInfo('review', $category);

            return $this->sendResponse($data);
        }

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
        if(!empty($category) && $category != 'all'){
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
                $data = $this->getLeastHighestValue($key, $unit , $sql);
               
                $listArr['least_' . $unit] = $data['least_' . $unit];
                $listArr['highest_' . $unit] = $data['highest_' . $unit];

            }
            
            return $listArr;
        } else if($key == 'price'){

            return $this->getPrices($sql);

        } else if($key == 'brand'){

            return $this->getBrands($key,$sql);

        } else if($key == 'review'){

            return $this->getReviews($sql);

        }
        else if($key == 'processor') {

            return $this->getProcessor($sql);   

        } else if($key == "operating_system") {
            return $this->getOperatingSystem($sql); 
        }

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
        
        // if(!empty($sql)) { 
          
        //     $records = $sql->whereHas('productInfo', function ($query) use ($key) {
        //         $query->where('key', $key)
        //               ->where(function($query) {
        //                   $query->where('value', 'LIKE', '% MB')
        //                         ->orWhere('value', 'LIKE', '% GB')
        //                         ->orWhere('value', 'LIKE', '% TB');
        //               });
        //     })
        //     ->with(['productInfo' => function ($query) use ($key) {
        //         $query->where('key', $key)
        //               ->where(function($query) {
        //                   $query->where('value', 'LIKE', '% MB')
        //                         ->orWhere('value', 'LIKE', '% GB')
        //                         ->orWhere('value', 'LIKE', '% TB');
        //               })
        //               ->select('product_id', 'value');
        //     }])
        //     ->get();
           
        //     $values = $records->pluck('productInfo')->flatten()->map(function ($item) use ($conversionFactors) {
        //         // Extract the numeric part and unit from the value string
        //         preg_match('/(\d+(\.\d+)?)\s*(MB|GB|TB)/i', $item->value, $matches);
              
        //         $numericValue = $matches[1];
        //         $valueUnit = strtoupper($matches[3]);
        //         // dd($numericValue );
        //         // Convert the value to MB for a uniform comparison
        //         return $numericValue * $conversionFactors[$valueUnit];
        //     });

        // } else{
        

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

        // Assuming you want to find the min/max in MB and then convert to the target unit for display
        $least = $values->min() / ($conversionFactors[$unit] ?: 1);
        $highest = $values->max() / ($conversionFactors[$unit] ?: 1);

        return [
            'least_' . $unit => round($least, 2), // Round to 2 decimal places for cleanliness
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

    protected function getReviews($sql)
    {
        if (!empty($sql)) {
            $products = $sql->with('productStats')->get();

            // Retrieve the average ratings directly from productStats
            $averageRatings = $products->pluck('productStats')->filter()->map(function ($productStat) {
                $statistics = json_decode($productStat->statistics, true);
                return $statistics['rate']['overall_rating'] ?? null;
            });

            $minRating = $averageRatings->min() ?? 0;
            $maxRating = $averageRatings->max() ?? 0;
        } else {
            // Retrieve the minimum and maximum ratings directly from product_statistics table
            $minMaxRatings = ProductStatistic::query()
                ->selectRaw('ROUND(MIN(JSON_EXTRACT(statistics, "$.rate.overall_rating")), 1) AS min_rating')
                ->selectRaw('ROUND(MAX(JSON_EXTRACT(statistics, "$.rate.overall_rating")), 1) AS max_rating')
                ->first();

            $minRating = $minMaxRatings->min_rating ?? 0;
            $maxRating = $minMaxRatings->max_rating ?? 0;
        }

        return compact('minRating', 'maxRating');
    }

    private function getOperatingSystem($sql = [])
    {
        $operatingSystem = ['Window 10','Window 10 Pro', 'Window 11','Window 11 Pro'];
        $data = [];
        if (!empty($sql)) {
            $products = $sql->whereHas('productInfo', function ($query) {
                            $query->where('key', 'operating_system');
                        })
                        ->with(['productInfo' => function ($query) {
                            $query->where('key', 'operating_system');
                        }])
                        ->get();
        
            // Collect all operating systems from the products
            $foundOperatingSystems = $products->flatMap(function ($product) {
                return $product->productInfo->pluck('value')->unique();
            })->all();
        
            // Mapping specific versions to general "Window 10" category
            $foundOperatingSystems = collect($foundOperatingSystems)->map(function ($os) {
                if (in_array($os, ['Windows 10 Professional', 'Windows 10 Pro', 'Windows 10 Home'])) {
                    return 'Window 10'; // Map specific versions to "Window 10"
                }
                return $os;
            })->unique()->values()->all();
        
            // Prepare the output
            $output = [];
            foreach ($foundOperatingSystems as $os) {
                // Check if the OS is in the predefined list or should be categorized as "others"
                if (in_array($os, $operatingSystem)) {
                    $output[] = ['value' => $os, 'backend_value' => $os];
                }
            }
        
            // Check if there are any OS values not covered by the predefined list
            $othersFound = count(array_diff($foundOperatingSystems, $operatingSystem)) > 0;
            if ($othersFound) {
                $output[] = ['value' => 'Others', 'backend_value' => 'Others']; // Add "others" to the output
            }
        
            return $output;
        } else{ 
            $data[] = ['value' => 'Window 10','backend_value'=> 'Window 10'];
            $data[] = ['value' => 'Window 10 Pro','backend_value'=> 'Window 10 Pro'];
            $data[] = ['value' => 'Window 11','backend_value'=> 'Window 11'];
            $data[] = ['value' => 'Window 11 Pro','backend_value'=> 'Window 11 Pro'];
            return $data;
        }

    }

    private function getProcessor($sql = [])
    {
        $processorTypes = ['Core i3', 'Core i5', 'Core i7', 'apple_ci3', 'apple_ci5', 'apple_ci7'];
        $data = [];
        if (!empty($sql)) {
        
        
        $products = $sql->whereHas('productInfo', function ($query) use ($processorTypes) {
            $query->where('key', 'processor')
                  ->whereIn('value', $processorTypes);
        })
        ->with(['productInfo' => function ($query) {
            $query->where('key', 'processor');
        }])
        ->get();
        
        $outputProcessors = [];
        $seenProcessors = array_flip($processorTypes); // Efficiently map processor types to true
        
        foreach ($products as $product) {
            foreach ($product->productInfo as $info) {
                if (isset($seenProcessors[$info->value])) {
                    $outputProcessors[] = [
                        'value' => $info->value,
                        'backend_value' => $info->value,
                    ];
                    unset($seenProcessors[$info->value]); // Mark processed processor
                    break; // Exit after finding a matching processor
                }
            }
        }
        
        // Add "others" only if no valid processor types were found
        if (count($seenProcessors) > 0) {
            $outputProcessors[] = [
                'value' => 'others',
                'backend_value' => 'others',
            ];
        }
        
        
        return $outputProcessors;
        } else{ 
            $data[] = ['value' => 'Core i3','backend_value'=> 'Core i3'];
            $data[] = ['value' => 'Core i5','backend_value'=> 'Core i5'];
            $data[] = ['value' => 'Core i7','backend_value'=> 'Core i7'];
            $data[] = ['value' => 'apple_ci3','backend_value'=> 'apple_ci3'];
            $data[] = ['value' => 'apple_ci5','backend_value'=> 'apple_ci5'];
            $data[] = ['value' => 'apple_ci7','backend_value'=> 'apple_ci7'];
            $data[] = ['value' => 'others','backend_value'=> 'others'];
            return $data;
        }
       
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

                if ($key == 'processor') {
                    // Define the list of processor types (or other attributes) you want to exclude in the "others" case
                    $excludedValues = ['Core i3', 'Core i5', 'Core i7','apple_ci3','apple_ci5','apple_ci7']; // For processor scenario                  

                    // Normalize input values to match case sensitivity with excludedValues
                    $normalizedValue = array_map('strtolower', $value);
                    $normalizedExcludedValues = array_map('strtolower', $excludedValues);

                    $productIds = ProductInfo::where('key', $key)
                    ->when(in_array("others", $normalizedValue), function ($query) use ($normalizedExcludedValues) {
                        // Exclude products with values in $excludedValues when "others" is selected
                        $query->whereNotIn(DB::raw('LOWER(value)'), $normalizedExcludedValues);
                    })
                    ->when(!in_array("others", $normalizedValue), function ($query) use ($normalizedValue) {
                        // Filter by the selected values, excluding "others"
                        $query->whereIn(DB::raw('LOWER(value)'), $normalizedValue);
                    })
                    ->pluck('product_id')
                    ->toArray();

                    $sql = $sql->whereIn('id', $productIds);
                   
                }

                if ($key == 'brand') {
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
        $categoryName = $request->get('name') ?? null;
       
        if (!empty($categoryId) && $categoryName == 'bto'){
            
            $accessories = ["B0921PQRDN","B0921GT8X9","B09883YCB3","B08VKWNPMT","B08VLCRQ6X","B08WRQH82Z","B0921XRC3M","B0921XRC3M","B0B1H1DWJP","B0B2N5SJZ4"];

            $sql = $sql->whereIn('asin',$accessories);
          
        } elseif(!empty($categoryId)) {
           
            $productIds = CategoryProduct::where('category_id', $categoryId)->pluck('product_id')->toArray();

            $sql = $sql->whereIn('id', $productIds);
        }

        $paginatedProducts = $sql->orderByDesc('is_feature')->orderBy('price', 'asc')
        ->paginate($perPageRecord);

        // Convert paginated results to a collection to apply additional sorting by 'is_new_arrival'
        $sortedPaginatedProducts = $paginatedProducts->getCollection()->sortByDesc(function ($product) {
         return $product->is_new_arrival; // Assuming 'is_new_arrival' returns a boolean or a value that can be ordered
        })->values();

        // Update the paginator's collection with the sorted collection
        
        $data = $paginatedProducts->setCollection($sortedPaginatedProducts);

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

            $paginatedProducts = $query->orderByDesc('is_feature')->orderBy('price', 'asc')
                           ->paginate($request->per_page ?? 10);

            // Convert paginated results to a collection to apply additional sorting by 'is_new_arrival'
            $sortedPaginatedProducts = $paginatedProducts->getCollection()->sortByDesc(function ($product) {
                return $product->is_new_arrival; // Assuming 'is_new_arrival' returns a boolean or a value that can be ordered
            })->values();

            // Update the paginator's collection with the sorted collection
            $paginatedProducts->setCollection($sortedPaginatedProducts);

            return $this->sendResponse($paginatedProducts, 'Successfully fetched ' . $request->category . ' data');
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

        // Apply brand filter
        if($key == 'brand'  && !empty($value)){
            $brandFilter = $value;
           
            $query->whereHas('brand', function ($query) use ($brandFilter) {
                $query->whereIn('name', $brandFilter);
            }); 
           
        }

        // Apply OS filter
         if($key == 'operating_system'  && !empty($value)){
            $normalizedValue  = array_map('strtolower', $value); // Normalize casing
            // Define mappings for "window 10" to include specific versions
            $windows10Variants = ['windows 10 professional', 'windows 10 pro', 'windows 10 home'];
            
            // Check and replace "window 10" with its specific versions in the filter, if selected
            if (in_array('window 10', $normalizedValue)) {
                // Remove "window 10" from the array
                $key = array_search('window 10', $normalizedValue);
                unset($normalizedValue[$key]);

                // Add the specific versions for "window 10"
                $normalizedValue = array_merge($normalizedValue, $windows10Variants);
            }

            // Now, $normalizedValue contains the specific versions if "window 10" was selected
            
            $query->whereHas('productInfo', function ($query) use ($normalizedValue, $windows10Variants) {
                $query->where('key', 'operating_system');

                if (in_array('others', $normalizedValue)) {
                    // Handle "others" selection
                    $excludedValues = array_merge(['windows 7', 'windows 8', 'windows 10', 'windows 11'], $windows10Variants);
                    $query->whereNotIn(DB::raw('LOWER(value)'), $excludedValues);
                } else {
                    // Directly filter using the modified $normalizedValue which includes specific "window 10" versions
                    $query->whereIn(DB::raw('LOWER(value)'), $normalizedValue);
                }
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

        // Apply review filter
        if ($key == 'review' && !empty($value)) {
            $reviewFilter = $value;
            // $query = Product::where('id', 68)
            // ->whereHas('productStats', function ($query) use ($reviewFilter) {
            //     $overallRatingPath = '$.statistics.overall_rating';
                
            //     if ($reviewFilter['min'] === $reviewFilter['max']) {
            //         // Exact match
            //         $query->whereRaw("JSON_VALUE(statistics, '$overallRatingPath') = ?", [$reviewFilter['min']]);
            //     } else {
            //         // Range query
            //         $query->whereRaw("JSON_VALUE(statistics, '$overallRatingPath') BETWEEN ? AND ?", [
            //             $reviewFilter['min'],
            //             $reviewFilter['max']
            //         ]);
            //     }
            // });
            $query =  $query->whereHas('productStats', function ($query) use ($reviewFilter) {
                    $overallRatingPath = '$.rate.overall_rating';
                    
                    // Since you are looking for a range, we use BETWEEN in this case
                    $query->whereRaw("JSON_VALUE(statistics, '$overallRatingPath') BETWEEN ? AND ?", [
                        $reviewFilter['min'],
                        $reviewFilter['max']
                    ]);
                });
             
           
        }
        return $query->orderBy('price', 'asc');
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
        })->where('price', '<', 250);
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
        ->havingRaw('AVG(rating) > 4.5')
        ->pluck('product_id');
        return Product::whereIn('id', $ratedProductIds);
        // ->whereHas('orderItems', function ($query) {
        //     $query->whereHas('order'); 
        // }    );
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

    public function getDiscountProduct()
    {
        $discountProduct = ProductDetail::where('summary',"discount_home_product")->with('product')->first();

        if(empty($discountProduct)){
            return $this->sendError('error', 'Discount Product not found.' );
        }
        
        return $this->sendResponse($discountProduct,"successfully get discount product for home page.");
    }
}
