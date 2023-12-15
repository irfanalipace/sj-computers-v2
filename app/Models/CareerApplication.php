<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CareerApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'career_id',
        'first_name',
        'last_name',
        'email',
        'resume',
        'cover_letter'
    ];

    public function careers(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }

    public function getResume($value)
    {
        if (!empty($value)) {
            return url('storage/' . $value);
        };
        return null;
    }

    public function getCoverLetter($value)
    {
        if (!empty($value)) {
            return url('storage/' . $value);
        };
        return null;
    }
}
