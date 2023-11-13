<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Career::query()->create([
            'job_title' => 'test job_title',
            'job_description' => 'test job_description',
            'job_requirements' => 'test job_requirements',
            'primary_worksite' => 'test primary_worksite',
            'work_hours' => 'test work_hours',
            'salary' => 'test salary',
            'applications' => 'test applications',
        ]);
    }
}
