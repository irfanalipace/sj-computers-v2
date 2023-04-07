<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password'),
                'role_id' => User::ADMIN_ROLE_ID
            ],
            [
                'name' => 'User',
                'email' => 'user@user.com',
                'password' => bcrypt('password'),
                'role_id' => User::USER_ROLE_ID
            ]
                ]
        );
    }
}
