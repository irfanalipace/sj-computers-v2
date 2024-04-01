<?php

namespace App\Console\Commands;


use App\Models\Category;
use App\Models\CategoryProduct;
use App\Models\Product;
use App\Models\ProductInfo;
use App\Models\SjAmazonIntegration;
use App\Traits\ProductTrait;
use Illuminate\Console\Command;
use App\Models\Brand;
use Illuminate\Support\Facades\Log;

use function PHPUnit\Framework\stringStartsWith;

class SjProduct extends Command
{

    use ProductTrait;

    protected $productCount = 0;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sj-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This job will take products from sj-computers and save in db';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->getProducts();
        return 0;
    }


    public function getProducts()
    {
        Log::info('Sj-Products');
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://server5.sjops.us/api/inventory/data/export/Prod_20210218/repricer',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'apikey: 810f8ad0-8585-4845-9954-9a82bdbc18bc'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $products = json_decode($response, true);
        
        foreach ($products as $key => $product) {
            
            if(empty($product['Images'])){
                continue ;
            }

            $brand = $this->insertBrand($product['Brand']);

            $data = [
                'name' => $product['Title'],
                'price' => $product['OurPrice'],
                'asin' => $product['ASIN'],
                'sku' => $product['SKU'],
                'image' => $product['Images'],
                'brand_id' => $brand->id ?? '',
                'quantity'  => $product['PackageQuantity'],
                'status'  => $product['Status'] ?? 0,
                'description'  => $this->cleanDescription($product['AmazonDescription']),
                'amazon_id'  => $product['ID'],
                'rank_1' => $product['Rank1'],
                'rank_2' => $product['Rank2'],
            //  'others'  => $product['JSON'],
            ];

            $product = Product::updateOrCreate(['asin' => $product['ASIN']],$data);

            $this->setProductInfo($product);

            $this->setProductCategory($product);

            $this->setProductUrl($product->id);

            echo "product is added" . $key . "\n";
        }

        Log::info('Sj-Products-end');
        dd('done');

    }
    
    // Function to clean the description
    private function cleanDescription($description)
    {
        $data = json_decode($description, true); // Convert to associative array

        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('JSON decode error: ' . json_last_error_msg());
            // Consider the appropriate fallback or error handling here
            return json_encode($data);
        }

        Log::info('cleanDescription Start');
         // Clean bullet points if they exist
        if (isset($data['bullet_point'])) {
            foreach ($data['bullet_point'] as &$bulletPoint) {
                if (isset($bulletPoint['value'])) {
                    // This regex now targets single or multiple '?' characters
                    $bulletPoint['value'] = preg_replace('/\?+/', '', $bulletPoint['value']);
                }
            }
        }

        // Clean product description if it exists
        if (isset($data['product_description'])) {
            foreach ($data['product_description'] as &$descriptionPoint) {
                if (isset($descriptionPoint['value'])) {
                    // Again, targeting single or multiple '?' characters
                    $descriptionPoint['value'] = preg_replace('/\?+/', '', $descriptionPoint['value']);
                }
            }
        }

        return json_encode($data); // Convert back to JSON string
    }

    public function setProductInfo($product)
    {

        $description = $product->description;

        if (isset($description->cpu_model[0]->family[0]->value)) {
            $processorInfo = [
                'key' => 'processor',
                'product_id' => $product->id,
                'value' => $this->getProcessorName($description->cpu_model[0]->family[0]->value)
            ];
            $this->insertProductInfo($processorInfo);
        }

        if (isset($description->ram_memory[0]->installed_size[0])) {
            /*
             * memory must be greater than 0
             */
            if((int)$description->ram_memory[0]->installed_size[0]->value != 0 ) {
                $ramMemoryInfo = [
                    'key' => 'ram_memory',
                    'product_id' => $product->id,
                    'value' => $description->ram_memory[0]->installed_size[0]->value . ' ' . $description->ram_memory[0]->installed_size[0]->unit
                ];
                $this->insertProductInfo($ramMemoryInfo);
            }
        };

        if (isset($description->operating_system[0]->value)) {

            if($description->operating_system[0]->value != 'No' && $description->operating_system[0]->value != 'Unknown'
            && !str_contains($description->operating_system[0]->value, 'English')
            ) {
                $operatingSystemInfo = [
                    'key' => 'operating_system',
                    'product_id' => $product->id,
                    'value' => $description->operating_system[0]->value
                ];
                $this->insertProductInfo($operatingSystemInfo);
            }
        };

        if (isset($description->hard_disk[0]->size[0])) {

            if((int)$description->hard_disk[0]->size[0]->value != 0 && !empty($description->hard_disk[0]->size[0]->unit)){
                $hardDiskInfo = [
                    'key' => 'hard_disk',
                    'product_id' => $product->id,
                    'value' => $description->hard_disk[0]->size[0]->value . ' ' . $description->hard_disk[0]->size[0]->unit
                ];
                $this->insertProductInfo($hardDiskInfo);
            }
        };

        if (isset($description->graphics_description)) {
            $graphicsDescriptionInfo = [
                'key' => 'graphic',
                'product_id' => $product->id,
                'value' => $description->graphics_description[0]->value
            ];
            $this->insertProductInfo($graphicsDescriptionInfo);
        }

        if (isset($description->brand)) {
            $brandInfo = [
                'key' => 'brand',
                'product_id' => $product->id,
                'value' => $this->getBrandName($description->brand[0]->value)
            ];
            $this->insertProductInfo($brandInfo);
        }

        if (isset($description->generic_keyword)) {

            foreach ($description->generic_keyword as $key => $value) {

                // dont save long tags

                if (strlen($value->value) > 100) {
                    continue;
                };

                $tagInfo = [
                    'key' => 'tag_' . $key,
                    'product_id' => $product->id,
                    'value' => $value->value
                ];
                $this->insertProductInfo($tagInfo);
            }
        }

    }

    public function insertProductInfo($data)
    {
        ProductInfo::updateOrCreate(
            [
                'product_id' => $data['product_id'],
                'key' => $data['key'],
                'value' => $data['value']
            ],
            $data);
    }

    public function strStartsWith($string, $startString)
    {
        $len = strlen($startString);
        return (substr($string, 0, $len) === $startString);
    }

    public function setProductCategory($product)
    {
        $title = strtolower($product->name);

        /*
        * empty
        */
        if (empty($title)) {
            $this->insertProductCategory('not_set', $product->id);
            return ;
        }

        /*
         * start with bto
         */
        if ($this->strStartsWith($title, 'bto')) {
           // Assuming $product is an object that includes the ASIN of the product
            $productAsin = $product->asin;

            $accessories = [
                "B0921PQRDN", "B0921GT8X9", "B09883YCB3",
                "B08VKWNPMT", "B08VLCRQ6X", "B08WRQH82Z",
                "B0921XRC3M", 
                "B0B1H1DWJP", "B0B2N5SJZ4"
            ];

            // Check if the product's ASIN is in the accessories array
            if (in_array($productAsin, $accessories)) {
               
                // If the product's ASIN is in the accessories array, insert 'accessory' category
                $this->insertProductCategory('accessories', $product->id);
                
            } else {
                
                // If the product's ASIN is not in the accessories array, insert 'bto' category
                $this->insertProductCategory('bto', $product->id);
            }
        }

        /*
         * contain Gaming or Alienware
         * doesnot contain Desktop
         * doesnot start with BTO
         */
        if ((strpos($title, 'gaming') || strpos($title, 'alienware'))
            && !strpos($title, 'desktop') && (!$this->strStartsWith($title, 'bto'))) {
            $this->insertProductCategory('gaming_desktops', $product->id);
        }

        /*
        * contain Gaming or Alienware
        * doesnot contain Laptop
        * doesnot start with BTO
        */
        if ((strpos($title, 'gaming') || strpos($title, 'alienware'))
            && !strpos($title, 'laptop') && (!$this->strStartsWith($title, 'bto'))) {
            $this->insertProductCategory('gaming_laptops', $product->id);
        }

        /*
        * contain Laptop
        * doesnot start with BTO
        */

        if (strpos($title, 'laptop') && (!$this->strStartsWith($title, 'bto'))) {
            $this->insertProductCategory('laptops', $product->id);
        }

        /*
         * contain 2 in 1 or 2in1
         */
        if (strpos($title, '2 in 1') || (strpos($title, '2in1'))) {
            $this->insertProductCategory('2_in_1_laptops', $product->id);
        }

        /*
         * contain laptop and touchscreen
         */
        if (strpos($title, 'laptop') && (strpos($title, 'touchscreen'))) {
            $this->insertProductCategory('touch_screen', $product->id);
        }

        /*
        * contain windows 11
        */
        if (strpos($title, 'windows 11')) {
            $this->insertProductCategory('windows_11', $product->id);
        }

        /*
        * contain windows 10
        */
        if (strpos($title, 'windows 10')) {
            $this->insertProductCategory('windows_10', $product->id);
        }

        /*
        * contain windows chromebook
         * doesnot start with bto
        */
        if (strpos($title, 'chromebook') && (!$this->strStartsWith($title, 'bto'))) {
            $this->insertProductCategory('chromebook', $product->id);
        }

        /*
       * contain dell and xps
       */
      if (strpos($title, 'xps')) {
            $this->insertProductCategory('xps', $product->id);
        }

        // if (strpos($title, 'dell') && (strpos($title, 'xps'))) {
        //     $this->insertProductCategory('xps', $product->id);
        // }

        if (strpos($title, 'precision')){
            $this->insertProductCategory('precision', $product->id);
        }

        if (strpos($title, 'miscellaneous')){
            $this->insertProductCategory('miscellaneous', $product->id);
        }
        /*
      * contain Dell Precision
         * doesnot start with bto
      */
        if (strpos($title, 'dell precision') && (!$this->strStartsWith($title, 'bto'))) {
            $this->insertProductCategory('precision', $product->id);
        }

        /*
      * contain Dell Latitude
         * doesnot start with bto
      */
        if (strpos($title, 'dell latitude') && (!$this->strStartsWith($title, 'bto'))) {
            $this->insertProductCategory('latitude', $product->id);
        }


        /*
            * contain 17 inch or 17inch
            */
        if (strpos($title, '17 inch') || (strpos($title, '17inch'))) {
            $this->insertProductCategory('screen_17_inch', $product->id);
        }

        /*
           * contain 15 inch or 15inch
           */
        if (strpos($title, '15 inch') || (strpos($title, '15inch'))) {
            $this->insertProductCategory('screen_15_inch', $product->id);
        }

        /*
          * contain 14 inch or 14inch
          */
        if (strpos($title, '14 inch') || (strpos($title, '14inch'))) {
            $this->insertProductCategory('screen_14_inch', $product->id);
        }

        /*
        * contain 13 inch or 13inch
        */
        if (strpos($title, '13 inch') || (strpos($title, '13inch'))) {
            $this->insertProductCategory('screen_13_inch', $product->id);
        }

        /*
        * contain i3 inch or core i3
        */
        if (strpos($title, 'i3') || (strpos($title, 'core i3'))) {
            $this->insertProductCategory('core_i3', $product->id);
        }

        /*
        * contain i5 inch or core i5
        */
        if (strpos($title, 'i5') || (strpos($title, 'core i5'))) {
            $this->insertProductCategory('core_i5', $product->id);
        }

        /*
        * contain i7 inch or core i7
        */
        if (strpos($title, 'i7') || (strpos($title, 'core i7'))) {
            $this->insertProductCategory('core_i7', $product->id);
        }

            /*
        * contain Desktop
        * doesnot start with BTO
        */
            if (strpos($title, 'desktop') && (!$this->strStartsWith($title, 'bto'))) {
                $this->insertProductCategory('desktop', $product->id);
            }

            /*
        * contain Tablet
        * doesnot start with BTO
        */
            if (strpos($title, 'tablet') && (!$this->strStartsWith($title, 'bto'))) {
                $this->insertProductCategory('tablets', $product->id);
            }

            /*
        * contain Monitor
        * doesnot contain desktop ,pc, Optiplex
        */
        if ( ( !strpos($title, 'desktop') && ( !strpos($title, 'pc')) && ( !strpos($title, 'optiplex') ))
            && (strpos($title, 'Monitor'))) {
            $this->insertProductCategory('monitor', $product->id);
        }

        /*
        * contain business
        */
            if ((strpos($title, 'business'))) {
                $this->insertProductCategory('business_computers', $product->id);
            }

            /*
        * contain sff or Small Form Factor
        */
                if ((strpos($title, 'sff')) || strpos($title,'small form factor')) {
                    $this->insertProductCategory('sff', $product->id);
                }

                /*
            * contain usff or Ultra
            */
                if ((strpos($title, 'usff')) || strpos($title,'ultra')) {
                    $this->insertProductCategory('usff', $product->id);
                }

            /*
            * contain Tower
                    * doesnot contain mini
            */
            if ((strpos($title, 'tower')) && (!strpos($title,'mini'))) {
                $this->insertProductCategory('tower', $product->id);
            }

            /*
        * contain Tiny or Micro
        */
        if ((strpos($title, 'tiny')) || (strpos($title,'micro'))) {
            $this->insertProductCategory('tiny', $product->id);
        }


                /*
        * contain mini
        */
        if ((strpos($title, 'mini'))) {
            $this->insertProductCategory('mini', $product->id);
        }

    }

    public function insertBrand($name)
    {
        $name = $this->getBrandName(strtolower(trim($name)));
        return Brand::updateOrCreate(['name' => $name], []);
    }

    public function getBrandName($name){

        if(preg_match("/h.p.cy/i", $name ) ||
            preg_match("/hewlett packard/i", $name ) ||
            preg_match("/elite/i", $name ) ){
            return 'HP';
        }elseif(preg_match("/oemgenuine/i", $name )){
            return 'Lenovo';
        }elseif( preg_match("/optiplex/i", $name )){
            return 'Dell';
        }else{
            return $name;
        }

    }

    public function getProcessorName($name){

        $name = strtolower(trim($name));

        if(preg_match("/core i5/i", $name) || preg_match("/core_i5/i", $name)){
            return "Core i5";
        } if(preg_match("/core i3/i", $name) || preg_match("/core_i3/i", $name)){
            return "Core i3";
        } if(preg_match("/core i7/i", $name) || preg_match("/core_i7/i", $name)){
            return "Core i7";
        }if(preg_match("/core 2/i", $name) || preg_match("/core_2/i", $name)){
            return "Core 2";
        } else{
            return $name;
         }

    }

    public function insertProductCategory($slug, $productId)
    {

        $category = Category::where('slug', $slug)->first();

        if (empty($category)) {
            Category::create([
                'name' => $slug,
                'slug' => $slug
            ]);
            return;
        }

        CategoryProduct::updateOrCreate(
            [
                'product_id' => $productId,
                'category_id' => $category->id
            ],[]);

    }

}
