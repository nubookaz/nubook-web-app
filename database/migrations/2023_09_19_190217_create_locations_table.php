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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('street_address');
            $table->string('city');
            $table->string('state');
            $table->string('zip_code');
            $table->string('country');
            $table->unsignedBigInteger('parking_location_id')->nullable();
            $table->unsignedBigInteger('hospital_location_id')->nullable();
            $table->timestamps();
    
            // Add foreign key constraint for parking_location_id
            $table->foreign('parking_location_id')->references('id')->on('parking_locations');
    
            // Add foreign key constraint for hospital_location_id
            $table->foreign('hospital_location_id')->references('id')->on('hospital_locations');
        });
    }
    
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
