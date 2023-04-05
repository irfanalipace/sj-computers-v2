<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Otp extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


