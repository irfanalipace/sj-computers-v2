<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Passport\HasApiTokens;

class State extends Model
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'country_id', 'name', 'abbreviation', 'zip_code_start', 'zip_code_end'
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function Country(): HasOne
    {
        return $this->hasOne('Country');
    }
}
