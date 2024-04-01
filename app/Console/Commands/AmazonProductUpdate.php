<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;

class AmazonProductUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'amazon-product-update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This is used to update price and quantity of products';

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

        $products = $this->getProductsList();
        
        if($products['status']){

            $this->deleteProducts(collect($products['response']));

            foreach ($products['response'] as $key => $product){
                
                Product::where(['sku' => $product['SKU']])
                    ->update(['quantity' => (int)$product['Quantity'] , 'price' => $product['Price']]);

                echo "product update ". $key."\n";
            }
        }
        return 0;
    }

    public function deleteProducts($products)
    {       
        $skuList = $products->pluck('SKU');
        Product::whereNotIn('sku',$skuList)->update(['status' => 0]);
    }

    public function getProductsList(){

        $status = false;


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

        $response = json_decode($response,true);

        if (isset($response)) {
            $status = true;
        }

        return [
            'status' => $status,
            'response' => $response
        ];

    }
}
