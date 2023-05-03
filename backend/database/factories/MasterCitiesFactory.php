<?php

namespace Database\Factories;

use App\Models\MasterCities;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MasterCitiesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = MasterCities::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $names = ['apple', 'banana', 'lemon', 'grape', 'orange', 'peach', 'pineapple'];
        $colors = ['red', 'yellow', 'purple', 'orange', 'pink', 'black', 'white'];

        $name = $names[rand(0, count($names) - 1)];
        $color = $colors[rand(0, count($colors) - 1)];
        return [
            'name' => $color
        ];
    }
}
