<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_description',
        'job_requirements',
        'primary_worksite',
        'work_hours',
        'salary',
        'applications'
    ];
}
