<?php

namespace Database\Seeders;

use App\Models\Product\ProtectivePlan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProtectivePlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate the table
        DB::table((new ProtectivePlan)->getTable())->truncate();

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        ProtectivePlan::insert([
            [
                'key' => 'years',
                'value' => '2',
                'price' => '23.99',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'years',
                'value' => '3',
                'price' => '32.99',
                'created_at' => now(),
                'updated_at' => now()
            ],
//            [
//                'key' => 'unlimited',
//                'value' => '0',
//                'price' => '16.99',
//                'created_at' => now(),
//                'updated_at' => now()
//            ]
        ]);
    }
}
