<?php

namespace Database\Seeders\Master;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\MasterCities;
use Illuminate\Database\Seeder;

class CitiesSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        MasterCities::create([
            'city_id' => 1,
            'name' => '東京都'
        ]);

        MasterCities::create([
            'city_id' => 2,
            'name' => '川口市'
        ]);

        MasterCities::create([
            'city_id' => 3,
            'name' => '横浜市'
        ]);
    }
}
