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
            'name' => 'US',
        ]);

        $states = [
            ['country_id' => 1, 'name' => 'Alabama', 'abbreviation' => 'AL', 'zip_code' => '35801 – 35816'],
            ['country_id' => 1, 'name' => 'Alaska', 'abbreviation' => 'AK', 'zip_code' => '99501 – 99524'],
            ['country_id' => 1, 'name' => 'Arizona', 'abbreviation' => 'AZ', 'zip_code' => '85001 – 85055'],
            ['country_id' => 1, 'name' => 'Arkansas', 'abbreviation' => 'AR', 'zip_code' => '72201 – 72217'],
            ['country_id' => 1, 'name' => 'California', 'abbreviation' => 'CA', 'zip_code' => '94203 – 94209, 90001 – 90089, 90209 – 90213'],
            ['country_id' => 1, 'name' => 'Colorado', 'abbreviation' => 'CO', 'zip_code' => '80201 – 80239'],
            ['country_id' => 1, 'name' => 'Connecticut', 'abbreviation' => 'CT', 'zip_code' => '06101 – 06112'],
            ['country_id' => 1, 'name' => 'Delaware', 'abbreviation' => 'DE', 'zip_code' => '19901 – 19905'],
            ['country_id' => 1, 'name' => 'District of Columbia', 'abbreviation' => 'DC', 'zip_code' => '20001 – 20020'],
            ['country_id' => 1, 'name' => 'Florida', 'abbreviation' => 'FL', 'zip_code' => '32501 – 32509, 33124 – 33190, 32801 – 32837'],
            ['country_id' => 1, 'name' => 'Georgia', 'abbreviation' => 'GA', 'zip_code' => '30301 – 30381'],
            ['country_id' => 1, 'name' => 'Hawaii', 'abbreviation' => 'HI', 'zip_code' => '96801 – 96830'],
            ['country_id' => 1, 'name' => 'Idaho', 'abbreviation' => 'ID', 'zip_code' => '83702'],
            ['country_id' => 1, 'name' => 'Illinois', 'abbreviation' => 'IL', 'zip_code' => '60601 – 60641, 62701 – 62709'],
            ['country_id' => 1, 'name' => 'Indiana', 'abbreviation' => 'IN', 'zip_code' => '46201 – 46209'],
            ['country_id' => 1, 'name' => 'Iowa', 'abbreviation' => 'IA', 'zip_code' => '52801 – 52809, 50301 – 50323'],
            ['country_id' => 1, 'name' => 'Kansas', 'abbreviation' => 'KS', 'zip_code' => '67201 – 67221'],
            ['country_id' => 1, 'name' => 'Kentucky', 'abbreviation' => 'KY', 'zip_code' => '41701-41702'],
            ['country_id' => 1, 'name' => 'Louisiana', 'abbreviation' => 'LA', 'zip_code' => '70112 – 70119'],
            ['country_id' => 1, 'name' => 'Maine', 'abbreviation' => 'ME', 'zip_code' => '04032 – 04034'],
            ['country_id' => 1, 'name' => 'Maryland', 'abbreviation' => 'MD', 'zip_code' => '21201 – 21237'],
            ['country_id' => 1, 'name' => 'Massachusetts', 'abbreviation' => 'MA', 'zip_code' => '02101 – 02137'],
            ['country_id' => 1, 'name' => 'Michigan', 'abbreviation' => 'MI', 'zip_code' => '49036, 49734 – 49735'],
            ['country_id' => 1, 'name' => 'Minnesota', 'abbreviation' => 'MN', 'zip_code' => '55801 – 55808'],
            ['country_id' => 1, 'name' => 'Mississippi', 'abbreviation' => 'MS', 'zip_code' => '39530 – 39535'],
            ['country_id' => 1, 'name' => 'Missouri', 'abbreviation' => 'MO', 'zip_code' => '63101 – 63141'],
            ['country_id' => 1, 'name' => 'Montana', 'abbreviation' => 'MT', 'zip_code' => '59623'],
            ['country_id' => 1, 'name' => 'Nebraska', 'abbreviation' => 'NE', 'zip_code' => '68901 – 68902'],
            ['country_id' => 1, 'name' => 'Nevada', 'abbreviation' => 'NV', 'zip_code' => '89501 – 89513'],
            ['country_id' => 1, 'name' => 'New Hampshire', 'abbreviation' => 'NH', 'zip_code' => '03301'],
            ['country_id' => 1, 'name' => 'New Jersey', 'abbreviation' => 'NJ', 'zip_code' => '08608'],
            ['country_id' => 1, 'name' => 'New Mexico', 'abbreviation' => 'NM', 'zip_code' => '87500 – 87506'],
            ['country_id' => 1, 'name' => 'New York', 'abbreviation' => 'NY', 'zip_code' => '10001 – 10048'],
            ['country_id' => 1, 'name' => 'North Carolina', 'abbreviation' => 'NC', 'zip_code' => ''],
            ['country_id' => 1, 'name' => 'North Dakota', 'abbreviation' => 'ND', 'zip_code' => '58501'],
            ['country_id' => 1, 'name' => 'Ohio', 'abbreviation' => 'OH', 'zip_code' => '44101 – 44179'],
            ['country_id' => 1, 'name' => 'Oklahoma', 'abbreviation' => 'OK', 'zip_code' => '74101 – 74110'],
            ['country_id' => 1, 'name' => 'Oregon', 'abbreviation' => 'OR', 'zip_code' => '97201 – 97225'],
            ['country_id' => 1, 'name' => 'Pennsylvania', 'abbreviation' => 'PA', 'zip_code' => '15201 – 15244'],
            ['country_id' => 1, 'name' => 'Rhode Island', 'abbreviation' => 'RI', 'zip_code' => '02801 – 02940'],
            ['country_id' => 1, 'name' => 'South Carolina', 'abbreviation' => 'SC', 'zip_code' => '29217'],
            ['country_id' => 1, 'name' => 'South Dakota', 'abbreviation' => 'SD', 'zip_code' => '57401 – 57402'],
            ['country_id' => 1, 'name' => 'Tennessee', 'abbreviation' => 'TN', 'zip_code' => '37201 – 37222'],
            ['country_id' => 1, 'name' => 'Texas', 'abbreviation' => 'TX', 'zip_code' => '78701 – 78705'],
            ['country_id' => 1, 'name' => 'Utah', 'abbreviation' => 'UT', 'zip_code' => '84321 – 84323'],
            ['country_id' => 1, 'name' => 'Vermont', 'abbreviation' => 'VT', 'zip_code' => '05602'],
            ['country_id' => 1, 'name' => 'Virginia', 'abbreviation' => 'VA', 'zip_code' => '23219'],
            ['country_id' => 1, 'name' => 'Washington', 'abbreviation' => 'WA', 'zip_code' => '98004 – 98009'],
            ['country_id' => 1, 'name' => 'West Virginia', 'abbreviation' => 'WV', 'zip_code' => '25301'],
            ['country_id' => 1, 'name' => 'Wisconsin', 'abbreviation' => 'WI', 'zip_code' => '53201 – 53228'],
            ['country_id' => 1, 'name' => 'Wyoming', 'abbreviation' => 'WY', 'zip_code' => '82001']
        ];

        foreach ($states as $state) {
            DB::table('states')->insert($state);
        }
    }
}
