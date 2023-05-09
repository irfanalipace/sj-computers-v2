<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $with = ['orderItem'];

    public function orderItem(){
        return $this->hasMany(OrderItem::class);
    }
}
