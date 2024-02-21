<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Role;

 
class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Array of roles to seed
        $roles = [
            ['name' => 'Super-Admin'],
            ['name' => 'Admin'],
            ['name' => 'Editor'],
            ['name' => 'Talent'],
            ['name' => 'Crew'],
            ['name' => 'Client'],
            ['name' => 'Extra'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate($role);
        }

    }
}


 
