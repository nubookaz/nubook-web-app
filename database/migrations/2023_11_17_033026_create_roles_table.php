<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        // Define the roles to be inserted
        $roles = [
            ['name' => 'Super-Admin', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Admin', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Editor', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Talent', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Crew', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Client', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Extra', 'created_at' => now(), 'updated_at' => now()],
        ];

        // Insert default roles into the roles table
        DB::table('roles')->insert($roles);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
