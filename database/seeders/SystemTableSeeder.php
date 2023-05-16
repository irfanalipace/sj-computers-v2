<?php

namespace Database\Seeders;

use App\Models\System;
use Illuminate\Database\Seeder;

class SystemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $systems = [
            [
                'key' => 'Policies',
                'value' => 'A policy is a statement of intent and is implemented as a procedure or protocol. Policies are generally adopted by a governance body within an organization.'
            ],
            [
                'key' => 'Terms & condition',
                'value' => 'A Terms and Condition is a statement of intent and is implemented as a procedure or protocol. Policies are generally adopted by a governance body within an organization.'
            ]
        ];

        foreach($systems as $items){
            System::create($items);
        }
       
    }
}
