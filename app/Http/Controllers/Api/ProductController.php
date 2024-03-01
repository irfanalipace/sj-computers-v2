<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\PaginateRequest;
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
    public function getProductFilterList()
    {
        $data = [];

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

    public function queryProductInfo($key)
    {
        if ($key == 'ram_memory' || $key == 'hard_disk') {
            $units = ['MB', 'GB', 'TB'];

            $listArr = [];

            foreach ($units as $unit) {
                $data = $this->getLeastHighestValue($key, $unit);

                $listArr['least_' . $unit] = $data['least_' . $unit];
                $listArr['highest_' . $unit] = $data['highest_' . $unit];

            }

            return $listArr;
        }

        return ProductInfo::select('value')->where('key', $key)->groupby('value')->distinct()->get();
    }


    public function getLeastHighestValue($key, $unit)
    {
        $conversionFactors = ['MB' => 1, 'GB' => 1024, 'TB' => 1048576]; // Conversion factors

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


    public function getFilterProducts(SearchProductRequest $request)
    {

        $perPageRecord = $request->get('per_page') ?? 12;

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

        /*
         * for filters
         */

        if (isset($request->filter) && !empty($request->filter)) {


            $filters = $request->filter;

            foreach ($filters as $filter) {

            //                $filter = json_encode($filter, true);
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
                        $productIds = ProductInfo::where(['key' => $key, 'value' => $value])->pluck('product_id')->toArray();

                        $sql = $sql->whereIn('id', $productIds);
                    }
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


    public function getProductFilterIds($key, $unit, int $min, int $max)
    {
        $ids = [];

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

        $record = DB::table('product_infos')->where('key', $key)
            ->Where('value', 'like', '%' . $unit . '%')
            ->select(DB::raw('CAST(value AS UNSIGNED) AS value'), 'product_id', 'id')
            ->get();

        $productInfos = $record->where('value', '>=', $min)
            ->where('value', '<=', $max)
            ->pluck('product_id')
            ->toArray();

        return array_merge($productInfos, $ids);
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
            $products = $query->paginate($request->per_page ?? 10);

            return $this->sendResponse($products, 'Successfully fetched ' . $request->category . ' data');
        } catch (Exception $e) {
            return $this->sendError('error', 'Something went wrong ' . $e->getMessage());
        }
    }

    protected function getMethodNameFromCategory($category)
    {
        $methodMapping = [
            'budget-friendly' => 'getBudgetFriendlyDesktops',
            'workstation' => 'getWorkstations',
            'professional-laptop' => 'getProfessionalLaptops',
            'touch-screen' => 'getTouchScreenLaptops',
            'top-rated-product' => 'getTopRatedProducts',
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

}
