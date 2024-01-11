<?php
namespace App\Traits;

use App\Models\Product;

trait ProductTrait {

        public function setProductUrl($id){
            $product = Product::find($id);
            (!$product) ?? false;
            $string = $product->name;

            $first_comma_pos = strpos($string, ',');
            if ($first_comma_pos !== false) {
                $string_before_comma = substr($string, 0, $first_comma_pos);
            } else {
                $string_before_comma = $string;
            }

            // Replace spaces with dashes and remove special characters
            $string_before_comma = preg_replace('/[^a-zA-Z0-9\-]/', '', str_replace(' ', '-', $string_before_comma));

            $url = config('app.url').'/'.$string_before_comma.'/dp/'.$product->asin;

            $product->url = $url;
            $product->save();
        }

}
