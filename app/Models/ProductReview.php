<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductReview extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function guest() : BelongsTo
    {
        return $this->belongsTo(Guest::class);
    }

    public function product() : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productMedia(): HasMany
    {
        return $this->hasMany(ProductReviewMedia::class);
    }

    public function getTotalRatingAttribute()
    {
        return $this->where('product_id', $this->product_id)->count();
    }
}
