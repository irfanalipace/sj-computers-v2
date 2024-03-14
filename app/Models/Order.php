<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $with = ['orderItem','Invoice','user.shippingAddress'];

    public function orderItem(){
        return $this->hasMany(OrderItem::class);
    }

    public function Invoice(){
        return $this->belongsTo(Invoice::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function guest(){
        return $this->belongsTo(Guest::class);
    }
}
