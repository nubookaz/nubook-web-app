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
        Schema::create('hospital_locations', function (Blueprint $table) {
            $table->id();
            $table->string('place_id')->nullable();
            $table->text('name')->nullable();
            $table->text('information')->nullable();
            $table->string('vicinity')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();  
            $table->decimal('longitude', 10, 7)->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospital_locations');
    }
};
