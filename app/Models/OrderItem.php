<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $with = ['product'];

    public function product(){
        return $this->belongsTo(Product::class)->withoutGlobalScopes();
    }

    public function order() : BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
