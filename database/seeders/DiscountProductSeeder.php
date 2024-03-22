<?php

namespace Database\Seeders;

use App\Classes\StatusEnum;
use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Database\Seeder;

class DiscountProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Get low price product
        $product = Product::where('asin','B08CBL6S9D')->first();
        
        if(!empty($product)){
          $detail = [];

          $detail['discount'] = "50%";
          $detail['actual_price'] = "200";
          $detail['discounted_price'] = "100";
          $exist = ProductDetail::where('product_id',$product->id)->exists();
            
            if(!$exist){
                ProductDetail::create([
                    'product_id' => $product->id,
                    'summary' => "discount_home_product",
                    "additional_information" => json_encode($detail,true)
                ]);
            }
           
        }
    }
}
