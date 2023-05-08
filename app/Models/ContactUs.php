<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
    use HasFactory;
    
    //Table name contact_us
    protected $table = 'contact_us';
    protected $guarded = "id";

    protected $fillable = ['subject_name','email','message','status'];
}
