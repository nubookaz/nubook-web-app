<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class ClientTableSeeder extends Seeder
{
    public function run()
    {
        $clientRole = Role::where('name', 'Client')->first();

        // Assuming the first user is you (the sponsor)
        $sponsor = User::first();

        if (!$sponsor) {
            $this->command->info('No sponsor user found!');
            return;
        }

        for ($i = 1; $i <= 10; $i++) {
            $user = User::create([
                'first_name' => "John$i",
                'last_name' => "Doe$i",
                'email' => "client$i@example.com",
                'password' => Hash::make('secret'),
                // Add other necessary fields as per your User model
            ]);

            // Attach the client role
            $user->roles()->attach($clientRole->id);

            // Attach the client to the sponsor
            $sponsor->sponsoredClients()->attach($user->id);
        }

        $this->command->info('Clients attached to the sponsor user successfully!');
    }
}
