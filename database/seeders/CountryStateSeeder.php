<?php

namespace Database\Seeders;

use App\Models\Role;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountryStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('countries')->insert([
            'name' => 'US'
        ]);

        $states = [
            ['country_id' => 1, 'name' => 'Alabama', 'abbreviation' => 'AL', 'zip_code_start' => 35004, 'zip_code_end' => 36925],
            ['country_id' => 1, 'name' => 'Alaska', 'abbreviation' => 'AK', 'zip_code_start' => 99501, 'zip_code_end' => 99950],
            ['country_id' => 1, 'name' => 'Arizona', 'abbreviation' => 'AZ', 'zip_code_start' => 85001, 'zip_code_end' => 86556],
            ['country_id' => 1, 'name' => 'Arkansas', 'abbreviation' => 'AR', 'zip_code_start' => 71601, 'zip_code_end' => 72959],
            ['country_id' => 1, 'name' => 'California', 'abbreviation' => 'CA', 'zip_code_start' => 90001, 'zip_code_end' => 96162],
            ['country_id' => 1, 'name' => 'Colorado', 'abbreviation' => 'CO', 'zip_code_start' => 80001, 'zip_code_end' => 81658],
            ['country_id' => 1, 'name' => 'Connecticut', 'abbreviation' => 'CT', 'zip_code_start' => 06001, 'zip_code_end' => '06928'],
            ['country_id' => 1, 'name' => 'Delaware', 'abbreviation' => 'DE', 'zip_code_start' => 19701, 'zip_code_end' => 19980],
            ['country_id' => 1, 'name' => 'Florida', 'abbreviation' => 'FL', 'zip_code_start' => 32003, 'zip_code_end' => 34997],
            ['country_id' => 1, 'name' => 'Georgia', 'abbreviation' => 'GA', 'zip_code_start' => 30002, 'zip_code_end' => 39901],
            ['country_id' => 1, 'name' => 'Hawaii', 'abbreviation' => 'HI', 'zip_code_start' => 96701, 'zip_code_end' => 96898],
            ['country_id' => 1, 'name' => 'Idaho', 'abbreviation' => 'ID', 'zip_code_start' => 83201, 'zip_code_end' => 83877],
            ['country_id' => 1, 'name' => 'Illinois', 'abbreviation' => 'IL', 'zip_code_start' => 60001, 'zip_code_end' => 62999],
            ['country_id' => 1, 'name' => 'Indiana', 'abbreviation' => 'IN', 'zip_code_start' => 46001, 'zip_code_end' => 47997],
            ['country_id' => 1, 'name' => 'Iowa', 'abbreviation' => 'IA', 'zip_code_start' => 50001, 'zip_code_end' => 52809],
            ['country_id' => 1, 'name' => 'Kansas', 'abbreviation' => 'KS', 'zip_code_start' => 66002, 'zip_code_end' => 67954],
            ['country_id' => 1, 'name' => 'Kentucky', 'abbreviation' => 'KY', 'zip_code_start' => 40003, 'zip_code_end' => 42788],
            ['country_id' => 1, 'name' => 'Louisiana', 'abbreviation' => 'LA', 'zip_code_start' => 70001, 'zip_code_end' => 71497],
            ['country_id' => 1, 'name' => 'Maine', 'abbreviation' => 'ME', 'zip_code_start' => '03901', 'zip_code_end' => '04992'],
            ['country_id' => 1, 'name' => 'Maryland', 'abbreviation' => 'MD', 'zip_code_start' => 20588, 'zip_code_end' => 21930],
            ['country_id' => 1, 'name' => 'Massachusetts', 'abbreviation' => 'MA', 'zip_code_start' => 01001, 'zip_code_end' => 05544],
            ['country_id' => 1, 'name' => 'Michigan', 'abbreviation' => 'MI', 'zip_code_start' => 48001, 'zip_code_end' => 49971],
            ['country_id' => 1, 'name' => 'Minnesota', 'abbreviation' => 'MN', 'zip_code_start' => 55001, 'zip_code_end' => 56763],
            ['country_id' => 1, 'name' => 'Mississippi', 'abbreviation' => 'MS', 'zip_code_start' => 38601, 'zip_code_end' => 39776],
            ['country_id' => 1, 'name' => 'Missouri', 'abbreviation' => 'MO', 'zip_code_start' => 63001, 'zip_code_end' => 65899],
            ['country_id' => 1, 'name' => 'Montana', 'abbreviation' => 'MT', 'zip_code_start' => 59001,'zip_code_end' => 59937],
            ['country_id' => 1, 'name' => 'Nebraska', 'abbreviation' => 'NE', 'zip_code_start' => 68001, 'zip_code_end' => 69367],
            ['country_id' => 1, 'name' => 'Nevada', 'abbreviation' => 'NV', 'zip_code_start' => 88901, 'zip_code_end' => 89883],
            ['country_id' => 1, 'name' => 'new Hampshire', 'abbreviation' => 'NH', 'zip_code_start' => 03031, 'zip_code_end' => '03897'],
            ['country_id' => 1, 'name' => 'new Jersey', 'abbreviation' => 'NJ', 'zip_code_start' => 07001, 'zip_code_end' => '08989'],
            ['country_id' => 1, 'name' => 'new Mexico', 'abbreviation' => 'NM', 'zip_code_start' => 87001, 'zip_code_end' => 88439],
            ['country_id' => 1, 'name' => 'new York', 'abbreviation' => 'NY', 'zip_code_start' => 00501, 'zip_code_end' => 14925],
            ['country_id' => 1, 'name' => 'North Carolina', 'abbreviation' => 'NC', 'zip_code_start' => 27006, 'zip_code_end' => 28909],
            ['country_id' => 1, 'name' => 'North Dakota', 'abbreviation' => 'ND', 'zip_code_start' => 58001, 'zip_code_end' => 58856],
            ['country_id' => 1, 'name' => 'Ohio', 'abbreviation' => 'OH', 'zip_code_start' => 43001, 'zip_code_end' => 45999],
            ['country_id' => 1, 'name' => 'Oklahoma', 'abbreviation' => 'OK', 'zip_code_start' => 73001, 'zip_code_end' => 74966],
            ['country_id' => 1, 'name' => 'Oregon', 'abbreviation' => 'OR', 'zip_code_start' => 97001, 'zip_code_end' => 97920],
            ['country_id' => 1, 'name' => 'Pennsylvania', 'abbreviation' => 'PA', 'zip_code_start' => 15001, 'zip_code_end' => 19640],
            ['country_id' => 1, 'name' => 'Rhode Island', 'abbreviation' => 'RI', 'zip_code_start' => '02801', 'zip_code_end' => '02940'],
            ['country_id' => 1, 'name' => 'South Carolina', 'abbreviation' => 'SC', 'zip_code_start' => 29001, 'zip_code_end' => 29945],
            ['country_id' => 1, 'name' => 'South Dakota', 'abbreviation' => 'SD', 'zip_code_start' => 57001, 'zip_code_end' => 57799],
            ['country_id' => 1, 'name' => 'Tennessee', 'abbreviation' => 'TN', 'zip_code_start' => 37010, 'zip_code_end' => 38589],
            ['country_id' => 1, 'name' => 'Texas', 'abbreviation' => 'TX', 'zip_code_start' => 73301, 'zip_code_end' => 88595],
            ['country_id' => 1, 'name' => 'Utah', 'abbreviation' => 'UT', 'zip_code_start' => 84001, 'zip_code_end' => 84791],
            ['country_id' => 1, 'name' => 'Vermont', 'abbreviation' => 'VT', 'zip_code_start' => 05001, 'zip_code_end' => '05907'],
            ['country_id' => 1, 'name' => 'Virginia', 'abbreviation' => 'VA', 'zip_code_start' => 20101, 'zip_code_end' => 24658],
            ['country_id' => 1, 'name' => 'Washington', 'abbreviation' => 'WA', 'zip_code_start' => 98001, 'zip_code_end' => 99403],
            ['country_id' => 1, 'name' => 'West Virginia', 'abbreviation' => 'WV', 'zip_code_start' => 24701, 'zip_code_end' => 26886],
            ['country_id' => 1, 'name' => 'Wisconsin', 'abbreviation' => 'WI', 'zip_code_start' => 53001, 'zip_code_end' => 54990],
            ['country_id' => 1, 'name' => 'Wyoming', 'abbreviation' => 'WY', 'zip_code_start' => 82001, 'zip_code_end' => 83414]
        ];

        foreach ($states as $state) {
            DB::table('states')->insert([$state]);
        }
    }
}
