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

    public function categories(){
        return $this->belongsToMany(Category::class,'blogs_categories');
    }
}
