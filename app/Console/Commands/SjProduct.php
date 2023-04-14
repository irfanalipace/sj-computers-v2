<?php

namespace App\Console\Commands;


use App\Models\Product;
use App\Models\SjAmazonIntegration;
use Illuminate\Console\Command;

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
//        $accessToken = $this->getAccessToken();

        $accessToken = SjAmazonIntegration::pluck('access_token')->first();

        if(empty($accessToken)){
            $accessToken = $this->getAccessToken();

        }

        $url = "https://erp.sjops.us/api/v2/markets/1/listings/";

        $this->getProducts($accessToken,$url);
        return 0;
    }

    public function getAccessToken()
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://erp.sjops.us/api/token/',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS =>'{
    "email" :   "php@sjcomputersmn.com",
    "password"  :   "SoftDev345##"
}',
            CURLOPT_HTTPHEADER => array(
                'Accept: application/json',
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $response = json_decode($response);

        SjAmazonIntegration::insert([
            'access_token' => $response->access,
            'refresh_token' =>  $response->refresh
        ]);

        return $response->access;


    }

    public function getProducts($accessToken,$url){

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Accept: application/json',
                'Authorization: Bearer '.$accessToken
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $response = json_decode($response);

       if(isset($response->code) && ($response->code == 'token_not_valid')){
           $accessToken = $this->getAccessToken();
           $this->getProducts($accessToken,$url);
       }

        $products = $response->results;

        foreach ($products as $key => $product){
           Product::updateOrCreate([
               'asin' => $product->number
           ],[
               'name' => $product->title ?? 'dummy',
               'image' => "https://erp.sjops.us/".$product->image_url,
               'asin' => $product->number,
               'price' => $product->our_price,
               'quantity' => $product->quantity,
               'status' => $product->active
           ]);

           $this->productCount = $this->productCount + 1;

           echo "add " . $this->productCount."  \n";
        }

        if(!empty($response->next)){

            $next = str_replace("http://", "https://", $response->next);

            $this->getProducts($accessToken,$next);
        }



        dd($response);

    }
}
