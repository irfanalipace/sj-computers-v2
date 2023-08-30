<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public $with = ['categories'];

    const PUBLISHED = 'Published';

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'blogs_categories');
    }

    public function getThumbnailImageAttribute($value)
    {
        return $this->getSafeValue($value);
    }
    public function getSecondaryImageAttribute($value)
    {
        return $this->getSafeValue($value);
    }
    public function getPrimaryImageAttribute($value)
    {
        return $this->getSafeValue($value);
    }

    private function getSafeValue($value)
    {
        if (preg_match('/^(https?|www)/i', $value)) {
            return $value;
        }
        elseif (empty($value)){
            return '';
        }
        return $value;
    }
}
