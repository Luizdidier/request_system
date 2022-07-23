<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(1)->create();

        \App\Models\PaymentType::factory()->create([
            'descricao' => 'Débito',
        ]);

        \App\Models\PaymentType::factory()->create([
            'descricao' => 'Crédito',
        ]);

        \App\Models\PaymentType::factory()->create([
            'descricao' => 'Dinheiro',
        ]);


        \App\Models\Product::factory()->create([
            'descricao' => 'Ração',
            'unidadeMedida' => 'Fardo',
        ]);

        \App\Models\Product::factory()->create([
            'descricao' => 'Arroz',
            'unidadeMedida' => 'Unidade',
        ]);

        \App\Models\Product::factory()->create([
            'descricao' => 'Feijão',
            'unidadeMedida' => 'Unidade',
        ]);

        \App\Models\Client::factory(5)->create();
        \App\Models\Client::factory(1)->create([
            'cpf/cnpj' => fake()->cnpj()
        ]);
        \App\Models\Client::factory(1)->create([
            'cpf/cnpj' => fake()->cnpj()
        ]);
        \App\Models\Client::factory(1)->create([
            'cpf/cnpj' => fake()->cnpj()
        ]);
        \App\Models\Client::factory(1)->create([
            'cpf/cnpj' => fake()->cnpj()
        ]);
        \App\Models\Client::factory(1)->create([
            'cpf/cnpj' => fake()->cnpj()
        ]);
    }
}
