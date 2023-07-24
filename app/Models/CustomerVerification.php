<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerVerification extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['email', 'otp_code', 'is_verified'];
}
