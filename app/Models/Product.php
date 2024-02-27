<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $appends = ['in_stock', 'rating','total_review'];

    public $timestamps = true;

    const DUMMY = "dummy";

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_product');
    }

    public function productMedia()
    {
        return $this->hasMany(ProductMedia::class);
    }
    public function holdProducts()
    {
        return $this->hasMany(HoldReleaseUser::class)->where('status', 'hold');
    }

    public function getInStockAttribute()
    {
        if ($this->quantity > 0) {
            return true;
        }
        return false;
    }

    public function getPriceAttribute($value)
    {
        if (isset($value) && !empty($value)) {
            return number_format((float)$value, 2, '.', '');
        }

    }

    public function getImageAttribute($value)
    {
        if (isset($value) && !empty($value)) {
            return array_filter(explode(";", $value));
        }
        return [];
    }

    public function getDescriptionAttribute($value)
    {
        if (isset($value) && !empty($value)) {
            return json_decode($value);
        }
        return [];

    }

    public function productReview() : HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    public function getRatingAttribute()
    {
        $productStatistic = ProductStatistic::where('product_id', $this->id)->first() ?? null;
        $productStatistic = (isset($productStatistic->statistics)) ? json_decode($productStatistic->statistics) : 0;
    
        // Check if $productStatistic is an object and contains the rate property
        if (is_object($productStatistic) && property_exists($productStatistic, 'rate')) {
            return $productStatistic->rate->overall_rating;
        } else {
            return 0;
        }
     
    }

    public function getTotalReviewAttribute()
    {
        return ProductReview::where('product_id',$this->id)->count() ?? 0;
    }

    public function productStats() :BelongsTo
    {
        return $this->belongsTo(ProductStatistic::class);
    }
    /**
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('product_quantity_status', function (Builder $builder) {
            $builder->where('quantity', '>', 0);
            $builder->where('status', '=', 1);
        });
    }
}
