<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoryProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $records = [
            [
                'name' => 'BTO',
                'slug' => 'bto'
            ],
            [
                'name' => 'Gaming Laptops',
                'slug' => 'gaming_laptops'
            ],
            [
                'name' => 'Gaming Desktops',
                'slug' => 'gaming_desktops'
            ],
            [
                'name' => 'Laptops',
                'slug' => 'laptops'
            ],
            [
                'name' => '2 in 1 Laptops',
                'slug' => '2_in_1_laptops'
            ],
            [
                'name' => 'Touch Screen',
                'slug' => 'touch_screen'
            ],
            [
                'name' => 'Touch Screen',
                'slug' => 'touch_screen'
            ],
            [
                'name' => 'Windows 11',
                'slug' => 'windows_11'
            ],
            [
                'name' => 'Windows 10',
                'slug' => 'windows_10'
            ],
            [
                'name' => 'Chromebook',
                'slug' => 'chromebook'
            ],
            [
                'name' => 'XPS',
                'slug' => 'xps'
            ],
            [
                'name' => 'Precision',
                'slug' => 'precision'
            ],
            [
                'name' => 'Latitude',
                'slug' => 'latitude'
            ],
            [
                'name' => 'Screen 17 inch',
                'slug' => 'screen_17_inch'
            ],
            [
                'name' => 'Screen 15 inch',
                'slug' => 'screen_15_inch'
            ],
            [
                'name' => 'Screen 14 inch',
                'slug' => 'screen_14_inch'
            ],
            [
                'name' => 'Screen 13 inch',
                'slug' => 'screen_13_inch'
            ],
            [
                'name' => 'Core i3',
                'slug' => 'core_i3'
            ],
            [
                'name' => 'Core i5',
                'slug' => 'core_i5'
            ],
            [
                'name' => 'Core i7',
                'slug' => 'core_i7'
            ],
            [
                'name' => 'Desktop',
                'slug' => 'desktop'
            ],
            [
                'name' => 'Tablet',
                'slug' => 'tablet'
            ],
            [
                'name' => 'Monitor',
                'slug' => 'monitor'
            ],
            [
                'name' => 'NOT SET',
                'slug' => 'not_set'
            ],
            [
                'name' => 'Business Computers',
                'slug' => 'business_computers'
            ],
            [
                'name' => 'SFF',
                'slug' => 'sff'
            ],
            [
                'name' => 'USFF',
                'slug' => 'usff'
            ],
            [
                'name' => 'Tower',
                'slug' => 'tower'
            ],
            [
                'name' => 'Tiny',
                'slug' => 'tiny'
            ],
            [
                'name' => 'Mini',
                'slug' => 'mini'
            ],
        ];


        foreach ($records as $record){

            Category::updateOrCreate(['slug' => $record['slug']],$record);
        }
    }
}
