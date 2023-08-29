<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductInfo extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $appends = ['backend_value'];

    public function getBackendValueAttribute(){
        return $this->attributes['value'];
    }

    public function getValueAttribute($value){
        $value =   str_replace("_"," ",$value);
        return   str_replace("-"," ",$value);
    }


}
