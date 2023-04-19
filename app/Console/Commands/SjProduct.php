<?php

namespace App\Console\Commands;


use App\Models\Category;
use App\Models\Product;
use App\Models\SjAmazonIntegration;
use Illuminate\Console\Command;
use App\Models\Brand;

class SjProduct extends Command
{

    protected $productCount = 0 ;

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


    public function getProducts(){


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

        foreach ($products as $key => $product){

            $brand = $this->insertBrand($product['Brand']);

            if(isset($product['Category1'])){
                $category1 = $this->insertBrand($product['Category1']);
            }

            if(isset($product['Category2'])){
                $category2 = $this->insertBrand($product['Category2']);
            }


            $data = [
                'name' => $product['Title'],
                'price' => $product['OurPrice'],
                'asin' => $product['ASIN'],
                'sku' => $product['SKU'],
                'image' => $product['URL'],
                'brand_id' => $brand->id,
                'quantity'  => $product['PackageQuantity'],
                'category_id_1'  => $category1->name,
                'category_id_2'  => $category2->name,
                'status'  => $product['Status'],

            ];

            Product::updateOrCreate(['asin' =>$product['ASIN']],[$data]);

            echo "product is added" . $key . "\n";

        }
        dd('done');

    }


    public function insertBrand($name){

        $name = strtolower(trim($name));
        return  Brand::updateOrCreate(['name' =>$name],[]);
    }

    public function insertCategory($name){

        $name = strtolower(trim($name));
        return  Category::updateOrCreate(['name' =>$name],[]);
    }
}
