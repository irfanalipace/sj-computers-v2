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

            foreach ($products['response'] as $key => $product){
                Product::where(['sku' => $product['sku']])
                    ->update(['quantity' => (int)$product['quantity'] , 'price' => $product['price']]);

                echo "product update ". $key."\n";
            }
        }
        return 0;
    }



}
