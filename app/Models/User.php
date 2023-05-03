<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends \TCG\Voyager\Models\User implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    const ADMIN_ROLE_ID = 1;
    const USER_ROLE_ID = 2;

    const AUTH_TOKEN = 'SJAuthToken';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'profile_pic',
        'password',
        'status',
        'message',
        'role_id',
        'otp_verified'
    ];

    public function otps()
    {
        return $this->hasOne(Otp::class);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @return HasOne
     */
    public function userDetail(): HasOne
    {
        return $this->hasOne(UserDetail::class);
    }

    public function userState(){
        return $this->hasOne(UserState::class);
    }

    public function getProfilePicAttribute($value){

        $picPath ='storage/'.$value;

        if(public_path($picPath)){
            return  url($picPath);
        }

        return '';
    }
}
