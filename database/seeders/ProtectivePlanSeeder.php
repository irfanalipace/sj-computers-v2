<?php

namespace Database\Seeders;

use App\Models\Product\ProtectivePlan;
use Illuminate\Database\Seeder;

class ProtectivePlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProtectivePlan::insert([
            [
                'key' => 'years',
                'value' => '3',
                'price' => '23.99',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'years',
                'value' => '4',
                'price' => '32.99',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'unlimited',
                'value' => '0',
                'price' => '16.99',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
