<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Career extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_title',
        'job_description',
        'job_requirements',
        'primary_worksite',
        'work_hours',
        'salary',
        'applications'
    ];

    /**
     * @return HasMany
     */
    public function careerApplications(): HasMany
    {
        return $this->hasMany(CareerApplication::class);
    }
}
