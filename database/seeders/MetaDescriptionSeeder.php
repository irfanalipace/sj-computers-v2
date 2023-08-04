<?php

namespace Database\Seeders;

use App\Models\MetaDescription;
use Illuminate\Database\Seeder;

class MetaDescriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                "url" => "https://sjcomputers.us",
                "title" => "Buy Perfect Gaming PC Computers, Laptops & Accessories | SJ Computers LLC",
                "description" => "Buy ALL Brands Touch Screen Laptops, Gaming Desktop, Business Computer, Best BTO and more We looked at many companies, including Dell and Apple."
            ],
        ];

        foreach ($data as $meta){
            MetaDescription::insert($meta);
        }
    }
}
