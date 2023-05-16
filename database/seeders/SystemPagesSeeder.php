<?php

namespace Database\Seeders;

use App\Models\System;
use App\Models\SystemPage;
use Illuminate\Database\Seeder;

class SystemPagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SystemPage::whereNotNull('id')->delete();

        $systems = [
            [
                'key' => 'return_refund_policy',
                'value' => 'A policy is a statement of intent and is implemented as a procedure or protocol. Policies are generally adopted by a governance body within an organization.'
            ],
            [
                'key' => 'shipping_policy',
                'value' => 'A policy is a statement of intent and is implemented as a procedure or protocol. Policies are generally adopted by a governance body within an organization.'
            ],
            [
                'key' => 'term_services',
                'value' => 'A Terms and Condition is a statement of intent and is implemented as a procedure or protocol. Policies are generally adopted by a governance body within an organization.'
            ],
            [
            'key' => 'privacy_policy',
            'value' => 'A Terms and Condition is a statement of intent and is implemented as a procedure or protocol. Policies are generally adopted by a governance body within an organization.'
        ]
        ];

        foreach($systems as $items){
            SystemPage::create($items);
        }
    }
}
