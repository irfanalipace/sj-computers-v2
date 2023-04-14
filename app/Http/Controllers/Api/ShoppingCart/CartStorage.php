<?php

namespace App\Http\Controllers\Api\ShoppingCart;

use App\Models\CartStorage as ModelsCartStorage;
use Darryldecode\Cart\CartCollection;

class CartStorage
{
    public function has($key)
    {        
        return ModelsCartStorage::find($key);
    }
    public function get($key)
    {
        if($this->has($key))
        {
            return new CartCollection(ModelsCartStorage::find($key)->wishlist_data);
        }
        else
        {
            return [];
        }
    }
    public function put($key, $value)
    {
        if($row = ModelsCartStorage::find($key))
        {
            // update
            $row->wishlist_data = $value;
            $row->save();
        }
        else
        {
            //create
            ModelsCartStorage::create([
                'id' => $key,
                'wishlist_data' => $value
            ]);
        }
    }
}