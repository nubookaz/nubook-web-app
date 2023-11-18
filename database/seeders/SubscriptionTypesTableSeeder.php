<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

 
 
class SubscriptionTypesTableSeeder extends Seeder
{
    public function run()
    {
        $subscriptionTypes = [
            [
                'name' => 'Free',
                'price' => 0.00,
                'duration' => 30,
                'features' => json_encode(['feature1', 'feature2']),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Basic',
                'price' => 9.99,
                'duration' => 30, // duration in days
                'features' => json_encode(['feature1', 'feature2']),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Premium',
                'price' => 19.99,
                'duration' => 30,
                'features' => json_encode(['feature1', 'feature2', 'feature3']),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('subscription_types')->insert($subscriptionTypes);
    }
}
