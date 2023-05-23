<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserState extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $with = ['state'];
    
    public function state(){
        return $this->belongsTo(State::class);
    }
}
