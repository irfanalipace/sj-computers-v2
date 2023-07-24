<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public $with = ['categories'];

    public function categories(){
        return $this->belongsToMany(Category::class,'blogs_categories');
    }
}
