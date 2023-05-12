<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $appends = ['in_stock'];


    const DUMMY = "dummy";

    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function getInStockAttribute(){
        if($this->quantity > 0){
            return true;
        }
        return false;
    }

    public function getPriceAttribute($value)
    {
        if(isset($value) && !empty($value)) {
            return  number_format((float)$value, 2, '.', '');
        }

    }
}
