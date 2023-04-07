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
        $currentDate = Carbon::now()->format('Y-m-d');
        DB::table('countries')->insert([
            'name' => 'US'
        ]);

        $states = [
            ['country_id' => 1, 'name' => 'Alabama', 'abbreviation' => 'AL', 'zip_code_start' => 35801, 'zip_code_end' => 35816],
            ['country_id' => 1, 'name' => 'Alaska', 'abbreviation' => 'AK', 'zip_code_start' => 99501, 'zip_code_end' => 99524],
            ['country_id' => 1, 'name' => 'Arizona', 'abbreviation' => 'AZ', 'zip_code_start' => 85001, 'zip_code_end' => 85055],
            ['country_id' => 1, 'name' => 'Arkansas', 'abbreviation' => 'AR', 'zip_code_start' => 72201, 'zip_code_end' => 72217],
            ['country_id' => 1, 'name' => 'California', 'abbreviation' => 'CA', 'zip_code_start' => 94203, 'zip_code_end' => 94209],
            ['country_id' => 1, 'name' => 'Colorado', 'abbreviation' => 'CO', 'zip_code_start' => 80201, 'zip_code_end' => 80239],
            ['country_id' => 1, 'name' => 'Connecticut', 'abbreviation' => 'CT', 'zip_code_start' => 06101, 'zip_code_end' => 06112],
            ['country_id' => 1, 'name' => 'Delaware', 'abbreviation' => 'DE', 'zip_code_start' => 19901, 'zip_code_end' => 19905],
            ['country_id' => 1, 'name' => 'District of Columbia', 'abbreviation' => 'DC', 'zip_code_start' => 20001, 'zip_code_end' => 20020],
            ['country_id' => 1, 'name' => 'Florida', 'abbreviation' => 'FL', 'zip_code_start' => 32501, 'zip_code_end' => 32509],
            ['country_id' => 1, 'name' => 'Georgia', 'abbreviation' => 'GA', 'zip_code_start' => 30301, 'zip_code_end' => 30381],
            ['country_id' => 1, 'name' => 'Hawaii', 'abbreviation' => 'HI', 'zip_code_start' => 96801, 'zip_code_end' => 96830],
            ['country_id' => 1, 'name' => 'Idaho', 'abbreviation' => 'ID', 'zip_code_start' => 83702],
            ['country_id' => 1, 'name' => 'Illinois', 'abbreviation' => 'IL', 'zip_code_start' => 60601, 'zip_code_end' => 60641],
            ['country_id' => 1, 'name' => 'Indiana', 'abbreviation' => 'IN', 'zip_code_start' => 46201, 'zip_code_end' => 46209],
            ['country_id' => 1, 'name' => 'Iowa', 'abbreviation' => 'IA', 'zip_code_start' => 52801, 'zip_code_end' => 52809],
            ['country_id' => 1, 'name' => 'Kansas', 'abbreviation' => 'KS', 'zip_code_start' => 67201, 'zip_code_end' => 67221],
            ['country_id' => 1, 'name' => 'Kentucky', 'abbreviation' => 'KY', 'zip_code_start' => 41701, 'zip_code_end' => 41702],
            ['country_id' => 1, 'name' => 'Louisiana', 'abbreviation' => 'LA', 'zip_code_start' => 70112, 'zip_code_end' => 70119],
            ['country_id' => 1, 'name' => 'Maine', 'abbreviation' => 'ME', 'zip_code_start' => 04032, 'zip_code_end' => 04034],
            ['country_id' => 1, 'name' => 'Maryland', 'abbreviation' => 'MD', 'zip_code_start' => 21201, 'zip_code_end' => 21237],
            ['country_id' => 1, 'name' => 'Massachusetts', 'abbreviation' => 'MA', 'zip_code_start' => 02101, 'zip_code_end' => 02137],
            ['country_id' => 1, 'name' => 'Michigan', 'abbreviation' => 'MI', 'zip_code_start' => 49036, 'zip_code_end' => '49735'],
            ['country_id' => 1, 'name' => 'Minnesota', 'abbreviation' => 'MN', 'zip_code_start' => 55801, 'zip_code_end' => 55808],
            ['country_id' => 1, 'name' => 'Mississippi', 'abbreviation' => 'MS', 'zip_code_start' => 39530, 'zip_code_end' => 39535],
            ['country_id' => 1, 'name' => 'Missouri', 'abbreviation' => 'MO', 'zip_code_start' => 63101, 'zip_code_end' => 63141],
            ['country_id' => 1, 'name' => 'Montana', 'abbreviation' => 'MT', 'zip_code_start' => 59623],
            ['country_id' => 1, 'name' => 'Nebraska', 'abbreviation' => 'NE', 'zip_code_start' => 68901, 'zip_code_end' => 68902],
            ['country_id' => 1, 'name' => 'Nevada', 'abbreviation' => 'NV', 'zip_code_start' => 89501, 'zip_code_end' => 89513],
            ['country_id' => 1, 'name' => 'new Hampshire', 'abbreviation' => 'NH', 'zip_code_start' => 03301],
            ['country_id' => 1, 'name' => 'new Jersey', 'abbreviation' => 'NJ', 'zip_code_start' => '08608'],
            ['country_id' => 1, 'name' => 'new Mexico', 'abbreviation' => 'NM', 'zip_code_start' => 87500, 'zip_code_end' => 87506],
            ['country_id' => 1, 'name' => 'new York', 'abbreviation' => 'NY', 'zip_code_start' => 10001, 'zip_code_end' => 10048],
            ['country_id' => 1, 'name' => 'North Carolina', 'abbreviation' => 'NC'],
            ['country_id' => 1, 'name' => 'North Dakota', 'abbreviation' => 'ND', 'zip_code_start' => 58501],
            ['country_id' => 1, 'name' => 'Ohio', 'abbreviation' => 'OH', 'zip_code_start' => 44101, 'zip_code_end' => 44179],
            ['country_id' => 1, 'name' => 'Oklahoma', 'abbreviation' => 'OK', 'zip_code_start' => 74101, 'zip_code_end' => 74110],
            ['country_id' => 1, 'name' => 'Oregon', 'abbreviation' => 'OR', 'zip_code_start' => 97201, 'zip_code_end' => 97225],
            ['country_id' => 1, 'name' => 'Pennsylvania', 'abbreviation' => 'PA', 'zip_code_start' => 15201, 'zip_code_end' => 15244],
            ['country_id' => 1, 'name' => 'Rhode Island', 'abbreviation' => 'RI', 'zip_code_start' => '02801', 'zip_code_end' => '02940'],
            ['country_id' => 1, 'name' => 'South Carolina', 'abbreviation' => 'SC', 'zip_code_start' => 29217],
            ['country_id' => 1, 'name' => 'South Dakota', 'abbreviation' => 'SD', 'zip_code_start' => 57401, 'zip_code_end' => 57402],
            ['country_id' => 1, 'name' => 'Tennessee', 'abbreviation' => 'TN', 'zip_code_start' => 37201, 'zip_code_end' => 37222],
            ['country_id' => 1, 'name' => 'Texas', 'abbreviation' => 'TX', 'zip_code_start' => 78701, 'zip_code_end' => 78705],
            ['country_id' => 1, 'name' => 'Utah', 'abbreviation' => 'UT', 'zip_code_start' => 84321, 'zip_code_end' => 84323],
            ['country_id' => 1, 'name' => 'Vermont', 'abbreviation' => 'VT', 'zip_code_start' => 05602],
            ['country_id' => 1, 'name' => 'Virginia', 'abbreviation' => 'VA', 'zip_code_start' => 23219],
            ['country_id' => 1, 'name' => 'Washington', 'abbreviation' => 'WA', 'zip_code_start' => 98004, 'zip_code_end' => 98009],
            ['country_id' => 1, 'name' => 'West Virginia', 'abbreviation' => 'WV', 'zip_code_start' => 25301],
            ['country_id' => 1, 'name' => 'Wisconsin', 'abbreviation' => 'WI', 'zip_code_start' => 53201, 'zip_code_end' => 53228],
            ['country_id' => 1, 'name' => 'Wyoming', 'abbreviation' => 'WY', 'zip_code_start' => 82001]
        ];

        foreach ($states as $state) {
            DB::table('states')->insert([$state]);
        }
    }
}
