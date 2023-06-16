<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $appends = ['in_stock','rating'];


    const DUMMY = "dummy";

    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function categories(){
        return $this->belongsToMany(Category::class,'category_product')->paginate(12);
    }

    public function holdProducts(){
        return $this->hasMany(HoldReleaseUser::class)->where('status','hold');
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

    public function getImageAttribute($value)
    {
        if(isset($value) && !empty($value)) {
            return array_filter(explode(";",$value));
        }
        return [];
    }

    public function getDescriptionAttribute($value)
    {
        if(isset($value) && !empty($value)) {
            return json_decode($value);
        }
        return [];

    }

    public function getRatingAttribute(){
        return mt_rand (3*10, 5*10) / 10 ;
    }
}
